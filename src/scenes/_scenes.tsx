/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import BlankScene from "@/scenes/BlankScene";
import HelloWorldScene from "@/scenes/HelloWorldScene";
import GridScene from "./GridScene";
import CityScene from "./CityScene";

// ADD ALL SCENES HERE
const PHASER_SCENE_REGISTRY : Map<string, Phaser.Types.Scenes.SceneType> = new Map<string, Phaser.Types.Scenes.SceneType>([
    ["BLANK", BlankScene],
    ["HELLO_WORLD", HelloWorldScene],
    ["GRID", GridScene],
    ["CITY", CityScene]
]);

export default PHASER_SCENE_REGISTRY;
