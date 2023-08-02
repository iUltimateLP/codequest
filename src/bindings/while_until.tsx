/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import Blockly from "blockly";

// @ts-ignore Idk why this is not working...
import { Order } from "blockly/javascript";
import { CodeBinding } from "./CodeBinding";
import { LocalizedString } from "@/core/LocalizationService";

const binding : CodeBinding = {
    // Name of the binding
    name: "while_until",

    // The comment to place above the generated code of this binding
    comment: function(block : Blockly.Block, generator : Blockly.CodeGenerator) : LocalizedString {
        return {
            en: `Repeats the enclosed code block as long as the condition is true`,
            de: `Wiederholt den eingeschlossenen Code-Block solange die Bedingung erfüllt ist`
        };
    },

    // Blockly toolbox category
    blocklyToolboxCategory: "LOOPS",

    // Blockly toolbox block definition
    blocklyToolboxDefinition: {
        kind: "block",
        type: "while_until"
    },

    // Blockly block generator callback
    blocklyGenerator: function(block : Blockly.Block) {
        block.appendDummyInput()
            .appendField("%{BKY_CQ_WHILE_A}");
        block.appendValueInput("CONDITION")
            .setCheck("Boolean");
        block.appendDummyInput()
            .appendField("%{BKY_CQ_WHILE_B}");
        block.appendStatementInput("DO")
            .setCheck(null);
        block.setInputsInline(true);
        block.setPreviousStatement(true, null);
        block.setNextStatement(true, null);
        block.setColour(155);
        block.setTooltip("");
        block.setHelpUrl("");
    },

    // Blockly code generator callback
    codeGenerator: function(block : Blockly.Block, generator : Blockly.CodeGenerator) : string {
        // Do while loop
        let argument0 = generator.valueToCode(block, 'CONDITION', Order.NONE) || 'false';
        let branch = generator.statementToCode(block, 'DO');
        branch = generator.addLoopTrap(branch, block);
        branch = branch.trim(); // Remove any trailing whitespaces
        if (branch.endsWith("  \n"))
            branch = branch.slice(0, branch.lastIndexOf("  \n"));
        return 'while (' + argument0 + ') \n{\n' + branch + '\n}\n';
    },

    // Native JavaScript function to execute
    nativeFn: function() {
        
    },

    // Whether this function is asynchronous or not
    async: false
}

export default binding;
