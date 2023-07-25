/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import Blockly from "blockly";
import Interpreter from "js-interpreter";

// A "binding" is used to define a method that lives both in Blockly and JS world
interface CodeBinding {
    // Name of the binding
    name : string;

    // Blockly toolbox category
    blocklyToolboxCategory: string;

    // Blockly toolbox block definition
    blocklyToolboxDefinition : Blockly.utils.toolbox.BlockInfo;

    // Blockly callback to generate the blockly block presented to the user in the visual programming mode
    blocklyGenerator : (block : Blockly.Block) => void;

    // Callback to tell Blockly how to generate the text code version of the block
    codeGenerator : (block : Blockly.Block, generator : Blockly.CodeGenerator) => string;

    // Native JavaScript function that's executed if this binding is called
    nativeFn : Function;

    // Optional function that's called by CodeEvalService to set up the interpreter with any additional data it could need when executing `nativeFn`
    prepareInterpreter? : (interpreter : Interpreter, globalObject : Object) => void;

    // Whether this function is asynchronous or not
    async? : boolean;
}

export type { CodeBinding };
