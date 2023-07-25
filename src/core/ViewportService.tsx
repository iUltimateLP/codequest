/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

'use client';

import { Logger } from "./Logging";
import { Puzzle, PuzzleService } from "./PuzzleService";
import { Service } from "./Service";
import Phaser from "phaser";
import { GridEngine } from "grid-engine";

import PHASER_SCENE_REGISTRY from "@/scenes/_scenes";

// Phaser game config
const config : Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0,
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        resizeInterval: 50,
        width: 512,
        height: 512,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 }
        }
    },
    render: {
        //transparent: true,
        antialias: false
    },
    plugins: {
        scene: [
            {
                key: "gridEngine",
                plugin: GridEngine,
                mapping: "gridEngine"
            }
        ]
    },
    
};

const PHASER_CONTAINER_NAME : string = "phaser-div";

// Service that handles the viewport and it's Phaser subsytem
class ViewportService extends Service {
	constructor() {
		super();

		// Bind the PuzzleChangedEvent
		Service.get(PuzzleService).PuzzleChangedEvent.subscribe(this.onPuzzleChanged.bind(this));
	}

    // Tells Phaser to update world bounds (if e.g. the canvas' size changed)
    public updateGameSize() {
        //this._currentScene?.scale.updateScale();
        this._currentScene?.scale.updateBounds();
        this._currentScene?.scale.getParentBounds();
        
        this._currentScene?.scale.setGameSize(this._currentScene?.scale.parentSize.width, this._currentScene?.scale.parentSize.height)
        //this._currentScene?.scene.restart();
    }

    // Returns the current scene of type T, if any
    public getScene<T = Phaser.Scene>() : T | null {
        return this._currentScene as T;
    }

    // Returns whether the game is properly initialized
    public isGameInitialized() : boolean {
        return this._game != undefined && this._currentScene != undefined && this._puzzle != undefined;
    }

	// Called when a puzzle changes
	private onPuzzleChanged(puzzle : Puzzle) {
        // Don't react on server
        if (typeof window === 'undefined')
            return;

        this._puzzle = puzzle;

        // Don't act if no puzzle
		if (!puzzle)
			return;

        this.waitForContainerThenCreateGame();
	}

    // Waits until the container div is created, then creates the Phaser instance
    private waitForContainerThenCreateGame() {
        // Wait until the parent container div is created
        if (!document.getElementById(PHASER_CONTAINER_NAME)) {
            setTimeout(this.waitForContainerThenCreateGame, 500);
            return;
        }

        // Make sure a puzzle is set
        if (!this._puzzle)
            return;

        // Create a new phaser game if none is present yet
        if (!this._game)
		    this.createPhaserGame();

        // If there's a scene running, remove it first
        if(this._currentSceneID)
            this._game!.scene.remove(this._currentSceneID)

        // Make sure the scene exists
        var sceneObj : Phaser.Types.Scenes.SceneType | undefined = PHASER_SCENE_REGISTRY.get(this._puzzle.scene);
        if (!sceneObj) {
            Logger.error(`Scene ${this._puzzle.scene} could not be found!`);
            return;
        }

        // Load the new scene
        this._currentScene = this._game!.scene.add(this._puzzle.scene, sceneObj, true);
        this._currentSceneID = this._puzzle.scene;

        // Initially update game size
        this.updateGameSize();
    }

	private createPhaserGame() {
        // Don't react on server
        if (typeof window === 'undefined')
            return;

		// Creates a new Phaser instance
        this._game = new Phaser.Game({...config, parent: PHASER_CONTAINER_NAME});
	}

	private destroyPhaserGame() {
		// Destroys the Phaser game instance
		this._game?.destroy(true);
		this._game = null;
	}

    private _puzzle : Puzzle | null = null;
	private _game : Phaser.Game | null = null;
    private _currentScene : Phaser.Scene | null = null;
    private _currentSceneID : string | null = null;
}

export { ViewportService };
