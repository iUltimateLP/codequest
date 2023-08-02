/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { Box, Typography } from "@mui/material";
import * as React from "react";

// <span style={{color: "#ffaa00"}}>dir</span>

// Provides a viewport div for Phaser to render on
export default function Palette() {
    return (
        <Box sx={{p: 2}}>
            <Typography variant="h5" style={{ fontFamily: "monospace", color: "#ccc" }}>walk();</Typography>
            <Typography variant="body2" style={{ color: "#aaa" }}>Bewegt die Spielfigur einen Schritt nach vorne.</Typography>
            <hr style={{borderTop: "none", borderBottom: "1px solid #333"}}/>
            <Typography variant="h5" style={{ fontFamily: "monospace", color: "#ccc" }}>turn(<span style={{color: "#ffaa00"}}>dir</span>);</Typography>
            <Typography variant="body2" style={{ color: "#aaa" }}>Dreht die Spielfigur in Richtung <span style={{color: "#ffaa00", fontFamily: "monospace"}}>dir</span> ('<span style={{color: "#00aaff", fontFamily: "monospace"}}>LEFT</span>' oder '<span style={{color: "#00aaff", fontFamily: "monospace"}}>RIGHT</span>')</Typography>
            <hr style={{borderTop: "none", borderBottom: "1px solid #333"}}/>
            <Typography variant="h5" style={{ fontFamily: "monospace", color: "#ccc" }}>isFrontFree();</Typography>
            <Typography variant="body2" style={{ color: "#aaa" }}>Gibt zurück, ob sich die Spielfigur nach vorne bewegen kann, oder nicht.</Typography>
            <hr style={{borderTop: "none", borderBottom: "1px solid #333"}}/>
        </Box>
    );
}
