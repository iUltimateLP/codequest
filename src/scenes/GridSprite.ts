/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { Position } from "grid-engine";
import CodeQuestScene from "./CodeQuestScene";

// This implements a simple Phaser sprite that lives in a specified grid cell
class GridSprite extends Phaser.GameObjects.Sprite {
    constructor(scene : CodeQuestScene, pos : Position, key : string) {
        // Convert grid coords
        const converted : Position = scene.gridToWorld(pos.x, pos.y);
        
        // Initialize
        super(scene, converted.x, converted.y, key);
        this._scene = scene;

        this.setDisplaySize(scene.getTileSize(), scene.getTileSize());
        this.setDepth(1000);
    }

    // Sets the position on the grid
    public setGridPosition(pos : Position) {
        const converted : Position = this._scene.gridToWorld(pos.x, pos.y);
        this.setPosition(converted.x, converted.y);
    }

    private _scene : CodeQuestScene;
}

export { GridSprite };
