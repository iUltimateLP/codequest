/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { useState, useEffect } from "react";
import { PuzzleService } from "./PuzzleService";
import { Service } from "./Service";
import { SubEvent } from "sub-events";
import { Logger } from "./Logging";
import { StorageService } from "./StorageService";

import { i18n_de } from "@/i18n/de";
import { i18n_en } from "@/i18n/en";

interface ILocale {
    [key: string]: any;
}

const LOCALES : ILocale = {
    // All locales go here
    en: i18n_en,
    de: i18n_de
}

// Represents a localized string (TODO: could be more dynamic instead of hardcoding possible languages here)
interface LocalizedString {
    en : string;
    de? : string;
}

// Helper function which checks if any type is a LocalizedString
const isLocalizedString = (str: any): str is LocalizedString => {
    if (typeof(str) == "string")
        return false;
    else if (str == undefined || str == null)
        return false;
    else
        return "en" in str;
}

// GLOBAL function to localize a string (shorthand to just calling the service)
const i18n = (str? : LocalizedString | string) : string => { 
    return Service.get(LocalizationService).i18n(str); 
}

// This service handles localization and i18n throughout the app
class LocalizationService extends Service {
    public LocaleChangedEvent : SubEvent<string> = new SubEvent();

    constructor() {
        super();

        // Load from storage, if exists
        const savedLocale : string | null = Service.get(StorageService).getString("locale");
        if (savedLocale)
            this._currentLocaleID = savedLocale;
        else
            this.setLocale("de"); // Default language is german

        this._currentLocale = LOCALES[this._currentLocaleID];
    }

    // Returns the currently active locale
    public getLocale() : string {
        return this._currentLocaleID;
    }

    // Sets the current locale (triggers the useLocale() hook so components can update)
    public setLocale(newLocale : string, forceRefresh : boolean = false) {
        // Make sure that locale exists
        if (!Object.keys(LOCALES).includes(newLocale)) {
            Logger.error(`Locale "${newLocale}" does not exist!`);
            return;
        }

        // Change
        this._currentLocaleID = newLocale;
        this._currentLocale = LOCALES[this._currentLocaleID];

        // Fire event
        this.LocaleChangedEvent.emit(this._currentLocaleID);

        // Save
        Service.get(StorageService).setString("locale", this._currentLocaleID);

        Logger.info(`Locale changed to ${this._currentLocaleID}`);

        // If wanted, trigger a full app reload
        if (forceRefresh) {
            window.location.reload();
        }
    }

    // Localizes a given LocalizedString
    public i18n(str? : LocalizedString | string) : string {
        if (!str)
            return isLocalizedString(str) ? "<unknown>" : str as string;
            
        // Is this a LocalizedString?
        if (isLocalizedString(str)) {
            const availableLocales : string[] = Object.keys(str);
            if (!availableLocales.includes(this.getLocale()))
                return str.en;
            else {
                for (const [locale, content] of Object.entries(str)) {
                    if (locale == this.getLocale())
                        return content;
                }
            }
        } else {
            // Standard string, look it up in the current locale
            if (this._currentLocale && Object.keys(this._currentLocale).includes(str as string)) {
                return this._currentLocale[str as string];
            }
        }

        return isLocalizedString(str) ? "<unknown>" : str as string;
    }
    
    private _currentLocaleID : string = "en";
    private _currentLocale : ILocale | null = null;
}

// React hook that tracks the current locale
const useLocale = () => {
	// Create state
	const [locale, setLocale] = useState<string>();

	// Side-effect that's executed once
	useEffect(() => {
		// Subscribe to the events on the puzzle service to update this hook's state
		const localizationService = Service.get(LocalizationService);
		const sub = localizationService.LocaleChangedEvent.subscribe((newLocale) => {
			setLocale(newLocale);
		});

        // Also trigger once
        setLocale(localizationService.getLocale());

		// Unsubscribe from the events when this effect is disposed
		return () => {
			sub.cancel();
		};
	}, []);

	return [locale];
}

export type { LocalizedString, ILocale };
export { i18n, LocalizationService, useLocale };
