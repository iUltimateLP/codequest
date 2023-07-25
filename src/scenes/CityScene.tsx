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

const DEFAULT_POS : { x: number, y: number } = { x: 30, y: 30 };
const DEFAULT_DIR : Direction = Direction.RIGHT;

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
        this._map = this.make.tilemap({key: "tilemap"});
        this._tileset = this._map.addTilesetImage("tileset_city", "tileset")!;
        
        // Instantiate each layer
        for (var layerIdx = 0; layerIdx < this._map.layers.length; layerIdx++) {
            var tiledLayer : Phaser.Tilemaps.LayerData = this._map.layers[layerIdx];
            const layer : Phaser.Tilemaps.TilemapLayer | null = this._map.createLayer(tiledLayer.name, this._tileset, 0, 0);
            
            if (layer) {
                layer.scale = SCENE_SCALE;
            }
        };

        // Create the outline grid that's used to visualize the grid the map follows
        this._outlineGrid = this.add.grid(
            this._map.width * 0.5 * TILE_SIZE * SCENE_SCALE,
            this._map.height * 0.5 * TILE_SIZE * SCENE_SCALE,
            this._map.width * TILE_SIZE * SCENE_SCALE, 
            this._map.height * TILE_SIZE * SCENE_SCALE, 
            TILE_SIZE * SCENE_SCALE, 
            TILE_SIZE * SCENE_SCALE, 
            0xff0000, 
            0, 
            0xffffff, 
            0.125);
        this._outlineGrid.setDepth(100);

        // Create the player
        this._player = this.add.sprite(0, 0, "player");
        this._player.setDisplaySize(TILE_SIZE * SCENE_SCALE, TILE_SIZE * SCENE_SCALE);
        //this._player.setSize(TILE_SIZE * SCENE_SCALE, TILE_SIZE * SCENE_SCALE);
        this._targetPlayerRotation = SceneUtils.dir2deg(DEFAULT_DIR);

        // Set up camera to follow player
        this.cameras.main.startFollow(this._player, true, 0.35, 0.35);
        this.cameras.main.setBounds(0.5 * TILE_SIZE, 0.5 * TILE_SIZE, (this._map.width - 0.5) * TILE_SIZE * SCENE_SCALE, (this._map.height - 0.5) * TILE_SIZE * SCENE_SCALE);

        // Set up the grid engine configiguration
        const gridEngineConfig : GridEngineConfig = {
            characters: [
                {
                    id: "player",
                    sprite: this._player,
                    startPosition: DEFAULT_POS,
                    facingDirection: DEFAULT_DIR,
                    offsetX: TILE_SIZE * SCENE_SCALE * 0.5,
                    offsetY: TILE_SIZE * SCENE_SCALE * 0.5,
                    speed: 10
                }
            ],
            numberOfDirections: 4
        }

        // Create grid engine
        this.gridEngine.create(
            this._map,
            gridEngineConfig,
        );
    }

    update(time: number, delta: number): void {
        //SceneUtils.initArrowKeyControls(this);
        this._player?.setOrigin(0.5);
        this._player?.setAngle(MathUtils.interpToDeg(this._player.angle, this._targetPlayerRotation, delta, 0.01));
    }

    // Moves the _player forward
    public movePlayer() : Promise<Finished> {
        return new Promise((resolve, reject) => {
            // Calculate position
            const currentPos : Position = this.gridEngine.getPosition("player");
            const _playerDirection : DirectionVector = SceneUtils.dir2vec(this._currentPlayerDirection);
            var targetPos : Position = {
                x: currentPos.x + _playerDirection.x,
                y: currentPos.y + _playerDirection.y
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
    public turnPlayer(clockwise : boolean) {
        // Figure out which direction is the new direction
        const directionsCW = [Direction.UP, Direction.RIGHT, Direction.DOWN, Direction.LEFT];
        const currentDirectionIdx = directionsCW.indexOf(this._currentPlayerDirection);
        const nextDirectionIdx = clockwise ? (currentDirectionIdx + 1) % directionsCW.length : (currentDirectionIdx - 1) < 0 ? 3 : currentDirectionIdx - 1;
        const nextDirection = directionsCW[nextDirectionIdx];

        // Set the new direction and the player's rotation accordingly
        this._currentPlayerDirection = nextDirection;
        this._targetPlayerRotation = SceneUtils.dir2deg(nextDirection);

        Service.get(UiService).playSound("turn", 0.25);
    }

    // Resets the player to the start point
    public resetPlayer() {
        // Temporarily boost speed
        const originalSpeed = this.gridEngine.getSpeed("player");
        this.gridEngine.setSpeed("player", originalSpeed * 4);

        // Move back to the spawn
        this.gridEngine.moveTo("player", {x: 30, y: 30}, {
            ignoreLayers: true
        })
        .subscribe(({}) => {
            // Reset speed
            this.gridEngine.setSpeed("player", originalSpeed);
        });

        this._targetPlayerRotation = SceneUtils.dir2deg(DEFAULT_DIR);
        this._currentPlayerDirection = DEFAULT_DIR;

        Service.get(UiService).playSound("walk_down", 0.25);
    }

    // @ts-ignore
    gridEngine : GridEngine;
    _player : Phaser.GameObjects.Sprite | null = null;
    _map : Phaser.Tilemaps.Tilemap | null = null;
    _tileset : Phaser.Tilemaps.Tileset | null = null;
    _outlineGrid : Phaser.GameObjects.Grid | null = null;
    
    _currentPlayerDirection : Direction = Direction.RIGHT;
    _targetPlayerRotation : number = 0;
}

export default CityScene;
