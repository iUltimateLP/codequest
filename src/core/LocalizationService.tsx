/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { Service } from "./Service";

// Represents a localized string (TODO: could be more dynamic instead of hardcoding possible languages here)
interface LocalizedString {
    en : string;
    de? : string;
}

// GLOBAL function to localize a string (shorthand to just calling the service)
const i18n = (str? : LocalizedString) : string => { 
    return Service.get(LocalizationService).i18n(str); 
}

// This service handles localization and i18n throughout the app
class LocalizationService extends Service {
    // Returns the currently active locale
    public getLocale() : string {
        return this._currentLocale;
    }

    // Localizes a given string
    public i18n(str? : LocalizedString) : string {
        if (!str)
            return "<unknown>";
            
        const availableLocales : string[] = Object.keys(str);
        if (!availableLocales.includes(this.getLocale()))
            return str.en;
        else {
            for (const [locale, content] of Object.entries(str)) {
                if (locale == this.getLocale())
                    return content;
            }
        }

        return "<unknown>";
    }
    
    private _currentLocale : string = "en";
}

export type { LocalizedString };
export { i18n, LocalizationService };
