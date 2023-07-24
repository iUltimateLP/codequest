/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { Service } from "./Service";

interface ILocale {
    [key: string]: any;
}

const LOCALES : ILocale = {
    // All locales go here
    en: require("@/i18n/en").default,
    de: require("@/i18n/de").default
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
    else
        return "en" in str;
}

// GLOBAL function to localize a string (shorthand to just calling the service)
const i18n = (str? : LocalizedString | string) : string => { 
    return Service.get(LocalizationService).i18n(str); 
}

// This service handles localization and i18n throughout the app
class LocalizationService extends Service {
    constructor() {
        super();

        this._currentLocale = LOCALES[this._currentLocaleID];
    }

    // Returns the currently active locale
    public getLocale() : string {
        return this._currentLocaleID;
    }

    // Localizes a given LocalizedString
    public i18n(str? : LocalizedString | string) : string {
        if (!str)
            return "<unknown>";
            
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

        return "<unknown>";
    }
    
    private _currentLocaleID : string = "en";
    private _currentLocale : ILocale | null = null;
}

export type { LocalizedString, ILocale };
export { i18n, LocalizationService };
