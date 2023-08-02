/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import * as blockly from "blockly";
import { ITheme } from "blockly/core/theme"

// Toolbox used by Blockly
const TEST_TOOLBOX : blockly.utils.toolbox.ToolboxDefinition = {
	kind: "categoryToolbox",
	contents: [
		{
			kind: "category",
			name: "Logic",
			colour: "#5C81A6",
			contents: [
				{
					kind: "block",
					type: "controls_if",
				},
				{
					kind: "block",
					type: "logic_compare",
				},
				{
					kind: "block",
					type: "logic_operation"
				},
				{
					kind: "block",
					type: "logic_negate"
				},
				{
					kind: "block",
					type: "logic_boolean"
				},
				{
					kind: "block",
					type: "controls_for"
				},
				{
					kind: "block",
					type: "controls_repeat",
				}
			],
		},
		{
			kind: "category",
			name: "Math",
			colour: "#5CA65C",
			contents: [
				{
					kind: "block",
					type: "math_round",
				},
				{
					kind: "block",
					type: "math_number",
				},
				{
					kind: "block",
					type: "math_arithmetic",
					fields: {
						OP: "ADD"
					},
					inputs: {
						A: {
							shadow: {
								type: "math_number",
								fields: {
									NUM: 1
								}
							}
						},
						B: {
							shadow: {
								type: "math_number",
								fields: {
									NUM: 1
								}
							}
						}
					}
				}
			],
		},
		{
			kind: "category",
			name: "Movement",
			colour: "#4287f5",
			custom: "MOVEMENT",
			hidden: "true"
		},
		{
			kind: "category",
			name: "Loops",
			colour: "#42f5aa",
			custom: "LOOPS",
			hidden: "true"
		},
		{
			kind: "category",
			name: "Constants",
			colour: "#f5429b",
			custom: "CONSTANTS",
			hidden: "true"
		},
		{
			kind: "category",
			name: "Utilities",
			colour: "#5CA699",
			custom: "UTIL",
			hidden: "true"
		},
		{
			kind: "sep"
		},
		{
			kind: "category",
			name: "Variables",
			colour: "#A55B80",
			custom: "VARIABLE",
			hidden: "true"
		},
		{
			kind: "category",
			name: "Functions",
			colour: "#995BA5",
			custom: "PROCEDURE",
			hidden: "true"
		}
	],
};

// Add OUR OWN categories here
const CODEQUEST_CATEGORIES : string[] = ["MOVEMENT", "LOOPS", "UTIL", "CONSTANTS"];

// Blockly workspace configuration
const WORKSPACE_CONFIG : blockly.BlocklyOptions = {
	grid: {
		spacing: 50, 
		length: 10, 
		snap: true,
        colour: "#F2F2F2"
	}, 
	scrollbars: true, 
	trashcan: true, 
	theme: "zelos", 
	renderer: "zelos",
    horizontalLayout: false,
	/*zoom: {
		wheel: true,
		pinch: true
	}*/
}

// Blockly dark theme
const BLOCKLY_THEME_DARK : ITheme = {
	name: "dark",
	base: blockly.Themes.Zelos,
	componentStyles: {
		workspaceBackgroundColour: "#121212",
		toolboxBackgroundColour: "#121212",
		toolboxForegroundColour: "#ddd",
		flyoutBackgroundColour: "#333",
		flyoutForegroundColour: "#aaa",
		scrollbarColour: "#ccc",
		scrollbarOpacity: 0.2
	}
}

export { WORKSPACE_CONFIG, TEST_TOOLBOX, BLOCKLY_THEME_DARK, CODEQUEST_CATEGORIES };
