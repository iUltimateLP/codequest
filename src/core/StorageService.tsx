/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { useEffect, useState } from "react";
import { Service } from "./Service";

// This service handles saving and loading from the browser's LocalStorage
class StorageService extends Service {
    // Reads a value with a given key from local storage
    public getString(key : string) : string | null {
        if (typeof localStorage === 'undefined') {
            return null;
        }

        return localStorage.getItem(key);
    }

    // Reads a value with a given key from local storage
    public getObject<T extends Object>(key : string) : T | null {
        if (typeof localStorage === 'undefined') {
            return null;
        }

        var obj = JSON.parse(key) as T;
        return obj;
    }

    // Sets a value with a given key in local storage
    public setString(key : string, value : string) {
        if (typeof localStorage === 'undefined') {
            return null;
        }

        localStorage.setItem(key, value);
    } 

    // Sets a value with a given key in local storage
    public setObject<T extends Object>(key : string, value : T) {
        if (typeof localStorage === 'undefined') {
            return null;
        }

        localStorage.setItem(key, JSON.stringify(value));
    }
}

// Custom hook that's able to track a local storage item
const useLocalStorageString = function(key : string, fallback : any) {
    const svc = Service.get(StorageService);
    const [value, setValue] = useState<string>(svc.getString(key) ?? fallback);

    useEffect(() => {
        Service.get(StorageService).setString(key, value);
    }, [value, key]);

    return [value, setValue];
}

// Custom hook that's able to track a local storage item
const useLocalStorageObject = function<T extends Object>(key : string, fallback : T) {
    const svc = Service.get(StorageService);
    const [value, setValue] = useState<T>(svc.getObject<T>(key) ?? fallback);

    useEffect(() => {
        Service.get(StorageService).setObject<T>(key, value);
    }, [value, key]);

    return [value, setValue];
}

export { StorageService, useLocalStorageString, useLocalStorageObject };
