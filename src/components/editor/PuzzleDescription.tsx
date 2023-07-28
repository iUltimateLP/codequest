/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import * as React from "react";
import MuiMarkdown, { getOverrides } from "mui-markdown";
import { Box, Button, Checkbox, Fade, List, ListItem, ListItemIcon, ListItemText, Slide, Typography, useTheme } from "@mui/material";
import { Service } from "@/core/Service";
import { PuzzleObjectiveGoal, PuzzleService, useObjective, useObjectiveReachedStates, usePuzzle } from "@/core/PuzzleService";
import { i18n, useLocale } from "@/core/LocalizationService";
import { useEffect, useState } from "react";
import { UiService } from "@/core/UiService";
import Confetti from "react-dom-confetti";
import { useProgramRunning } from "@/core/ApplicationService";

interface PuzzleDescriptionProps {

}

interface PuzzleObjectiveListItemProps {
    goal : PuzzleObjectiveGoal;
    reached : boolean;
}

function PuzzleObjectiveListItem(props : PuzzleObjectiveListItemProps) {
    const theme = useTheme();
    
    // Play a sound if this list item is reached
    useEffect(() => {
        if (props.reached) {
            Service.get(UiService).playSound("goal_finished", 0.25);
        }
    }, [props.reached])

    return (
        <ListItem>
            <ListItemIcon sx={{minWidth: "25px"}}>
                <Checkbox edge="start" disabled tabIndex={-1} size="medium" sx={{p: 0}} checked={props.reached}></Checkbox>
                <Confetti active={props.reached} config={{
                    angle: 90,
                    spread: 360,
                    startVelocity: 40,
                    elementCount: 70,
                    dragFriction: 0.15,
                    duration: 1000,
                    stagger: 3,
                    width: "5px",
                    height: "5px",
                    colors: [theme.palette.primary.main, theme.palette.text.disabled]
                }} />
            </ListItemIcon>
            <ListItemText primary={i18n(props.goal.text)} sx={{
                color: (props.reached) ? theme.palette.text.disabled : theme.palette.text.primary,
                textDecoration: props.reached ? "line-through" : "none"}} 
            />
        </ListItem>
    );
}

export default function PuzzleDescription(props : PuzzleDescriptionProps) {
    const [puzzle] = usePuzzle();
    const [objective] = useObjective();
    const [objectiveReachedStates] = useObjectiveReachedStates();
    const [slide, setSlide] = useState<boolean>(true);
    const [slideDir, setSlideDir] = useState<"left" | "right">("left");
    const theme = useTheme();
    const [programRunning] = useProgramRunning();
    
    // Just to trigger a rerender when locale changes
    const [locale] = useLocale();
    React.useEffect(() => {}, [locale]);

    useEffect(() => {}, [objective]);

    useEffect(() => {}, [objectiveReachedStates]);

    // Triggers the next objective or next puzzle
    function next() {
        if (!objective)
            return;
        
        if (objective.nextObjective) {
            // Show next objective
            setSlideDir("right");
            setSlide(false);
            setTimeout(() => {
                setSlideDir("left");
                setSlide(true);
                Service.get(PuzzleService).setCurrentObjective(objective.nextObjective!);
            }, 260);
        } else if (objective.nextPuzzle) {
            // Trigger next puzzle load
            window.location.href = `/editor/${objective.nextPuzzle}`;
        }
    }

    return (
        <>
            <Box sx={{ p: 2, height: "100%" }} id="cq-puzzle-desc">
                {puzzle && <>
                    <Slide direction={slideDir} in={slide} timeout={{appear: 10, enter: 250, exit: 250}} easing={{enter: theme.transitions.easing.sharp, exit: theme.transitions.easing.sharp}}>
                        <div style={{height: "100%", width: "100%"}}>
                            <Typography variant="h5" sx={{ paddingBottom: 1, borderBottom: "1px solid var(--separator-border)", marginBottom: 1 }}>{i18n(objective?.title)}</Typography>
                            <Box sx={{ overflowY: "auto", overflowX: "hidden", height: "calc(100% - 86px - 16px)", marginBottom: "16px", paddingRight: "16px" }}>
                                <MuiMarkdown options={{
                                    forceBlock: true,
                                    overrides: {
                                        ...getOverrides(), 
                                        p: {
                                            props: {
                                                style: {
                                                    color: theme.palette.text.disabled
                                                }
                                            }
                                        }
                                    }
                                }}>
                                    {i18n(objective?.description).concat("<br/>")}
                                </MuiMarkdown>

                                {objective?.goals && <><Typography variant="h6">{i18n("OBJECTIVE_TITLE")}</Typography>
                                    <List dense={true}>
                                        {objective.goals.map((goal, i) => {
                                            return <PuzzleObjectiveListItem key={i} goal={goal} reached={objectiveReachedStates ? objectiveReachedStates.includes(goal.id) : false} />;
                                        })} 
                                    </List>
                                </>}
                            </Box>

                            <Button 
                                variant="contained"
                                sx={{float: "right"}}
                                onClick={next}
                                disabled={
                                    !(
                                        (objectiveReachedStates && objective && objective.goals && objectiveReachedStates.length == objective.goals.length)
                                        || (objective && !objective.goals)
                                        || (!objective)
                                    ) || programRunning
                                }
                            >{objective?.nextPuzzle ? i18n("OBJECTIVE_END") : i18n("OBJECTIVE_NEXT")}</Button>
                        </div>
                    </Slide>
                </>}
                {!puzzle && <Typography variant="body1">Loading...</Typography>}
            </Box>
        </>
    );
}
