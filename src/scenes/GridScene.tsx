/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import Phaser from "phaser";

// "Hello World" scene with a bouncing logo
class GridScene extends Phaser.Scene {
    constructor() {
        super("GRID");
    }

    preload() {
        this.load.setBaseURL("http://localhost:3000/assets/");
        this.load.image("logo", "/branding/logo_big.png");
    }

    create() {
        var gameSize = this.scale.gameSize;
        var cellCountX = 8;
        var cellCountY = 8;
        
        const cellWidth = gameSize.width / cellCountX;
        const cellHeight = gameSize.height / cellCountY;

        this.add.grid(
            this.scale.gameSize.width / 2, 
            gameSize.height / 2, 
            gameSize.width, 
            gameSize.height, 
            cellWidth, 
            cellHeight, 
            0xff0000, 
            0, 
            0x000000
        );

        var logo = this.add.sprite(4 * cellWidth + (cellWidth / 2), 4 * cellHeight + (cellHeight / 2), "logo");
        logo.setSize(cellWidth, cellHeight);
        logo.setDisplaySize(cellWidth, cellHeight);
    }

    update(time: number, delta: number): void {
        
    }
}

export default GridScene;
