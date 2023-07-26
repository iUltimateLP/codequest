/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import * as React from "react";
import MuiMarkdown from "mui-markdown";
import { Box, Button, Fade, Slide, Typography, useTheme } from "@mui/material";
import { Service } from "@/core/Service";
import { PuzzleService, useObjective, usePuzzle } from "@/core/PuzzleService";
import { i18n, useLocale } from "@/core/LocalizationService";
import { useState } from "react";

interface PuzzleDescriptionProps {

}

export default function PuzzleDescription(props : PuzzleDescriptionProps) {
    const [puzzle] = usePuzzle();
    const [objective] = useObjective();
    const [slide, setSlide] = useState<boolean>(true);
    const [slideDir, setSlideDir] = useState<"left" | "right">("left");
    const theme = useTheme();
    
    // Just to trigger a rerender when locale changes
    const [locale] = useLocale();
    React.useEffect(() => {}, [locale]);

    // Triggers the next objective
    function nextObjective() {
        if (!objective || !objective.nextObjective)
            return;
        
        setSlideDir("right");
        setSlide(false);
        setTimeout(() => {
            setSlideDir("left");
            setSlide(true);
            Service.get(PuzzleService).setCurrentObjective(objective.nextObjective);
        }, 260);
    }

    return (
        <>
            <Box sx={{p: 2}} id="cq-puzzle-desc">
                {puzzle && <>
                    <Slide direction={slideDir} in={slide} timeout={{appear: 10, enter: 250, exit: 250}} easing={{enter: theme.transitions.easing.sharp, exit: theme.transitions.easing.sharp}}>
                        <div style={{height: "100%", width: "100%"}}>
                            <Typography variant="h5" sx={{ paddingBottom: 1, borderBottom: "1px solid var(--separator-border)", marginBottom: 1 }}>{i18n(objective?.title)}</Typography>
                            <MuiMarkdown>
                                {i18n(objective?.description).concat("<br/>")}
                            </MuiMarkdown>
                            <Button variant="contained" sx={{float: "right"}} onClick={nextObjective}>{i18n("OBJECTIVE_NEXT")}</Button>
                        </div>
                    </Slide>
                </>}
                {!puzzle && <Typography variant="body1">Loading...</Typography>}
            </Box>
        </>
    );
}
