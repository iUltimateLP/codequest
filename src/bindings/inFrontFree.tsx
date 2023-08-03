/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import Blockly from "blockly";

// @ts-ignore Idk why this is not working...
import { Order } from "blockly/javascript";
import { CodeBinding } from "./CodeBinding";
import { Service } from "@/core/Service";
import { ViewportService } from "@/core/ViewportService";
import CodeQuestScene from "@/scenes/CodeQuestScene";
import { LocalizedString } from "@/core/LocalizationService";

const binding : CodeBinding = {
    // Name of the binding
    name: "infrontfree",

    // The comment to place above the generated code of this binding
    comment: undefined,

    // Blockly toolbox category
    blocklyToolboxCategory: "LOGIC",

    // Blockly toolbox block definition
    blocklyToolboxDefinition: {
        kind: "block",
        type: "infrontfree"
    },

    // Blockly block generator callback
    blocklyGenerator: function(block : Blockly.Block) {
        block.appendDummyInput()
            .appendField("%{BKY_CQ_IN_FRONT_FREE}");
        block.setOutput(true, "Boolean");
        block.setColour(330);
        block.setTooltip("");
        block.setHelpUrl("");
    },

    // Blockly code generator callback
    codeGenerator: function(block : Blockly.Block, generator : Blockly.CodeGenerator) : string {
        return "infrontfree()";
    },

    // Native JavaScript function to execute
    nativeFn: function() {
        const result = Service.get(ViewportService).getScene<CodeQuestScene>()?.isFrontFree();
        return result;
    },

    // Whether this function is asynchronous or not
    async: false,

    isConstant: true
}

export default binding;
