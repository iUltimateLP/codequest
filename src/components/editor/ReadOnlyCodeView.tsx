/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

"use client";

import * as React from "react";
import "allotment/dist/style.css";
import MonacoWrapper from "./monaco/MonacoWrapper";

interface ReadOnlyCodeViewProps {
    code?: string
}

// Component for displaying a read-only code view through Moncao 
function ReadOnlyCodeView(props : ReadOnlyCodeViewProps) {
	return (
		<MonacoWrapper id="" language="javascript" theme="light" code={props.code} readOnly={true} />
	);
}

export { ReadOnlyCodeView };
