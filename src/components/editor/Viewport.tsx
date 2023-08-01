/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { Box } from "@mui/material";
import * as React from "react";

// Provides a viewport div for Phaser to render on
export default function Viewport() {
    return (
        <Box sx={{p: 0, height: "100%"}} id="cq-viewport">
            {/* @ts-ignore */}
            <div id="phaser-div"></div>
        </Box>
    );
}
