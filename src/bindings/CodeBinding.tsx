/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { LocalizedString } from "@/core/LocalizationService";
import Blockly from "blockly";
import Interpreter from "js-interpreter";

// A "binding" is used to define a method that lives both in Blockly and JS world
interface CodeBinding {
    // Name of the binding
    name : string;

    // The comment to place above the generated code of this binding. Can be a simple string, or a function that takes context into account
    comment? : LocalizedString | ((block : Blockly.Block, generator : Blockly.CodeGenerator) => LocalizedString);

    // Blockly toolbox category
    blocklyToolboxCategory: string;

    // Blockly toolbox block definition
    blocklyToolboxDefinition : Blockly.utils.toolbox.BlockInfo;

    // Blockly callback to generate the blockly block presented to the user in the visual programming mode
    blocklyGenerator : (block : Blockly.Block) => void;

    // Callback to tell Blockly how to generate the text code version of the block
    codeGenerator : (block : Blockly.Block, generator : Blockly.CodeGenerator) => any;

    // Native JavaScript function that's executed if this binding is called
    nativeFn : Function;

    // Optional function that's called by CodeEvalService to set up the interpreter with any additional data it could need when executing `nativeFn`
    prepareInterpreter? : (interpreter : Interpreter, globalObject : Object) => void;

    // Whether this function is asynchronous or not
    async? : boolean;

    // Whether this is not a function but rather a constant
    isConstant? : boolean;
}

export type { CodeBinding };
