/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { CodeBinding } from "@/core/CodeEvalService";
import Blockly from "blockly";

// @ts-ignore Idk why this is not working...
import { Order } from "blockly/javascript";

const binding : CodeBinding = {
    // Name of the binding
    name: "print",

    // Blockly toolbox category
    blocklyToolboxCategory: "",

    // Blockly toolbox block definition
    blocklyToolboxDefinition: {
        kind: "block"
    },

    // Blockly block generator callback
    blocklyGenerator: function(block : Blockly.Block) {

    },

    // Blockly code generator callback
    codeGenerator: function(block : Blockly.Block, generator : Blockly.CodeGenerator) : string {
        return "";
    },

    // Native JavaScript function to execute
    nativeFn: function() {
        
    }
}

export default binding;
