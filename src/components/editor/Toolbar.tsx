/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import { ApplicationService } from "@/core/ApplicationService";
import { CodeEvalService } from "@/core/CodeEvalService";
import { Service } from "@/core/Service";
import { Box, Button } from "@mui/material";
import * as React from "react";

export default function Toolbar() {
    function run() {
        var program : string = Service.get(ApplicationService).getProgram();
        Service.get(CodeEvalService).loadProgram(program);
        Service.get(CodeEvalService).run();
    }

    return (
        <Box sx={{height: "100%", display: "flex"}}>
            <Button variant="text" onClick={run}>Run</Button>
        </Box>
    );
}
