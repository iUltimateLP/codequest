/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import Phaser from "phaser";
import { DirectionVector, SceneUtils } from "./Utils";
import { Direction, Finished, GridEngineConfig, Position } from "grid-engine";
import { Logger } from "@/core/Logging";
import { MathUtils } from "@/core/Math";
import { UiService } from "@/core/UiService";
import { Service } from "@/core/Service";
import { GridSprite } from "./GridSprite";
import { PuzzleObjective, PuzzleService } from "@/core/PuzzleService";

// Parent Phaser scene for every scene that's used within CodeQuest
abstract class CodeQuestScene extends Phaser.Scene {
    // Scale of the scene
    protected SCENE_SCALE : number = 3;

    // Size of a tile in the tileset
    protected TILE_SIZE : number = 16;

    // Default direction in which the player looks
    protected DEFAULT_DIR : Direction = Direction.RIGHT;

    // Default position of the player
    protected DEFAULT_POS : { x : number, y : number} = { x: 30, y: 30 };

    // Abstract function to implement by children to set up the map
    protected abstract setUpMap() : void;

    preload() {
        // Default assets
        this.load.setBaseURL("http://localhost:3000/assets/");
        this.load.image("player", "game/player_placeholder.png");
        this.load.image("vignette", "game/vignette_overlay.png");
        this.load.image("marker", "game/goal_circle.png");
        this.load.image("flag", "game/start_flag.png");
    }
    
    create() {
        // Set up map
        this.setUpMap();
        if (!this._map) {
            Logger.error("Scene tries to create without a map being initialized!");
            return;
        }

        // Create the player
        this._player = this.add.sprite(0, 0, "player");
        this._player.setDisplaySize(this.TILE_SIZE * this.SCENE_SCALE, this.TILE_SIZE * this.SCENE_SCALE);
        this._targetPlayerRotation = SceneUtils.dir2deg(this.DEFAULT_DIR);

        // Set up camera to follow player
        this.cameras.main.startFollow(this._player, true, 0.35, 0.35);
        this.cameras.main.setBounds(0.5 * this.TILE_SIZE, 0.5 * this.TILE_SIZE, (this._map.width - 0.5) * this.TILE_SIZE * this.SCENE_SCALE, (this._map.height - 0.5) * this.TILE_SIZE * this.SCENE_SCALE);        
    
        // Create the outline grid that's used to visualize the grid the map follows
        this._outlineGrid = this.add.grid(
            this._map.width * 0.5 * this.TILE_SIZE * this.SCENE_SCALE,
            this._map.height * 0.5 * this.TILE_SIZE * this.SCENE_SCALE,
            this._map.width * this.TILE_SIZE * this.SCENE_SCALE, 
            this._map.height * this.TILE_SIZE * this.SCENE_SCALE, 
            this.TILE_SIZE * this.SCENE_SCALE, 
            this.TILE_SIZE * this.SCENE_SCALE, 
            0xff0000, 
            0, 
            0xffffff, 
            0.09);
        this._outlineGrid.setDepth(100);

        // Add a vignette effect
        this._vignette = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "vignette");
        this._vignette.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        this._vignette.setDepth(101);
        this._vignette.setScrollFactor(0);
        this._vignette.setAlpha(0.5);

        // Set up the grid engine configiguration
        const gridEngineConfig : GridEngineConfig = {
            characters: [
                {
                    id: "player",
                    sprite: this._player,
                    startPosition: this.DEFAULT_POS,
                    facingDirection: this.DEFAULT_DIR,
                    offsetX: this.TILE_SIZE * this.SCENE_SCALE * 0.5,
                    offsetY: this.TILE_SIZE * this.SCENE_SCALE * 0.5,
                    speed: 10,
                }
            ],
            numberOfDirections: 4
        }

        // Create grid engine
        this.gridEngine.create(
            this._map,
            gridEngineConfig,
        );

        // Create flag
        this._startFlag = new GridSprite(this, this.DEFAULT_POS, "flag");
        this._startFlag.setTint(0x888888);
        this.add.existing(this._startFlag);

        // Listen to events
        Service.get(PuzzleService).PuzzleObjectiveChangedEvent.subscribe(this.onPuzzleObjectiveChanged.bind(this));
    }

    private onPuzzleObjectiveChanged(objective : PuzzleObjective) {
        // Gather markers to draw
        if (objective) {
            objective.goals?.forEach((goal) => {
                if (!goal.data)
                    return;
                
                const markerPos : Position = goal.data["circlePosition"] ?? null;
                this.addMarker(`${objective.id}_${goal.id}`, 0xff0000, markerPos);
            });
        }
    }

    update(time: number, delta: number): void {
        // Hack for ensuring correct rotation pivot in gridEngine
        this._player?.setOrigin(0.5);

        // Interpolate to the target angle
        this._player?.setAngle(MathUtils.interpToDeg(this._player.angle, this._targetPlayerRotation, delta, 0.01));
    }

    // Requests to change the size of the game and gives the scene a chance to update
    public changeGameSize(newSizeX : number, newSizeY : number) : void {
        // Update vignette size
        this._vignette?.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
        this._vignette?.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    
        // Update all objects with postFX
        
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
    public resetPlayer() : Promise<Finished> {
        return new Promise<Finished>((resolve, reject) => {
            // Temporarily boost speed
            const originalSpeed = this.gridEngine.getSpeed("player");
            this.gridEngine.setSpeed("player", originalSpeed * 4);

            // Move back to the spawn
            this.gridEngine.moveTo("player", this.DEFAULT_POS, {
                ignoreLayers: true
            })
            .subscribe((args : Finished) => {
                // Reset speed
                this.gridEngine.setSpeed("player", originalSpeed);
                resolve(args);
            });

            this._targetPlayerRotation = SceneUtils.dir2deg(this.DEFAULT_DIR);
            this._currentPlayerDirection = this.DEFAULT_DIR;

            Service.get(UiService).playSound("walk_down", 0.25);
        });
    }

    public getPlayer() : Phaser.GameObjects.Sprite | null {
        return this._player;
    }

    public getPlayerPosition() : Position {
        return this.gridEngine.getPosition("player");
    }

    public addMarker(key : string, color : number, initialPosition : Position) {
        // Create the marker
        const marker = new GridSprite(this, { x: 0, y: 0 }, "marker");
        marker.setTint(color);
        this.add.existing(marker);

        this.tweens.add({
            targets: marker,
            ease: Phaser.Math.Easing.Sine.InOut,
            duration: 1000,
            loop: -1,
            yoyo: true,
            alpha: {
                getStart: () => 0.4,
                getEnd: () => 1
            }
        });

        this.tweens.add({
            targets: marker,
            duration: 10000,
            loop: -1,
            angle: {
                getStart: () => 0,
                getEnd: () => 360
            }
        });

        // Add into registry
        this._markers[key] = marker;

        // Set position
        this.setMarkerPosition(key, initialPosition);
    }

    public setMarkerPosition(key : string, pos : Position) {
        this._markers[key]?.setGridPosition(pos);
    }

    public getMarkerPosition(key : string) : Position {
        if (!this._markers[key])
            return { x: 0, y: 0 };
        
        return this.worldToGrid(this._markers[key].x, this._markers[key].y);
    }

    public worldToGrid(x : number, y : number) : Position {
        return { x: Math.floor(x / this.SCENE_SCALE / this.TILE_SIZE), y: Math.floor(y / this.SCENE_SCALE / this.TILE_SIZE) };
    }

    public gridToWorld(x : number, y : number) : Position {
        return { x: (x + 0.5) * this.TILE_SIZE * this.SCENE_SCALE, y: (y + 0.5) * this.TILE_SIZE * this.SCENE_SCALE };
    }

    public getTileSize() : number {
        return this.TILE_SIZE * this.SCENE_SCALE;
    }

    // Player stuff
    protected _player : Phaser.GameObjects.Sprite | null = null;
    private _currentPlayerDirection : Direction = Direction.RIGHT;
    private _targetPlayerRotation : number = 0;

    // Map stuff
    protected _map : Phaser.Tilemaps.Tilemap | null = null;
    protected _outlineGrid : Phaser.GameObjects.Grid | null = null;
    protected _vignette : Phaser.GameObjects.Image | null = null;
    
    // @ts-ignore
    protected gridEngine : GridEngine;

    // Other stuff
    protected _markers : {[key: string] : GridSprite} = {};
    protected _startFlag : GridSprite | null = null;
}

export default CodeQuestScene;
