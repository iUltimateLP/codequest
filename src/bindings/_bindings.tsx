/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { CodeBinding } from "@/bindings/CodeBinding";

// This file contains all bindings. If you add a new binding to src/bindings, add it here too.
// Maybe this list will be auto-generated in the future.

namespace Bindings {

    // ALL BINDINGS GO HERE
    export const BINDING_REGISTRY : Map<string, CodeBinding> = new Map<string, CodeBinding>([
        ["print", require("@/bindings/print").default],
        ["sleep", require("@/bindings/sleep").default],
        ["walk", require("@/bindings/walk").default]
    ]);

    // A list of default bindings that should always enabled
    export const DEFAULT_BINDINGS : string[] = [
        "print",
        "sleep"
    ];

    // A list of "binding sets" (= keyed list of bindings)
    export const BINDING_SETS : Map<string, string[]> = new Map<string, string[]>([
        ["MOVEMENT", [ "walk" ]]
    ]);

};

export { Bindings };
