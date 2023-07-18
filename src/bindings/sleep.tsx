/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { CodeBinding, CodeEvalService } from "@/core/CodeEvalService";
import { Service } from "@/core/Service";
import Blockly from "blockly";

// @ts-ignore Idk why this is not working...
import { Order } from "blockly/javascript";

const binding : CodeBinding = {
    // Name of the binding
    name: "sleep",

    // Blockly block generator callback
    blocklyGenerator: function(block : Blockly.Block) {
        block.appendDummyInput()
            .appendField("Sleep");
        block.appendValueInput("DURATION")
            .setCheck("Number");
        block.appendDummyInput()
            .appendField("seconds")
        block.setInputsInline(true);
        block.setPreviousStatement(true, null);
        block.setNextStatement(true, null);
        block.setColour(230);
        block.setTooltip("");
        block.setHelpUrl("");
    },

    // Blockly code generator callback
    codeGenerator: function(block : Blockly.Block, generator : Blockly.CodeGenerator) : string {
        var value = generator.valueToCode(block, 'DURATION', Order.NONE);
        return `sleep(${value});\n`;
    },

    // Native JavaScript function to execute
    nativeFn: function(duration : number, callback : any) {
        // Set a standard JS timeout
        setTimeout(() => {
            Service.get(CodeEvalService).resumeAsyncExecution(() => callback(duration));
        }, duration * 1000);
    },

    async: true
}

export default binding;
