/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import { CodeBinding, CodeEvalService } from "@/core/CodeEvalService";
import { LocalizedString } from "@/core/LocalizationService";
import { Service } from "@/core/Service";
import { UiService } from "@/core/UiService";
import { ViewportService } from "@/core/ViewportService";
import CityScene from "@/scenes/CityScene";
import Blockly from "blockly";

// @ts-ignore Idk why this is not working...
import { Order } from "blockly/javascript";
import { Direction } from "grid-engine";

const binding : CodeBinding = {
    // Name of the binding
    name: "walk",

    // Comment
    comment: function(block : Blockly.Block) : LocalizedString {
        return {
            en: "Moves the player a step in the direction it's facing",
            de: "Bewegt den Spieler einen Schritt in die Richtung, in die er schaut"
        };
    },

    // Blockly toolbox category
    blocklyToolboxCategory: "UTIL",

    // Blockly toolbox block definition
    blocklyToolboxDefinition: {
        kind: "block",
        type: "walk"
    },

    // Blockly block generator callback
    blocklyGenerator: function(block : Blockly.Block) {
        block.appendDummyInput()
            .appendField("Walk");
        block.setInputsInline(true);
        block.setPreviousStatement(true, null);
        block.setNextStatement(true, null);
        block.setColour(230);
        block.setTooltip("");
        block.setHelpUrl("");
    },

    // Blockly code generator callback
    codeGenerator: function(block : Blockly.Block, generator : Blockly.CodeGenerator) : string {
        return "walk();\n";
    },

    // Native JavaScript function to execute
    nativeFn: function(callback : any) {
        // Get the city scene
        var scene : CityScene | null = Service.get(ViewportService).getScene<CityScene>();
        if (!scene)
            return;

        // Move
        scene.movePlayer()
        .then(() => {
            // Set a small timeout before the next walk step
            setTimeout(() => {
                Service.get(CodeEvalService).resumeAsyncExecution(() => callback());
            }, 500);
        })
        .catch(() => {
            Service.get(UiService).showNotification("Can't move!", { variant: "error", playSound: true, sound: "error" });
            Service.get(CodeEvalService).stopExecution();
        })
    },
    
    async: true
}

export default binding;
