/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import * as blockly from "blockly";
import { ITheme } from "blockly/core/theme"

// Toolbox used by Blockly
const TEST_TOOLBOX = {
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
			name: "Custom",
			colour: "#5CA699",
			contents: [
				{
					kind: "block",
					type: "print",
					inputs: {
						TEXT: {
							shadow: {
								type: "text",
								fields: {
									TEXT: "Hello World!"
								}
							}
						}
					}
				}
			],
		},
		{
			kind: "sep"
		},
		{
			kind: "category",
			name: "Variables",
			colour: "#A55B80",
			custom: "VARIABLE"
		},
		{
			kind: "category",
			name: "Functions",
			colour: "#995BA5",
			custom: "PROCEDURE"
		}
	],
};

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
		toolboxForegroundColour: "white",
		flyoutBackgroundColour: "#333",
		flyoutForegroundColour: "white",
		scrollbarColour: "#ccc",
		scrollbarOpacity: 0.2
	}
}

export { WORKSPACE_CONFIG, TEST_TOOLBOX, BLOCKLY_THEME_DARK };
