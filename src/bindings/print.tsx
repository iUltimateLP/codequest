/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { CodeBinding, CodeEvalService } from "@/core/CodeEvalService";
import { Logger } from "@/core/Logging";
import { Service } from "@/core/Service";
import Blockly from "blockly";

// @ts-ignore Idk why this is not working...
import { Order } from "blockly/javascript";
import { enqueueSnackbar } from "notistack";

const binding : CodeBinding = {
    // Name of the binding
    name: "print",

    // Blockly block generator callback
    blocklyGenerator: function(block : Blockly.Block) {
        block.appendDummyInput()
            .appendField("Print");
        block.appendValueInput("TEXT")
            .setCheck(null);
        block.setInputsInline(true);
        block.setPreviousStatement(true, null);
        block.setNextStatement(true, null);
        block.setColour(230);
        block.setTooltip("");
        block.setHelpUrl("");
    },

    // Blockly code generator callback
    codeGenerator: function(block : Blockly.Block, generator : Blockly.CodeGenerator) : string {
        var value_string = generator.valueToCode(block, 'TEXT', Order.NONE);
        var code = `print(${value_string});\n`;
        return code;   
    },

    // Native JavaScript function to execute
    nativeFn: function(content : any) {
        Logger.info("print(): " + content.toString());

        // TODO: move out of this module
        enqueueSnackbar(content.toString(), {
            variant: "info",
            autoHideDuration: 2000
        });
    }
}

export default binding;
