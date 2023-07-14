/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { LogCategory, Logger } from "./Logging";
import { Service } from "./Service";
import { BlocklyWorkspace } from "react-blockly";
import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";

// This service handles everything related to the visual programming system
class VisualProgrammingService extends Service {
    constructor() {
        super();
        this._blocklyWorkspace = undefined;
        Logger.info("Visual Programming Service created!");
    }

    // Compile the blockly workspace into code
    public compileBlocklyWorkspace() : string {
        var code : string = javascriptGenerator.workspaceToCode(this.getBlocklyWorkspace());
        return code;
    }

    // Assigns a new blockly workspace
    public setBlocklyWorspace(workspace : Blockly.Workspace) {
        if (!workspace)
            return;
        
        this._blocklyWorkspace = workspace;
        Logger.info("VisualProgrammingService received new Blockly workspace");
    }

    // Returns the currently active blockly workspace
    private getBlocklyWorkspace() : Blockly.Workspace {
        if (!this._blocklyWorkspace)
            Logger.warn("Returned NULL Blockly workspace!")!
        
        return this._blocklyWorkspace!;
    }

    // Reference to the current Blockly workspace
    private _blocklyWorkspace : Blockly.Workspace | undefined;
}

export { VisualProgrammingService };
