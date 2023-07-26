/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import BlankScene from "@/scenes/BlankScene";
import CityScene from "./CityScene";

// ADD ALL SCENES HERE
const PHASER_SCENE_REGISTRY : Map<string, Phaser.Types.Scenes.SceneType> = new Map<string, Phaser.Types.Scenes.SceneType>([
    ["BLANK", BlankScene],
    ["CITY", CityScene]
]);

export default PHASER_SCENE_REGISTRY;
