/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import Phaser from "phaser";
import CodeQuestScene from "./CodeQuestScene";

// Scene for chapter1
class CityScene extends CodeQuestScene {
    constructor() {
        super("CITY");
        this.DEFAULT_POS = { x: 25, y: 30};
    }

    preload() {
        super.preload();
        this.load.image("tileset", "scenes/tileset_city.png");
        this.load.tilemapTiledJSON("tilemap", "scenes/scene_city.json");
    }

    protected setUpMap(): void {
        // Create the map and tileset
        this._map = this.make.tilemap({key: "tilemap"});
        const tileset = this._map.addTilesetImage("tileset_city", "tileset")!;
        
        // Instantiate each layer
        for (var layerIdx = 0; layerIdx < this._map.layers.length; layerIdx++) {
            var tiledLayer : Phaser.Tilemaps.LayerData = this._map.layers[layerIdx];
            const layer : Phaser.Tilemaps.TilemapLayer | null = this._map.createLayer(tiledLayer.name, tileset, 0, 0);
            
            if (layer) {
                layer.scale = this.SCENE_SCALE;
            }
        };
    }

    create() {
        super.create();

        if (!this._map || !this._player)
            return;

        this._marker?.setGridPosition({ x: 32, y: 30 });
    }

    update(time: number, delta: number) : void {
        super.update(time, delta);
    }
}

export default CityScene;
