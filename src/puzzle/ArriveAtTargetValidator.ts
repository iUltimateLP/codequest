/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { Puzzle, PuzzleObjective, PuzzleObjectiveGoal, PuzzleService } from "@/core/PuzzleService";
import { Service } from "@/core/Service";
import { ViewportService } from "@/core/ViewportService";
import CodeQuestScene from "@/scenes/CodeQuestScene";
import { Position } from "grid-engine";

export default function ArriveAtTargetValidator(goal : PuzzleObjectiveGoal, objective : PuzzleObjective, puzzle : Puzzle) : boolean {
    // Get the scene
    const scene : CodeQuestScene | null = Service.get(ViewportService).getScene<CodeQuestScene>();
    if (!scene)
        return false;

    // Get the player and marker position
    const playerPos = scene.getPlayerPosition();
    const targetPos : Position | null = goal.data ? goal.data["circlePosition"] : null;

    if (targetPos)
        return playerPos.x == targetPos.x && playerPos.y == targetPos.y;
    else
        return false;
}
