/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import { editor } from 'monaco-editor';

// Default Monaco options
const MONACO_OPTIONS : editor.IStandaloneEditorConstructionOptions = {
    // CodeLenses are little hints displayed directly inline
    codeLens: true,

    // No minimap for now
    minimap: {
        enabled: false
    },

    // Disable context menus for now
    contextmenu: false,

    // No lightbulbs for now
    lightbulb: {
        enabled: false
    },

    // This confused the hell out of me on touchpads
    multiCursorLimit: 1,

    // Enable quick suggestions (stuff that pops up when you type)
    quickSuggestions: true,

    // Don't report unused variables, users don't care about optimization
    showUnused: false,

    // Nice effect
    smoothScrolling: true,

    // Suggestion options
    suggest: {
        preview: true,
        localityBonus: true,
        showClasses: false,
        showConstructors: false,
        showEvents: false,
        showFiles: false,
        showFolders: false,
        showInterfaces: false,
        showIssues: true,
        showModules: false,
        showSnippets: false,
        showStructs: false,
        showUnits: false,
        showUsers: false,
        showFunctions: true,
        showMethods: false
    },

    // Small line in the scrollbar
    overviewRulerLanes: 0, 

    // Don't draw an extra border on the right side
    overviewRulerBorder: false,

    // Use the Comic Mono font
    fontFamily: "Comic Mono"
};

export { MONACO_OPTIONS };
