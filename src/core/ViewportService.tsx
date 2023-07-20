/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { Logger } from "./Logging";
import { Puzzle, PuzzleService } from "./PuzzleService";
import { Service } from "./Service";
import Phaser from "phaser";
import PHASER_SCENE_REGISTRY from "@/scenes/_scenes";

// Phaser game config
const config : Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: "#000000",
    scale: {
        mode: Phaser.Scale.ScaleModes.RESIZE
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 }
        }
    },
    render: {
        transparent: true
    }
};

// Service that handles the viewport and it's Phaser subsytem
class ViewportService extends Service {
	constructor() {
		super();

		// Bind the PuzzleChangedEvent
		Service.get(PuzzleService).PuzzleChangedEvent.subscribe(this.onPuzzleChanged.bind(this));
		console.log(Service.get(PuzzleService).getCurrentPuzzle());
	}

	// Called when a puzzle changes
	private onPuzzleChanged(puzzle : Puzzle) {
        // Don't act if no puzzle
		if (!puzzle)
			return;

        // Create a new phaser game if none is present yet
        if (!this._game)
        {
		    this.createPhaserGame();
        }

        // If there's a scene running, remove it first
        if(this._currentSceneID)
            this._game!.scene.remove(this._currentSceneID)

        // Make sure the scene exists
        var sceneObj : Phaser.Types.Scenes.SceneType | undefined = PHASER_SCENE_REGISTRY.get(puzzle.scene);
        if (!sceneObj) {
            Logger.error(`Scene ${puzzle.scene} could not be found!`);
            return;
        }

        // Load the new scene
        this._currentScene = this._game!.scene.add(puzzle.scene, sceneObj, true);
        this._currentSceneID = puzzle.scene;
	}

	private createPhaserGame() {
		// Creates a new Phaser instance
        this._game = new Phaser.Game({...config, parent: "phaser-div"});
	}

	private destroyPhaserGame() {
		// Destroys the Phaser game instance
		this._game?.destroy(true);
		this._game = null;
	}

	private _game : Phaser.Game | null = null;
    private _currentScene : Phaser.Scene | null = null;
    private _currentSceneID : string | null = null;
}

export { ViewportService };
