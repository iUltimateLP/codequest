/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { LogCategory, Logger } from "./Logging";
import { Service } from "./Service";
import { BlocklyWorkspace } from "react-blockly";
import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import { CodeBinding } from "./CodeEvalService";

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

    // Registers a new binding with Blockly
    public registerBinding(id : string, binding : CodeBinding) {
        // Make sure the binding functions are valid
        if (!binding.blocklyGenerator || !binding.codeGenerator) {
            Logger.error(`Trying to register binding ${id} but callbacks are  binding.blocklyGenerator: ${binding.blocklyGenerator}, codeGenerator: ${binding.codeGenerator}`);
            return;
        }

        // Register Blockly block
        Blockly.Blocks[id] = {
            init: function() { 
                binding.blocklyGenerator(this); // "this" is a reference to the actual Block being created
            }
        }

        // Register code generator block
        javascriptGenerator.forBlock[id] = binding.codeGenerator;
    }

    // Unregisters a binding from Blockly
    public unregisterBinding(id : string) {
        Blockly.Blocks[id] = null;
        javascriptGenerator.forBlock[id] = null;
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
