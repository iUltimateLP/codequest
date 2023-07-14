/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import * as React from "react";

export default interface InnerEditorProps {
	sizeX?: number,
	sizeY?: number,
	onCodeChanged?: (code : string) => void
}
