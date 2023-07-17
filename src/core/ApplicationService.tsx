/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { CodeEvalService } from "./CodeEvalService";
import { Logger } from "./Logging";
import { Service } from "./Service";

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

    private _initialized : boolean = false;
    private _currentProgram : string = "";
}

// Statically initialize the ApplicationService 
Service.get(ApplicationService).init();

export { ApplicationService }
