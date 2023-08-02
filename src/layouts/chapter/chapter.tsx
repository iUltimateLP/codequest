/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import { Box, Typography } from "@mui/material";
import * as React from "react";
import "@/layouts/chapter/chapter.css";
import { Puzzle } from "@/core/PuzzleService";
import { i18n } from "@/core/LocalizationService";
import { redirect } from "next/navigation";
import { ColorModeContext } from "@/components/theme/ThemeRegistry";

interface ChapterButtonProps {
    chapter: number;
    url: string;
}

function ChapterButton(props : ChapterButtonProps) {
    const [puzzle, setPuzzle] = React.useState<Puzzle>();

    React.useEffect(() => {
        fetch(`/assets/puzzles/${props.url}.json`)
        .then((response) => response.json())
        .then((json) => {
            var puzzle = json as Puzzle;
            setPuzzle(puzzle);
        });
    }, [props.url]);
    
    function handleClick() {
        window.location.href = `/editor/${props.url}`;
    }

    return (
        <a className={"cq-chapter-button-a"} onClick={handleClick}>
            <Box className={"cq-chapter-button"}>
                <Typography variant="h1" fontWeight={"bold"}>{props.chapter}</Typography>
                <Typography variant="h6" sx={{pt: 2, m: 2}} align="center">{puzzle ? i18n(puzzle.meta.name) : ""}</Typography>
            </Box>
        </a>
    );
}

const CHAPTER_CONTENT = ["1_intro", "2_roundthecorner", "3_loops", "4_loopsvar", "5_merrygoround"];

// Layout component used for the chapter selector
export default function ChapterLayout() {
    const box = React.useRef<HTMLDivElement>(null);
    const colorMode = React.useContext(ColorModeContext);

    React.useEffect(() => {
        const asDiv : HTMLDivElement | null = box.current;
        if (asDiv) {
            // @ts-ignore
            asDiv.onmousewheel = function(e : WheelEvent) {
                asDiv.scrollLeft += e.deltaY;
            }
        }
    }, [box.current])

    React.useEffect(() => {
        if (localStorage.getItem("theme") !== "dark") {
            colorMode.toggleColorMode();
        }
    }, []);

    return (
        <Box sx={{ width: "100%", p: 8, overflow: "hidden" }}>
            <Typography variant="h1" className={"cq-chapter-title"} fontWeight={600} align={"center"}>Chapter 1</Typography>
            <Box className={"cq-chapter-fullscreen-wrapper"}>
                <Box className={"cq-chapter-button-wrapper"} ref={box}>
                    {CHAPTER_CONTENT.map((name, i) => {
                        return (<ChapterButton key={i} chapter={i+1} url={`/chapter1/${name}`}/>);
                    })}
                </Box>
            </Box>
        </Box>
    );
};
