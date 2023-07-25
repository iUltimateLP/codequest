/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { ILocale } from "@/core/LocalizationService";
import * as Blockly_Lang_En from "blockly/msg/en";

const i18n_en : ILocale = {
    RUN_PROGRAM: "Run Program"
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
    "CQ_PRINT_B": ""
};

export { BLOCKLY_LANG_EN, i18n_en };
