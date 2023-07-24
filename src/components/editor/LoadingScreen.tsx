/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import * as React from "react";

// Simple loading screen
export default function LoadingScreen() {
    const theme = useTheme();

    return (
        <Box sx={{ position: "fixed", width: "100%", height: "100%", zIndex: "100", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: theme.palette.background.default }}>
            <Box sx={{ p: 4 }}><img src="/assets/branding/wordmark_big.png" height="256"></img></Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h4">Loading...</Typography>
                <CircularProgress sx={{ m: 2 }}/>
            </Box>
        </Box>
    );
}