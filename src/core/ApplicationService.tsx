/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { SubEvent, Subscription } from "sub-events";
import { CodeEvalService, ExecutionFinishedEventArgs } from "./CodeEvalService";
import { Logger } from "./Logging";
import { Service } from "./Service";
import { ViewportService } from "./ViewportService";
import CodeQuestScene from "@/scenes/CodeQuestScene";
import { PuzzleService } from "./PuzzleService";
import { useEffect, useState } from "react";

// This service acts as a "glue" service to be called by the UI layer
class ApplicationService extends Service {
    public ProgramStateChangedEvent : SubEvent<boolean> = new SubEvent<boolean>();

    // Performs post-warmup init steps
    public init() {
        // Register default code bindings
        Service.get(CodeEvalService).registerDefaultBindings();

        this._initialized = true;

        Logger.info("Initialized ApplicationService!");
    }

    // Sets a new program
    public setProgram(program : string) {
        if (program.length <= 0)
            return;
        
        this._currentProgram = program;
    }

    // Returns the current program
    public getProgram() : string {
        return this._currentProgram;
    }

    // Starts execution of the current program
    public executeProgram() {
        if (this._currentProgram.length <= 0) {
            Logger.error("No program to execute.");
            return;
        }

        // Did we ever register for a ExecutionFinishedEvent? 
        if (!this._executionFinishedEventHandle) {
            this._executionFinishedEventHandle = Service.get(CodeEvalService).ExecutionFinishedEvent.subscribe((args : ExecutionFinishedEventArgs) => {
                this.onExecutionFinished(args);
            });
        }

        // Load the current program
        Service.get(CodeEvalService).loadProgram(this._currentProgram);

        // Run it
        Service.get(CodeEvalService).run();

        // Call event
        this.ProgramStateChangedEvent.emit(true);

        // Start the puzzle objective validation loop
        this._puzzleEvalLoopHandle = setInterval(this.puzzleEvalLoop, 100);
    }

    private puzzleEvalLoop() {
        Service.get(PuzzleService).validateCurrentObjective();
    }

    // SubEvent called by CodeEvalService when code execution finished
    private onExecutionFinished(args : ExecutionFinishedEventArgs) {
        // Stop any timeout for the eval loop, if any
        if (this._puzzleEvalLoopHandle)
            clearTimeout(this._puzzleEvalLoopHandle);
        this._puzzleEvalLoopHandle = null;
        
        // Reset the player only if the puzzle is not finished, so we'll do a last validation
        if (!Service.get(PuzzleService).validateCurrentObjective()) {
            Service.get(ViewportService).getScene<CodeQuestScene>()?.resetPlayer();
        }

        // Call event
        this.ProgramStateChangedEvent.emit(false);
    }

    private _initialized : boolean = false;
    private _currentProgram : string = "";
    private _executionFinishedEventHandle : Subscription | null = null;
    private _puzzleEvalLoopHandle : NodeJS.Timeout | null = null;
}

// React hook that tracks state of program execution
const useProgramRunning = () => {
	// Create state
	const [running, setRunning] = useState<boolean>(false);

	// Side-effect that's executed once
	useEffect(() => {
		// Subscribe to the events on the app service to update this hook's state
		const appService = Service.get(ApplicationService);
		const sub = appService.ProgramStateChangedEvent.subscribe((newState) => {
			setRunning(newState);
		});

		// Unsubscribe from the events when this effect is disposed
		return () => {
			sub.cancel();
		};
	}, []);

	return [running];
}

// Statically initialize the ApplicationService 
Service.get(ApplicationService).init();

export { ApplicationService, useProgramRunning }
