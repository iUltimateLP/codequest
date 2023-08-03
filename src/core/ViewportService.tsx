/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

'use client';

import CodeQuestScene from "@/scenes/CodeQuestScene";
import { Logger } from "./Logging";
import { Puzzle, PuzzleService } from "./PuzzleService";
import { Service } from "./Service";
import { Game as GameType, Scene as SceneType } from "phaser";

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
        
        const sizeX = this._currentScene?.scale.parentSize.width;
        const sizeY = this._currentScene?.scale.parentSize.height;
        this._currentScene?.scale.setGameSize(sizeX!, sizeY!);
        //this._currentScene?.scene.restart();

        this.getScene<CodeQuestScene>()?.changeGameSize(sizeX!, sizeY!);
    }

    // Returns the current scene of type T, if any
    public getScene<T = Phaser.Scene>() : T | null {
        return this._currentScene as T;
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
	}

    public loadScene() {
        // Make sure a puzzle is set
        if (!this._puzzle)
            return;

        // If there's a scene running, remove it first
        if(this._currentSceneID)
            this._game!.scene.remove(this._currentSceneID)

        // Make sure the scene exists
        var sceneObj : SceneType | undefined = this._sceneRegistry?.get(this._puzzle.scene);
        if (!sceneObj) {
            Logger.error(`Scene ${this._puzzle.scene} could not be found!`);
            return;
        }
        
        // Load the new scene
        const returnedScene = this._game!.scene.add(this._puzzle.scene, sceneObj, true);
        this._currentScene = returnedScene;
        this._currentSceneID = this._puzzle.scene;

        // Initially update game size
        this.updateGameSize();
    }

    // Associates a Phaser game instance with the ViewportService
    public setGame(game : GameType) {
        // Destroy any other game
        if (this._game) {
            this._game.destroy(true);
        }

        Logger.info("Phaser Game instance set at ViewportService!");
        this._game = game;
    }

    // Returns the current phaser game
    public getGame() : GameType | null {
        return this._game;
    }

    // Associates a new scene registry
    public setSceneRegistry(newRegistry : Map<string, SceneType>) {
        this._sceneRegistry = newRegistry;
    }

    private _puzzle : Puzzle | null = null;
	private _game : GameType | null = null;
    private _currentScene : SceneType | null = null;
    private _currentSceneID : string | null = null;
    private _sceneRegistry : Map<string, SceneType> | null = null;
}

export { ViewportService };
