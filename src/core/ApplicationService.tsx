/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { Subscription } from "sub-events";
import { CodeEvalService, ExecutionFinishedEventArgs } from "./CodeEvalService";
import { Logger } from "./Logging";
import { Service } from "./Service";
import { ViewportService } from "./ViewportService";
import CityScene from "@/scenes/CityScene";
import { LocalizationService } from "./LocalizationService";

// This service acts as a "glue" service to be called by the UI layer
class ApplicationService extends Service {
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
    }

    // SubEvent called by CodeEvalService when code execution finished
    private onExecutionFinished(args : ExecutionFinishedEventArgs) {
        // Tell the viewport's scene
        Service.get(ViewportService).getScene<CityScene>()?.resetPlayer();
    }

    private _initialized : boolean = false;
    private _currentProgram : string = "";
    private _executionFinishedEventHandle : Subscription | null = null;
}

// Statically initialize the ApplicationService 
Service.get(ApplicationService).init();

export { ApplicationService }
