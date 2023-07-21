/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { Direction, GridEngine, GridEngineConfig } from "grid-engine";
import Phaser from "phaser";

class CityScene extends Phaser.Scene {
    constructor() {
        super("CITY");
    }

    preload() {
        this.load.setBaseURL("http://localhost:3000/assets/");
        this.load.image("logo", "/branding/logo_big.png");
        this.load.image("tileset", "scenes/tileset_city.png");
        this.load.tilemapTiledJSON("tilemap", "scenes/scene_city.json");
    }

    create() {
        // Create the map and tileset
        const map : Phaser.Tilemaps.Tilemap = this.make.tilemap({key: "tilemap"});
        const tileset : Phaser.Tilemaps.Tileset = map.addTilesetImage("tileset_city", "tileset")!;
        
        // Instantiate each layer
        map.layers.forEach(tiledLayer => {
            const layer : Phaser.Tilemaps.TilemapLayer | null = map.createLayer(tiledLayer.name, tileset, 0, 0);
            
            if (layer) {
                layer.scale = 3;
            }
        });

        // Create the player
        const testSprite = this.add.sprite(0, 0, "logo");
        testSprite.setDisplaySize(16*3, 16*3);
        testSprite.setSize(16*3, 16*3);

        // Set up camera to follow player
        this.cameras.main.startFollow(testSprite, true);
        this.cameras.main.setFollowOffset(
            -testSprite.width,
            -testSprite.height,
          );

        // Set up the grid engine configiguration
        const gridEngineConfig : GridEngineConfig = {
            characters: [
                {
                    id: "player",
                    sprite: testSprite,
                    startPosition: { x: 30, y: 30},
                    collides: {
                        collidesWithTiles: true
                    }
                }
            ],
            numberOfDirections: 8
        }

        // Create grid engine
        this.gridEngine.create(
            map,
            gridEngineConfig,
        );
    }

    update(time: number, delta: number): void {
        const cursors = this.input.keyboard!.createCursorKeys();
        if (cursors.left.isDown && cursors.up.isDown) {
            this.gridEngine.move("player", Direction.UP_LEFT);
        } else if (cursors.left.isDown && cursors.down.isDown) {
            this.gridEngine.move("player", Direction.DOWN_LEFT);
        } else if (cursors.right.isDown && cursors.up.isDown) {
            this.gridEngine.move("player", Direction.UP_RIGHT);
        } else if (cursors.right.isDown && cursors.down.isDown) {
            this.gridEngine.move("player", Direction.DOWN_RIGHT);
        } else if (cursors.left.isDown) {
            this.gridEngine.move("player", Direction.LEFT);
        } else if (cursors.right.isDown) {
            this.gridEngine.move("player", Direction.RIGHT);
        } else if (cursors.up.isDown) {
            this.gridEngine.move("player", Direction.UP);
        } else if (cursors.down.isDown) {
            this.gridEngine.move("player", Direction.DOWN);
        }
    }

    // @ts-ignore
    gridEngine: GridEngine;
}

export default CityScene;
