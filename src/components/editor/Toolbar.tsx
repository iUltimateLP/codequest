/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import { ApplicationService } from "@/core/ApplicationService";
import { CodeEvalService } from "@/core/CodeEvalService";
import { i18n, useLocale } from "@/core/LocalizationService";
import { Service } from "@/core/Service";
import { PlayArrow as PlayArrowIcon } from "@mui/icons-material";
import { Box, Button, Tooltip } from "@mui/material";
import * as React from "react";

export default function Toolbar() {
    // Just to trigger a rerender when locale changes
    const [locale] = useLocale();
    React.useEffect(() => {}, [locale]);

    function run() {
        Service.get(ApplicationService).executeProgram();
    }

    return (
        <Box sx={{height: "100%", display: "flex"}} id="cq-toolbar" >
            <Tooltip title={i18n("RUN_PROGRAM")} placement="bottom">
                <Button variant="text" onClick={run}><PlayArrowIcon /></Button>
            </Tooltip>
        </Box>
    );
}
