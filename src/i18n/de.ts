/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { ILocale } from "@/core/LocalizationService";
import * as Blockly_Lang_De from "blockly/msg/de";

const i18n_de : ILocale = {
    RUN_PROGRAM: "Programm starten",

    OBJECTIVE_NEXT: "Weiter",
    OBJECTIVE_TITLE: "Aufgaben",
    OBJECTIVE_END: "Fertig",

    TUTORIAL_TOOLBAR_TITLE: "Werkzeugleiste",
    TUTORIAL_TOOLBAR_DESC: "Das ist die _Werkzeugleiste_. Hier gibt es grundlegende Aktionen, wie z.B. das **Starten** deines Programmes!",

    TUTORIAL_VIEWPORT_TITLE: "Viewport",
    TUTORIAL_VIEWPORT_DESC: "Sieht fast aus wie ein Spiel, oder? Der _Viewport_ zeigt deine **Spielfigur** in einer Spielwelt. Um deine Figur zu **steuern** (z.B. Bewegen), musst du deine eigenen Programme schreiben!",

    TUTORIAL_PUZZLEDESC_TITLE: "Quest",
    TUTORIAL_PUZZLEDESC_DESC: "In _CodeQuest_ wirst du kleine Quests lösen müssen, um Fortschritt zu machen. Dieses Fenster zeigt deine **aktuelle Quest** und deine **Aufgaben**.",

    TUTORIAL_BLOCKLY_WORKSPACE_TITLE: "Programmeditor",
    TUTORIAL_BLOCKLY_WORKSPACE_DESC: "Hier programmierst du deine **ersten Programme**. Es ist wie Lego, wirklich!",

    TUTORIAL_BLOCKLY_CODE_TITLE: "Quellcodeansicht",
    TUTORIAL_BLOCKLY_CODE_DESC: "Newstime! Die kleinen fleißigen Roboter hinter den Kulissen arbeiten hart um dir eine **Echtzeit-Quellcode-Version** deines Programmes zu zeigen! **Schau sie dir genau an**, um zu verstehen, wie sich dein Programm in Textform übersetzt - du wirst es brauchen!"

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
    "CQ_PRINT_B": "aus",
};

export { BLOCKLY_LANG_DE, i18n_de };
