/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { Logger } from "./Logging";
import { Service } from "./Service";
import Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";
import { CodeBinding } from "@/bindings/CodeBinding";
import { CODEQUEST_CATEGORIES } from "@/components/editor/blockly/BlocklyConfig";
import { i18n } from "./LocalizationService";

// @ts-ignore
import { Order } from "blockly/javascript";

// Whether to highlight the currently executed block
const HIGHLIGHT_CURRENT_BLOCK : boolean = false;

// Whether to add a spare line between each statement
const EMPTY_LINE_BETWEEN_STATEMENTS : boolean = true;

// This service handles everything related to the visual programming system
class VisualProgrammingService extends Service {
    constructor() {
        super();
        this._blocklyWorkspace = undefined;
        Logger.info("Visual Programming Service created!");
    }

    // Compile the blockly workspace into code
    public compileBlocklyWorkspace() : string {
        // Set up loop trap
        // @ts-ignore
        window.LoopTrap = 1000;
        javascriptGenerator.INFINITE_LOOP_TRAP = `/*CQ-HIDE-START*/if(--window.LoopTrap == 0) throw "Infinite loop.";/*CQ-HIDE-END*/\n`;

        // If wanted, add support for highlighting blocks
        if (HIGHLIGHT_CURRENT_BLOCK) {
            javascriptGenerator.STATEMENT_PREFIX = "/*CQ-HIDE-START*/highlightBlock(%1);/*CQ-HIDE-END*/";
            javascriptGenerator.addReservedWords("highlightBlock");
        }

        // Compiles the Blockly workspace through the JavaScript generator module (from Blockly)
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
                    if (binding.blocklyToolboxCategory === category) {
                        blockList.push(binding.blocklyToolboxDefinition);
                    }
                });

                // Dirty hack
                if (category == "LOGIC") {
                    blockList.push({
                        kind: "block",
                        type: "logic_boolean"
                    });
                }

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
        javascriptGenerator.forBlock[id] = (block : Blockly.Block, generator : Blockly.CodeGenerator) => {
            // Call the code generator from the binding
            var code : any = binding.codeGenerator(block, generator);

            if (binding.isConstant == undefined || binding.isConstant === false) {
                // If wanted, prepend the comment
                if (typeof(binding.comment) === "string") {
                    // A simple string can just be appended
                    var formattedComment = binding.comment;
                    code = `// ${formattedComment}\n${code}`;
                } else if (typeof(binding.comment) === "function") {
                    // It's a function, so translate the LocalizedString and prepend that
                    code = `// ${i18n(binding.comment(block, generator))}\n${code}`;
                }

                // If wanted, append an empty line afterwards
                if (EMPTY_LINE_BETWEEN_STATEMENTS)
                    code += '\n';

                return code ;
            } else {
                return [code, Order.NONE];
            }
        };

        // Remember
        this._registeredBindings.set(id, binding);

        // Show this category
        this.setCategoryVisibility(binding.blocklyToolboxCategory, true);
    }

    // Unregisters a binding from Blockly
    public unregisterBinding(id : string) {
        Blockly.Blocks[id] = null;
        javascriptGenerator.forBlock[id] = null;
        this._registeredBindings.delete(id);
    }

    // Highlights a specific Blockly block
    public highlightBlock(id : any) {
        // Tell Blockly
        (this.getBlocklyWorkspace() as Blockly.WorkspaceSvg)?.highlightBlock(id);
    }

    // Sets the visibility of a given category
    public setCategoryVisibility(categoryName : string, visibility : boolean) {
        const toolbox : Blockly.Toolbox | null = (this._blocklyWorkspace as Blockly.WorkspaceSvg).getToolbox() as Blockly.Toolbox;
        toolbox.getToolboxItems().forEach((a : Blockly.IToolboxItem) => {
            // @ts-ignore
            if (a.flyoutItems_ === categoryName) {
                if (visibility) {
                    // @ts-ignore
                    a.show();
                } else {
                    // @ts-ignore
                    a.hide();
                }
            }
        })

        Blockly.svgResize(this.getBlocklyWorkspace() as Blockly.WorkspaceSvg);
    }

    // Creates a new variable with the given name
    public createVariable(name : string) {
        const variable : Blockly.VariableModel = this.getBlocklyWorkspace().createVariable(name, null, null);
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
