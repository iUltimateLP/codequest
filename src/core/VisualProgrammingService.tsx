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
import { CODEQUEST_CATEGORIES } from "@/components/editor/blockly/BlocklyConfig";

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
        //Logger.info("VisualProgrammingService received new Blockly workspace");

        // Go through each of our own categories and gather all bindings to register
        CODEQUEST_CATEGORIES.forEach((category) => {
            // @ts-ignore This is valid TS but the blockly.d.ts is not updated
            workspace.registerToolboxCategoryCallback(category, (_) => {
                // Will contain the blocks that should be added to this category
                var blockList : Blockly.utils.toolbox.BlockInfo[] = [];
    
                // Go through all bindings and push them into the block list
                this._registeredBindings.forEach((binding, id) => {
                    if (binding.blocklyToolboxCategory == category) {
                        blockList.push(binding.blocklyToolboxDefinition);
                    }
                });
    
                return blockList;
            });
        });
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

        // Remember
        this._registeredBindings.set(id, binding);
    }

    // Unregisters a binding from Blockly
    public unregisterBinding(id : string) {
        Blockly.Blocks[id] = null;
        javascriptGenerator.forBlock[id] = null;
        this._registeredBindings.delete(id);
    }

    // Returns the currently active blockly workspace
    private getBlocklyWorkspace() : Blockly.Workspace {
        if (!this._blocklyWorkspace)
            Logger.warn("Returned NULL Blockly workspace!")!
        
        return this._blocklyWorkspace!;
    }

    // Reference to the current Blockly workspace
    private _blocklyWorkspace : Blockly.Workspace | undefined;
    private _registeredBindings : Map<string, CodeBinding> = new Map<string, CodeBinding>();
}

export { VisualProgrammingService };
