/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import * as React from 'react';
import EditorLayout from '@/layouts/editor/editor';
import { redirect } from 'next/navigation';

// Root Page
export default function RootPage() {
	redirect("/chapter");
	return <></>;
}
