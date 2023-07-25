/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { ILocale } from "@/core/LocalizationService";
import * as Blockly_Lang_De from "blockly/msg/de";

const i18n_de : ILocale = {
    RUN_PROGRAM: "Programm starten"
};

const BLOCKLY_LANG_DE : any = {
    ...Blockly_Lang_De,

    "CQ_REPEAT_A": "Wiederhole",
    "CQ_REPEAT_B": "Mal",

    "CQ_TURN": "Drehe",
    "CQ_TURN_LEFT": "links",
    "CQ_TURN_RIGHT": "rechts",

    "CQ_WALK": "Laufe",

    "CQ_SLEEP_A": "Warte",
    "CQ_SLEEP_B": "Sekunde(n)",

    "CQ_PRINT_A": "Gebe",
    "CQ_PRINT_B": "aus"
};

export { BLOCKLY_LANG_DE, i18n_de };
