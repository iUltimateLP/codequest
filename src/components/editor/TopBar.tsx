/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import * as React from "react";
import { useState, useMemo, useContext } from "react"; 
import { AppBar, Toolbar, Typography, IconButton, Checkbox, Button } from "@mui/material";
import { Menu as MenuIcon, DarkModeOutlined as DarkModeIcon, LightModeOutlined as LightModeIcon } from "@mui/icons-material";
import { useMonaco } from "@monaco-editor/react";
import * as monacoEditor from "monaco-editor";
import { Theme, useTheme } from '@mui/material/styles';
import { ColorModeContext } from "../theme/ThemeRegistry";
import { usePuzzle } from "@/core/PuzzleService";
import { i18n } from "@/core/LocalizationService";

interface TopBarProps {
    onModeChange : Function
}

// Top bar component, used in the editor
export default function TopBar(props : TopBarProps) {
    const theme = useTheme();
    const [puzzle] = usePuzzle();

    // Test function to create a monaco code lens
    const monaco = useMonaco();
    function test() {
        if (!monaco)
            return;

        // Creates a new command that's executed when clicking on the lens        
        var editor = monaco.editor.getEditors()[0] as monacoEditor.editor.IStandaloneCodeEditor;
        var commandId : (string | null) = editor.addCommand(
            0,
            () => { alert("hi"); },
            ""
        );

        // Creates a new code lens provider that can inject different "lenses"
        monaco?.languages.registerCodeLensProvider("javascript", {
            provideCodeLenses: function(model, token) {
                return {
                    lenses: [
                        {
                            range: {
                                startLineNumber: 1,
                                startColumn: 1,
                                endLineNumber: 2,
                                endColumn: 1
                            },
                            id: "test",
                            command: {
                                id: commandId!,
                                title: "test"
                            }
                        }
                    ],
                    dispose: () => {}
                };
            },
            resolveCodeLens: function(model, codeLens, token) {
                return codeLens;
            },
        })
    }

    const colorMode = useContext(ColorModeContext);

    // Called when the day/night button is clicked
    function switchTheme() {
        colorMode.toggleColorMode();
    }

    return (
        // @ts-ignore since custom color is used
        <AppBar position="static" color="shaded">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>CodeQuest ({puzzle ? i18n(puzzle.meta.name) : "N/A"})</Typography>
                <Checkbox onChange={(e) => {props.onModeChange(e?.target.checked)}}></Checkbox>
                <Button variant="contained" onClick={test}>abc</Button>
                <IconButton size="large" color="inherit" aria-label="theme" onClick={switchTheme} >
                    {theme.palette.mode == "dark" && <LightModeIcon />}
                    {theme.palette.mode == "light" && <DarkModeIcon />}
                </IconButton>
                <IconButton size="large" color="inherit" aria-label="menu" >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}