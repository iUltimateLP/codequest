/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import * as React from "react";
import { useContext, useRef, useState } from "react"; 
import { AppBar, Toolbar, Typography, IconButton, Checkbox, Button, Tooltip, Menu, MenuItem } from "@mui/material";
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
    const colorMode = useContext(ColorModeContext);
    
    // Locale stuff
    const [locale] = useLocale();
    React.useEffect(() => {}, [locale]);
    const localeButton = useRef(null); 
    const [localeMenuOpen, setLocaleMenuOpen] = useState(false);

    // Called when the day/night button is clicked
    function switchTheme() {
        colorMode.toggleColorMode();
    }

    // Called when the locale menu is closed, either by clicking a menu item, or by clicking elsewhere
    function closeLocaleMenu(locale? : string) {
        setLocaleMenuOpen(false);
        if (locale)
            Service.get(LocalizationService).setLocale(locale, true);
    }

    return (
        // @ts-ignore since custom color is used
        <AppBar position="static" color="shaded">
            <Toolbar>
                <Tooltip title={puzzle ? `Chapter ${puzzle.chapter} - Puzzle ${puzzle.number}` : ""}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: "bold", paddingRight: 2 }}>{puzzle ? puzzle.chapter + "-" + puzzle.number : ""}</Typography>
                </Tooltip>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>{puzzle ? i18n(puzzle.meta.name) : ""}</Typography>
                <Tooltip title="Switch locale">
                    <IconButton size="large" color="inherit" onClick={() => setLocaleMenuOpen(!localeMenuOpen)} ref={localeButton}><TranslateIcon /></IconButton>
                </Tooltip>
                <Menu anchorEl={localeButton.current} open={localeMenuOpen} onClose={() => closeLocaleMenu()}>
                    <MenuItem onClick={() => closeLocaleMenu("en")} selected={locale == "en"}>English</MenuItem>
                    <MenuItem onClick={() => closeLocaleMenu("de")} selected={locale == "de"}>Deutsch</MenuItem>
                </Menu>
                <Tooltip title="Switch theme">
                    <IconButton size="large" color="inherit" aria-label="theme" onClick={switchTheme} >
                        {theme.palette.mode == "dark" && <LightModeIcon />}
                        {theme.palette.mode == "light" && <DarkModeIcon />}
                    </IconButton>
                </Tooltip>
                <IconButton size="large" color="inherit" aria-label="menu" >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}