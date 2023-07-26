/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { BlocklyWorkspace } from "react-blockly";
import Blockly from "blockly";
import "./blockly-baseline.css";
import { WORKSPACE_CONFIG, TEST_TOOLBOX, BLOCKLY_THEME_DARK } from "./BlocklyConfig";
import { Service } from "@/core/Service";
import { VisualProgrammingService } from "@/core/VisualProgrammingService";
import { Theme, useTheme } from '@mui/material/styles';
import { LocalizationService, useLocale } from "@/core/LocalizationService";
import { BLOCKLY_LANG_DE } from "@/i18n/de";
import { BLOCKLY_LANG_EN } from "@/i18n/en";

interface BlocklyWrapperProps {
	sizeX? : number,
	sizeY? : number,
	onCodeChanged?: (workspace : Blockly.Workspace, xml : string) => void
}

// Wrapper that wraps Blockly into a React component and provides low-level functionality
export default function BlocklyWrapper(props : BlocklyWrapperProps) {
	// XML is saved in a state
	const [xml, setXml] = useState<string>();
	const [workspace, setWorkspace] = useState<Blockly.WorkspaceSvg>();
	const [locale] = useLocale();

    // Get the app's theme so we can style Blockly accordingly
    const theme : Theme = useTheme();
	const [preferedTheme, setPreferedTheme] = useState("light");
	var darkTheme : Blockly.Theme | null = null;

	// This function resizes the blockly window to a new size
	useEffect(() => {
		// Make sure the workspace and it's injection div is already valid
		var div : HTMLElement = workspace?.getInjectionDiv() as HTMLElement;
		if (div == undefined)
			return;

		div.style.left = "0px";
		div.style.top = "0px";

		if (props.sizeX)
			div.style.width = props.sizeX + "px";
		
		if (props.sizeY)
			div.style.height = props.sizeY + "px";

		Blockly.svgResize(workspace!);
	}, [props.sizeX, props.sizeY]);

	// Effect hook for when the theme changes
	useEffect(() => {
		// Apply the theme
		setPreferedTheme(theme.palette.mode);
	}, [theme]);

	useEffect(() => {
		// Create the dark theme if it does not exist yet
		if (!darkTheme) {
			darkTheme = Blockly.Theme.defineTheme("dark", BLOCKLY_THEME_DARK);
		}
		
		// Set Blockly theme
		workspace?.setTheme(preferedTheme === "light" ? Blockly.Themes.Zelos : darkTheme!);
		
		// Hack to change the grid color by querying and changing the SVGs
		changeGridColorHACK();

		// Inject or remove dark stylesheets
		if (preferedTheme === "dark") {
			injectDarkCSS();
		} else {
			removeDarkCSS();
		}
	}, [preferedTheme]);

	// Locale hook
	useEffect(() => {
		// Update Blockly locale
		Blockly.setLocale(locale == "de" ? BLOCKLY_LANG_DE : BLOCKLY_LANG_EN);

		// Trigger a recompile of code which contains localized comments
		if (props.onCodeChanged && xml)
			props.onCodeChanged(workspace as Blockly.Workspace, xml);
	}, [locale]);

	// Called when the workspace (or it's content changed)
	function onWorkspaceChange(newWorkspace : Blockly.WorkspaceSvg) {
		// Ignore if the workspace did not really change
		if (workspace == newWorkspace) {
			return;
		}

		setWorkspace(newWorkspace);
		Service.get(VisualProgrammingService).setBlocklyWorspace(newWorkspace);
	}

	// Called when the XML changes
	function onXmlChange(xml : string) {
		setXml(xml);

		// Call the event, if given
		if (props.onCodeChanged)
			props.onCodeChanged(workspace as Blockly.Workspace, xml);
	}

	// This is a hack to change the grid color as Blockly does not support that
	function changeGridColorHACK() {
		// Find the line elements belonging to a #blocklyGridPatternXXX element
		var foundElements = document.querySelectorAll(`[id^="blocklyGridPattern"]>line`);

		// Set the stroke of the SVG line elements
		foundElements.forEach((element) => {
			element.setAttribute("stroke", preferedTheme === "light" ? "#eee" : "#222");
		});
	}

	// Injects the dark mode stylesheet into the HTML
	function injectDarkCSS() {
		if (!document.getElementById(`blockly_dark`)) {
			var style = document.createElement("link");
			style.setAttribute("id", `blockly_dark`);
			style.setAttribute("rel", "stylesheet");
			style.setAttribute("href", `/assets/css/blockly-dark-overrides.css`);
			document.head.appendChild(style);
		}
	}

	// Removes the dark mode stylesheet
	function removeDarkCSS() {
		const foundChild = document.getElementById(`blockly_dark`);
		if (foundChild) {
			foundChild.remove();
		}
	}

	return (
		// @ts-ignore
		<BlocklyWorkspace 
			className={"cq-blockly-workspace"}
			id="cq-blockly-workspace"
			toolboxConfiguration={TEST_TOOLBOX}
			initialXml={xml}
			onXmlChange={onXmlChange}
			workspaceConfiguration={{
				...WORKSPACE_CONFIG, 
				theme: theme.palette.mode == "dark" ? "dark" : WORKSPACE_CONFIG.theme,
				grid: {...WORKSPACE_CONFIG.grid/*, colour: preferedTheme == "dark" ? "#555" : WORKSPACE_CONFIG.grid!.colour*/} // TODO: crosses don't react on theme change
			}}
			onWorkspaceChange={onWorkspaceChange}
		>

		</BlocklyWorkspace>
	)
}
