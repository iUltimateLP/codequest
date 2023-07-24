/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

'use client';

import { Direction } from "grid-engine";

interface DirectionVector { x: number, y: number };

class SceneUtils {
    // Handles generic cursor key movement
    public static handleCursorKeys(scene : Phaser.Scene) {
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

    // Converts a grid-engine direction to a x,y vector
    public static dir2vec(dir : Direction) : DirectionVector {
        switch (dir) {
            case Direction.UP:
                return { x: 0, y: -1 };
            case Direction.DOWN:
                return { x: 0, y: 1};
            case Direction.LEFT:
                return { x: -1, y: 0};
            case Direction.RIGHT:
                return { x: 1, y: 0};
            case Direction.UP_LEFT:
                return { x: -1, y: -1};
            case Direction.UP_RIGHT:
                return { x: 1, y: -1};
            case Direction.DOWN_LEFT:
                return { x: -1, y: 1};
            case Direction.DOWN_RIGHT:
                return { x: 1, y: 1};
            case Direction.NONE:
                return { x: 0, y: 0};
        }
    }

    // Converts a grid-engine direction to degrees
    public static dir2deg(dir : Direction) : number {
        const directionsDeg = new Map<Direction, number>([
            [Direction.UP, 0],
            [Direction.RIGHT, 90],
            [Direction.DOWN, 180],
            [Direction.LEFT, -90]
        ]);
        return directionsDeg.get(dir)!;
    }

    // Converts a grid-engine direction to radian
    public static dir2rad(dir : Direction) : number {
        const directionsDeg = new Map<Direction, number>([
            [Direction.UP, 0],
            [Direction.RIGHT, Math.PI/2],
            [Direction.DOWN, Math.PI],
            [Direction.LEFT, (3*Math.PI)/2]
        ]);
        return directionsDeg.get(dir)!;
    }
}

export type { DirectionVector };
export { SceneUtils };
