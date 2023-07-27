/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { Service } from "@/core/Service";
import { ViewportService } from "@/core/ViewportService";
import CodeQuestScene from "@/scenes/CodeQuestScene";

export default function ArriveAtTargetValidator() : boolean {
    // Get the scene
    const scene : CodeQuestScene | null = Service.get(ViewportService).getScene<CodeQuestScene>();
    if (!scene)
        return false;

    // Get the player and marker position
    const playerPos = scene.getPlayerPosition();
    const markerPos = scene.getMarkerPosition();
    //console.log(`Player: ${playerPos.x},${playerPos.y} Marker: ${markerPos.x},${markerPos.y}`);

    return playerPos.x == markerPos.x && playerPos.y == markerPos.y;
}
