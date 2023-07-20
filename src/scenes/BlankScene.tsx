/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import Phaser from "phaser";

// Just a blank scene
class BlankScene extends Phaser.Scene {
    constructor() {
        super("BLANK");
    }

    create() {
        this.add.text(10, 10, "Blank", { color: "#000 "});
    }
}

export default BlankScene;
