/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import Phaser from "phaser";

class CityScene extends Phaser.Scene {
    constructor() {
        super("CITY");
    }

    preload() {
        this.load.setBaseURL("http://localhost:3000/assets/");
        this.load.image("tileset", "scenes/tileset_city.png");
        this.load.tilemapTiledJSON("tilemap", "scenes/scene_city.json");
    }

    create() {
        const map = this.make.tilemap({key: "tilemap"});
        const tileset = map.addTilesetImage("tileset_city", "tileset");
        map.layers.forEach(layer => {
            // @ts-ignore
            map.createLayer(layer.name, tileset);
        });
    }

    update(time: number, delta: number): void {
        
    }
}

export default CityScene;
