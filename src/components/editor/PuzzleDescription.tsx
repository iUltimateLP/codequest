/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import * as React from "react";
import MuiMarkdown from "mui-markdown";
import { Box, Button, Typography } from "@mui/material";
import { Service } from "@/core/Service";
import { PuzzleService, useObjective, usePuzzle } from "@/core/PuzzleService";
import { i18n } from "@/core/LocalizationService";

interface PuzzleDescriptionProps {

}

export default function PuzzleDescription(props : PuzzleDescriptionProps) {
    const [puzzle] = usePuzzle();
    const [objective] = useObjective();

    return (
        <>
            {puzzle && <Box sx={{p: 2}}>
                <Typography variant="h5">{i18n(objective?.title)}</Typography>
                <MuiMarkdown>
                    {i18n(objective?.description).concat("<br/>")}
                </MuiMarkdown>
            </Box>}
        </>
    );
}