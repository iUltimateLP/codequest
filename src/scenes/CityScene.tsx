/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { Direction, Finished, GridEngine, GridEngineConfig, Position } from "grid-engine";
import Phaser from "phaser";
import { Service } from "@/core/Service";
import { UiService } from "@/core/UiService";
import { DirectionVector, SceneUtils } from "./Utils";
import { MathUtils } from "@/core/Math";

// Scale of the scene
const SCENE_SCALE : number = 3;

// Size of a tile in the tileset
const TILE_SIZE : number = 16;

class CityScene extends Phaser.Scene {
    constructor() {
        super("CITY");
    }

    preload() {
        this.load.setBaseURL("http://localhost:3000/assets/");
        this.load.image("player", "/game/player_placeholder.png");
        this.load.image("tileset", "scenes/tileset_city.png");
        this.load.tilemapTiledJSON("tilemap", "scenes/scene_city.json");
    }

    create() {
        // Create the map and tileset
        this.map = this.make.tilemap({key: "tilemap"});
        this.tileset = this.map.addTilesetImage("tileset_city", "tileset")!;
        
        // Instantiate each layer
        for (var layerIdx = 0; layerIdx < this.map.layers.length; layerIdx++) {
            var tiledLayer : Phaser.Tilemaps.LayerData = this.map.layers[layerIdx];
            const layer : Phaser.Tilemaps.TilemapLayer | null = this.map.createLayer(tiledLayer.name, this.tileset, 0, 0);
            
            if (layer) {
                layer.scale = SCENE_SCALE;
            }
        };

        // Create the outline grid that's used to visualize the grid the map follows
        this.outlineGrid = this.add.grid(
            this.map.width * 0.5 * TILE_SIZE * SCENE_SCALE,
            this.map.height * 0.5 * TILE_SIZE * SCENE_SCALE,
            this.map.width * TILE_SIZE * SCENE_SCALE, 
            this.map.height * TILE_SIZE * SCENE_SCALE, 
            TILE_SIZE * SCENE_SCALE, 
            TILE_SIZE * SCENE_SCALE, 
            0xff0000, 
            0, 
            0xffffff, 
            0.125);
        this.outlineGrid.setDepth(100);

        // Create the player
        this.player = this.add.sprite(0, 0, "player");
        this.player.setDisplaySize(TILE_SIZE * SCENE_SCALE, TILE_SIZE * SCENE_SCALE);
        //this.player.setSize(TILE_SIZE * SCENE_SCALE, TILE_SIZE * SCENE_SCALE);
        this.targetPlayerRotation = SceneUtils.dir2deg(Direction.RIGHT);

        // Set up camera to follow player
        this.cameras.main.startFollow(this.player, true, 0.35, 0.35);
        this.cameras.main.setBounds(0.5 * TILE_SIZE, 0.5 * TILE_SIZE, (this.map.width - 0.5) * TILE_SIZE * SCENE_SCALE, (this.map.height - 0.5) * TILE_SIZE * SCENE_SCALE);

        // Set up the grid engine configiguration
        const gridEngineConfig : GridEngineConfig = {
            characters: [
                {
                    id: "player",
                    sprite: this.player,
                    startPosition: { x: 30, y: 30 },
                    facingDirection: Direction.RIGHT,
                    offsetX: TILE_SIZE * SCENE_SCALE * 0.5,
                    offsetY: TILE_SIZE * SCENE_SCALE * 0.5
                }
            ],
            numberOfDirections: 4
        }

        // Create grid engine
        this.gridEngine.create(
            this.map,
            gridEngineConfig,
        );
    }

    update(time: number, delta: number): void {
        //SceneUtils.initArrowKeyControls(this);
        this.player?.setOrigin(0.5);
        this.player?.setAngle(MathUtils.interpToDeg(this.player.angle, this.targetPlayerRotation, delta, 0.01));
    }

    // Moves the player forward
    public movePlayer() : Promise<Finished> {
        return new Promise((resolve, reject) => {
            // Calculate position
            const currentPos : Position = this.gridEngine.getPosition("player");
            const playerDirection : DirectionVector = SceneUtils.dir2vec(this.currentPlayerDirection);
            var targetPos : Position = {
                x: currentPos.x + playerDirection.x,
                y: currentPos.y + playerDirection.y
            };

            // Start move to command
            this.gridEngine.moveTo("player", targetPos, {}).subscribe((payload : Finished) => {
                if (payload.result === "SUCCESS") {
                    // Resolve the promise and play a walk sound
                    Service.get(UiService).playSound("walk", 0.25);
                    resolve(payload);
                } else {
                    // Reject the payload and play a camera shake
                    reject(payload);
                    this.cameras.main.shake(300, 0.03);
                }
            });
        });
    }

    // Turns the player
    public turnPlayer() {
        // Figure out which direction is the new direction
        const directionsCW = [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
        const currentDirectionIdx = directionsCW.indexOf(this.currentPlayerDirection);
        const nextDirectionIdx = (currentDirectionIdx + 1) % directionsCW.length;
        const nextDirection = directionsCW[nextDirectionIdx];

        // Set the new direction and the player's rotation accordingly
        this.currentPlayerDirection = nextDirection;
        this.targetPlayerRotation = SceneUtils.dir2deg(nextDirection);

        Service.get(UiService).playSound("turn", 0.25);
    }

    // @ts-ignore
    gridEngine : GridEngine;
    player : Phaser.GameObjects.Sprite | null = null;
    map : Phaser.Tilemaps.Tilemap | null = null;
    tileset : Phaser.Tilemaps.Tileset | null = null;
    outlineGrid : Phaser.GameObjects.Grid | null = null;
    
    currentPlayerDirection : Direction = Direction.RIGHT;
    targetPlayerRotation : number = 0;
}

export default CityScene;
