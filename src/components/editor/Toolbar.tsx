/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import { ApplicationService } from "@/core/ApplicationService";
import { CodeEvalService } from "@/core/CodeEvalService";
import { i18n } from "@/core/LocalizationService";
import { Service } from "@/core/Service";
import { PlayArrow } from "@mui/icons-material";
import { Box, Button, Tooltip } from "@mui/material";
import * as React from "react";

export default function Toolbar() {
    function run() {
        Service.get(ApplicationService).executeProgram();
    }

    return (
        <Box sx={{height: "100%", display: "flex"}}>
            <Tooltip title={i18n("RUN_PROGRAM")} placement="bottom">
                <Button variant="text" onClick={run}><PlayArrow/></Button>
            </Tooltip>
        </Box>
    );
}
