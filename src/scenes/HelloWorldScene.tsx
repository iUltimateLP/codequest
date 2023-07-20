/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import Phaser from "phaser";

// "Hello World" scene with a bouncing logo
class HelloWorldScene extends Phaser.Scene {
    constructor() {
        super("HELLO_WORLD");
    }

    preload() {
        this.load.setBaseURL("http://localhost:3000/assets/");
        this.load.image("logo", "/branding/logo_big.png");
    }

    create() {
        console.log("Phaser create!");
        const text = this.add.text(10, 10, "Hello World!", {color: "#000"});
        const logo = this.physics.add.image(50, 50, "logo");
        logo.setDisplaySize(60, 60);
        logo.setBodySize(60, 60);
        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
    }
}

export default HelloWorldScene;
