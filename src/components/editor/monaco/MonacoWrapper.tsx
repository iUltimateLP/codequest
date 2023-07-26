/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import * as React from "react";
import { useRef, useEffect } from "react";
import Editor, { useMonaco, loader, Monaco } from "@monaco-editor/react";
import * as monaco from 'monaco-editor';
import { MONACO_OPTIONS } from "./MonacoConfig";
import "comic-mono";
import { Theme, useTheme } from '@mui/material/styles';

interface MonacoWrapperProps {
    language?: string,
    theme?: string,
    code?: string,
    readOnly?: boolean,
    onCodeChange?: (code : string) => void,
    id: string;
};

// Wrapper that wraps Monaco into a React component and provides low-level functionality
export default function MonacoWrapper(props : MonacoWrapperProps) {
    // Hook-style reference to monaco
    const monacoRef = useMonaco();

    // Get the app's theme so we can style Monaco accordingly
    const theme : Theme = useTheme();

    // Called when the Monaco editor is mounted
    function onMount(editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) {  
        
    }

    // Side-effect that's called when a monaco instance is set up 
    useEffect(() => {
        if (monacoRef) {
        }
    }, [monacoRef]);

    // Called when the code entered into Monaco changes
    function onChange(code : string | undefined, ev : monaco.editor.IModelContentChangedEvent) {
        if (props.onCodeChange && code)
            props.onCodeChange(code);
    }

    return (
        <Editor 
            width="100%"
            height="100%"
            defaultLanguage="javascript"
            language={props.language}
            defaultValue="// Code"
            value={props.code}
            theme={theme.palette.mode == "dark" ? "vs-dark" : "light"}
            options={{readOnly: props.readOnly || false, ...MONACO_OPTIONS}}
            onMount={onMount}
            onChange={onChange}
        />
    );
}
