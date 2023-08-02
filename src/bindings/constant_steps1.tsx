/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import Blockly from "blockly";

// @ts-ignore Idk why this is not working...
import { Order } from "blockly/javascript";
import { CodeBinding } from "./CodeBinding";

const binding : CodeBinding = {
    // Name of the binding
    name: "constant_steps1",

    // The comment to place above the generated code of this binding
    comment: undefined,

    // Blockly toolbox category
    blocklyToolboxCategory: "CONSTANTS",

    // Blockly toolbox block definition
    blocklyToolboxDefinition: {
        kind: "block",
        type: "constant_steps1"
    },

    // Blockly block generator callback
    blocklyGenerator: function(block : Blockly.Block) {
        block.appendDummyInput()
            .appendField("STEP_COUNT_1");
        block.setOutput(true, "Number");
        block.setColour(330);
        block.setTooltip("");
        block.setHelpUrl("");
    },

    // Blockly code generator callback
    codeGenerator: function(block : Blockly.Block, generator : Blockly.CodeGenerator) : string {
        return "12";
    },

    // Native JavaScript function to execute
    nativeFn: function() {
        
    },

    // Whether this function is asynchronous or not
    async: false,

    // Whether this is not a function but rather a constant
    isConstant: true
}

export default binding;
