/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { i18n } from "@/core/LocalizationService";
import { Puzzle, usePuzzle } from "@/core/PuzzleService";
import { Typography, useTheme } from "@mui/material";
import MuiMarkdown from "mui-markdown";
import { useEffect, useState } from "react";
import ReactJoyride, { CallBackProps, Step, Styles } from "react-joyride";
import { useLocalStorage, useTimeout, useTimeoutFn } from "react-use";

interface TutorialItemProps {
    nameKey : string;
    descriptionKey : string;
}

// The item that's rendered inside the tutorial popups
function TutorialItem(props : TutorialItemProps) {
    return (<>
        <Typography variant="h6">{i18n(props.nameKey)}</Typography>
        <Typography variant="body1"><MuiMarkdown>{i18n(props.descriptionKey)}</MuiMarkdown></Typography>
    </>);
}

// The tutorial configuration
const TUTORIALS : any = {
    "TUTORIAL_1": [    
        {
            target: "#phaser-div",
            placement: "auto",
            content: <TutorialItem nameKey="TUTORIAL_VIEWPORT_TITLE" descriptionKey="TUTORIAL_VIEWPORT_DESC" />,
            disableBeacon: true
        },
        { 
            target: "#cq-toolbar",
            placement: "auto",
            content: <TutorialItem nameKey="TUTORIAL_TOOLBAR_TITLE" descriptionKey="TUTORIAL_TOOLBAR_DESC" />,
        },
        {
            target: "#cq-puzzle-desc",
            placement: "auto",
            content: <TutorialItem nameKey="TUTORIAL_PUZZLEDESC_TITLE" descriptionKey="TUTORIAL_PUZZLEDESC_DESC" />
        },
        {
            target: ".cq-blockly-workspace",
            placement: "auto",
            content: <TutorialItem nameKey="TUTORIAL_BLOCKLY_WORKSPACE_TITLE" descriptionKey="TUTORIAL_BLOCKLY_WORKSPACE_DESC" />
        },
        {
            target: "#cq-read-only-code",
            placement: "auto",
            content: <TutorialItem nameKey="TUTORIAL_BLOCKLY_CODE_TITLE" descriptionKey="TUTORIAL_BLOCKLY_CODE_DESC" />
        },
    ],
    "TUTORIAL_2": [
        {
            target: "#cq-code",
            placement: "auto",
            content: <TutorialItem nameKey="TUTORIAL_CODE_TITLE" descriptionKey="TUTORIAL_CODE_DESC" />,
            disableBeacon: true
        },
        {
            target: "#cq-code-documentation",
            placement: "auto",
            content: <TutorialItem nameKey="TUTORIAL_CODE_DOC_TITLE" descriptionKey="TUTORIAL_CODE_DOC_DESC" />
        }
    ]
};

// Simple wrapper component that wraps react-joyride
export default function Tutorial() {
    const [tutorial, setTutorial] = useState<Array<Step>>([]);
    const [tutorialID, setTutorialID] = useState<string>("");
    const [tutorialsShown, setTutorialsShown] = useLocalStorage<Array<string>>("tutorialsShown", []);
    const theme = useTheme();
    const [puzzle] = usePuzzle();
    
    // Called when the tutorial ends
    function tutorialEnded(data : CallBackProps) {
        if (data.status == "finished") {
            setTutorialsShown([...tutorialsShown!, tutorialID]);
        }
    }

    // Effect that listens to the current puzzle to see whether a tutorial needs to be triggered
    useEffect(() => {
        if (puzzle && puzzle.triggerTutorial) {
            setTutorial(TUTORIALS[puzzle.triggerTutorial]);
            setTutorialID(puzzle.triggerTutorial);
        }
    }, [puzzle]);

    return (
        <ReactJoyride 
            continuous
            hideCloseButton
            run={!tutorialsShown?.includes(tutorialID)}
            callback={tutorialEnded}
            steps={tutorial}
            styles={{ 
                options: { 
                    zIndex: 10000,
                    primaryColor: theme.palette.primary.main,
                    textColor: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.default,
                    overlayColor: "rgba(0, 0, 0, 0.80)",
                    arrowColor: theme.palette.background.default
                },
                buttonNext: { ...theme.typography.button, outline: "none", color: "black", paddingLeft: "16px", paddingRight: "16px", fontWeight: "bold" },
                buttonBack: { ...theme.typography.button, marginRight: "16px"},
            }}
            disableCloseOnEsc
            disableOverlayClose
        />
    );
}