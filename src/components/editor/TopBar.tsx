/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import * as React from "react";
import { useContext } from "react"; 
import { AppBar, Toolbar, Typography, IconButton, Checkbox, Button } from "@mui/material";
import { Menu as MenuIcon, DarkModeOutlined as DarkModeIcon, LightModeOutlined as LightModeIcon, Translate as TranslateIcon } from "@mui/icons-material";
import { useMonaco } from "@monaco-editor/react";
import * as monacoEditor from "monaco-editor";
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from "../theme/ThemeRegistry";
import { usePuzzle } from "@/core/PuzzleService";
import { LocalizationService, i18n, useLocale } from "@/core/LocalizationService";
import { Service } from "@/core/Service";

interface TopBarProps {
    onModeChange : Function
}

// Top bar component, used in the editor
export default function TopBar(props : TopBarProps) {
    const theme = useTheme();
    const [puzzle] = usePuzzle();
    
    // Just to trigger a rerender when locale changes
    const [locale] = useLocale();
    React.useEffect(() => {}, [locale]);

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

    function test2() {
        Service.get(LocalizationService).setLocale(Service.get(LocalizationService).getLocale() == "de" ? "en" : "de");
    }

    return (
        // @ts-ignore since custom color is used
        <AppBar position="static" color="shaded">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold", paddingRight: 2 }}>{puzzle ? puzzle.chapter + "-" + puzzle.number : ""}</Typography>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>{puzzle ? i18n(puzzle.meta.name) : ""}</Typography>
                <Checkbox onChange={(e) => {props.onModeChange(e?.target.checked)}}></Checkbox>
                <Button variant="contained" onClick={test}>abc</Button>
                <IconButton size="large" color="inherit" onClick={test2}><TranslateIcon /></IconButton>
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