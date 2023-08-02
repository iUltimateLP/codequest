/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { ILocale } from "@/core/LocalizationService";
import * as Blockly_Lang_En from "blockly/msg/en";

const i18n_en : ILocale = {
    RUN_PROGRAM: "Run Program",

    OBJECTIVE_NEXT: "Next",
    OBJECTIVE_TITLE: "Goals",
    OBJECTIVE_END: "Finish",
    
    TUTORIAL_TOOLBAR_TITLE: "Toolbar",
    TUTORIAL_TOOLBAR_DESC: "This is the _toolbar_. You'll use this to perform common actions, such as **starting** your program!",

    TUTORIAL_VIEWPORT_TITLE: "Viewport",
    TUTORIAL_VIEWPORT_DESC: "Almost looks like a game, doesn't it? The _viewport_ shows your **character** in a game world. To **control** your character, like moving it around, you'll write your own programs!",

    TUTORIAL_PUZZLEDESC_TITLE: "Quest",
    TUTORIAL_PUZZLEDESC_DESC: "In _CodeQuest_, you'll need to solve puzzles in order to progress. This panel will always show your current **objective**.",

    TUTORIAL_BLOCKLY_WORKSPACE_TITLE: "Visual Programming Editor",
    TUTORIAL_BLOCKLY_WORKSPACE_DESC: "This is where you'll create your own **first program**. It's just like playin' with Legos!",

    TUTORIAL_BLOCKLY_CODE_TITLE: "Source Code View",
    TUTORIAL_BLOCKLY_CODE_DESC: "Hey, something new! Robots behind the scenes work really hard to show you a **realtime source code** version of your program! **Use it** to understand how your visual program translates to code - you'll need it!"
};

const BLOCKLY_LANG_EN : any = {
    ...Blockly_Lang_En,

    "CQ_REPEAT_A": "Repeat",
    "CQ_REPEAT_B": "times",

    "CQ_TURN": "Turn",
    "CQ_TURN_LEFT": "left",
    "CQ_TURN_RIGHT": "right",

    "CQ_WALK": "Walk",

    "CQ_SLEEP_A": "Wait",
    "CQ_SLEEP_B": "seconds",

    "CQ_PRINT_A": "Print",
    "CQ_PRINT_B": "",    
    
    "CQ_WHILE_A": "While",
    "CQ_WHILE_B": "do",

    "CQ_IN_FRONT_FREE": "In front of me free?"
};

export { BLOCKLY_LANG_EN, i18n_en };
