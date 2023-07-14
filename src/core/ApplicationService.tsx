/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { Logger } from "./Logging";
import { Service } from "./Service";

// This service acts as a "glue" service to be called by the UI layer
class ApplicationService extends Service {
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

    // The currently written program
    private _currentProgram : string = "";
}

export { ApplicationService }
