/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

'use client';

import { Direction } from "grid-engine";

class SceneUtils {
    public static initArrowKeyControls(scene : Phaser.Scene) {
        const cursors = scene.input.keyboard!.createCursorKeys();
        if (cursors.left.isDown && cursors.up.isDown) {
            // @ts-ignore
            scene.gridEngine.move("player", Direction.UP_LEFT);
        } else if (cursors.left.isDown && cursors.down.isDown) {
            // @ts-ignore
            scene.gridEngine.move("player", Direction.DOWN_LEFT);
        } else if (cursors.right.isDown && cursors.up.isDown) {
            // @ts-ignore
            scene.gridEngine.move("player", Direction.UP_RIGHT);
        } else if (cursors.right.isDown && cursors.down.isDown) {
            // @ts-ignore
            scene.gridEngine.move("player", Direction.DOWN_RIGHT);
        } else if (cursors.left.isDown) {
            // @ts-ignore
            scene.gridEngine.move("player", Direction.LEFT);
        } else if (cursors.right.isDown) {
            // @ts-ignore
            scene.gridEngine.move("player", Direction.RIGHT);
        } else if (cursors.up.isDown) {
            // @ts-ignore
            scene.gridEngine.move("player", Direction.UP);
        } else if (cursors.down.isDown) {
            // @ts-ignore
            scene.gridEngine.move("player", Direction.DOWN);
        }
    }
}

export { SceneUtils };
