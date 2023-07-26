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
import { i18n, useLocale } from "@/core/LocalizationService";

interface PuzzleDescriptionProps {

}

export default function PuzzleDescription(props : PuzzleDescriptionProps) {
    const [puzzle] = usePuzzle();
    const [objective] = useObjective();
    
    // Just to trigger a rerender when locale changes
    const [locale] = useLocale();
    React.useEffect(() => {}, [locale]);

    // Triggers the next objective
    function nextObjective() {
        if (!objective || !objective.nextObjective)
            return;
        
        Service.get(PuzzleService).setCurrentObjective(objective.nextObjective);
    }

    return (
        <>
            <Box sx={{p: 2}} id="cq-puzzle-desc">
                {puzzle && <>
                    <Typography variant="h5" sx={{ paddingBottom: 1, borderBottom: "1px solid var(--separator-border)", marginBottom: 1 }}>{i18n(objective?.title)}</Typography>
                    <MuiMarkdown>
                        {i18n(objective?.description).concat("<br/>")}
                    </MuiMarkdown>
                    <Button variant="contained" sx={{float: "right"}} onClick={nextObjective}>{i18n("OBJECTIVE_NEXT")}</Button>
                </>}
                {!puzzle && <Typography variant="body1">Loading...</Typography>}
            </Box>
        </>
    );
}
