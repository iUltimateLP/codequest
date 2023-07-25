/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { useState, useEffect } from "react";
import { Logger } from "./Logging";
import { Service } from "./Service";
import { SubEvent } from "sub-events";
import { LocalizedString } from "./LocalizationService";
import { ViewportService } from "./ViewportService";
import { CodeEvalService } from "./CodeEvalService";

interface PuzzleObjective {
	id : string;
	title : LocalizedString;
	description : LocalizedString;
}

interface Puzzle {
	id: string;
	chapter: number;
	number: number;
	meta: {
		name : LocalizedString;
		tags : string[];
		shortDescription : LocalizedString;
		createdBy : string;
		version : number;
	};
	bindingSets: string[];
	scene: string;
	objectives: PuzzleObjective[];
	objectiveMap: Map<string, PuzzleObjective>; // This is not required on the JSON definition but generated
};

// This service is responsible for setting up, loading and providing information about puzzles
class PuzzleService extends Service {
	public PuzzleChangedEvent : SubEvent<Puzzle> = new SubEvent();
	public PuzzleObjectiveChangedEvent : SubEvent<PuzzleObjective> = new SubEvent();

	// Loads a puzzle with the given name and returns a promise that can be awaited
	public loadPuzzle(name : string) : Promise<Puzzle> {
		return new Promise<Puzzle>((resolve, reject) => {
			// Make sure the puzzle isn't loaded already
			if (this._currentPuzzleName === name) {
				Logger.warn(`Puzzle "${name}" is already loaded, aborting.`);
				resolve(this._currentPuzzle!);
				return;
			}

			// Load the puzzle data
			this.loadPuzzleData(name)
			.then((puzzle : Puzzle) => {
				this._currentPuzzleName = name;
				this._currentPuzzle = puzzle;
				this._currentObjective = puzzle.objectives[0].id;

				// HACK to make sure the Viewport Service exists so it can update
				Service.get(ViewportService);

				// Register bindings of this puzzle
				puzzle.bindingSets.forEach(bindingSet => {
					Service.get(CodeEvalService).registerBindingSet(bindingSet);
				});

				this.PuzzleChangedEvent.emit(this._currentPuzzle);
				this.PuzzleObjectiveChangedEvent.emit(this.getCurrentObjective()!);
				Logger.info(`Successfully loaded puzzle "${name}" ("${puzzle.meta.name.en}")`);
				
				resolve(puzzle);
			})
			.catch(err => {
				Logger.error(`Error loading puzzle "${name}": ${err}`);
				reject(err);
			});
		});
	}

	// Returns the current puzzle
	public getCurrentPuzzle() : Puzzle | null {
		return this._currentPuzzle;
	}

	// Sets the objective the user should pursue
	public setCurrentObjective(objectiveId : string) : PuzzleObjective | null {
		// Check if a puzzle is loaded and that objective even exists
		if (!this._currentPuzzle) {
			Logger.error(`Cannot set "${objectiveId}" as the current objective as no puzzle is loaded!`);
			return null;
		}

		const objective = this._currentPuzzle!.objectiveMap.get(objectiveId);
		if (!objective) {
			Logger.error(`Cannot set "${objectiveId}" as the current objective as it doesn't exist in puzzle "${this._currentPuzzle?.id}"!`);
			return null;
		}

		// Set and emit event
		this._currentObjective = objective.id;
		this.PuzzleObjectiveChangedEvent.emit(objective);

		return objective;
	}

	// Returns the current objective
	public getCurrentObjective() : PuzzleObjective | undefined {
		return this.getCurrentPuzzle()?.objectiveMap.get(this._currentObjective!);
	}

	// Loads a puzzle with the given name and returns a promise that can be awaited
	private loadPuzzleData(name : string) : Promise<Puzzle> {
		return new Promise<Puzzle>((resolve, reject) => {
			// Do not do on server-side
			if (!global.window) {
				reject("Not loading puzzle data on server!");
				return;
			}

			// Fetch the puzzle's JSON file
			const puzzleUrl = `/assets/puzzles/${name}.json`;
			fetch(puzzleUrl)
			.then((response) => response.json())
			.then((json) => { 
				var puzzle = json as Puzzle;

				// Construct a map of objectives from the JSON data
				puzzle.objectiveMap = new Map<string, PuzzleObjective>();
				puzzle.objectives.forEach(v => {
					var objective = v as PuzzleObjective;
					puzzle.objectiveMap.set(objective.id, objective);
				});

				resolve(puzzle);
			})
			.catch((err) => {
				Logger.error(`Error fetching puzzle "${name}": ${err}`);
				reject(err);
			})
		});
	}

	private _currentPuzzleName : string | null = null;
	private _currentPuzzle : Puzzle | null = null;
	private _currentObjective : string | null = null;
}

// React hook that tracks state of the current puzzle
const usePuzzle = () => {
	// Create state
	const [puzzle, setPuzzle] = useState<Puzzle>();

	// Side-effect that's executed once
	useEffect(() => {
		// Subscribe to the events on the puzzle service to update this hook's state
		const puzzleService = Service.get(PuzzleService);
		const sub = puzzleService.PuzzleChangedEvent.subscribe((newPuzzle) => {
			setPuzzle(newPuzzle);
		});

		// Unsubscribe from the events when this effect is disposed
		return () => {
			sub.cancel();
		};
	}, []);

	return [puzzle];
}

// React hook that tracks state of the current puzzle objective
const useObjective = () => {
	// Create state
	const [objective, setObjective] = useState<PuzzleObjective>();

	// Side-effect that's executed once
	useEffect(() => {
		// Subscribe to the events on the puzzle service to update this hook's state
		const puzzleService = Service.get(PuzzleService);
		const sub = puzzleService.PuzzleObjectiveChangedEvent.subscribe((newObjective) => {
			setObjective(newObjective);
		});

		// Unsubscribe from the events when this effect is disposed
		return () => {
			sub.cancel();
		};
	}, []);

	return [objective];
}

export type { LocalizedString, PuzzleObjective, Puzzle };
export { PuzzleService, usePuzzle, useObjective };
