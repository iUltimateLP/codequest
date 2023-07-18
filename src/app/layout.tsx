/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

import * as React from 'react';
import { ThemeRegistry } from '@/components/theme/ThemeRegistry';
import { Box } from '@mui/material';
import { Metadata } from 'next';

// Page metadata
export const metadata : Metadata = {
	title: "CodeQuest",
	description: "CodeQuest",
	keywords: ["CodeQuest"],
	authors: [{name: "Jonathan Verbeek"}],
	openGraph: {
		title: "CodeQuest – Learn coding today!",
		description: "CodeQuest is a digital learning platform to teach the basics of programming.",
		siteName: "CodeQuest",
		type: "website"
	}
};

// Root Layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<ThemeRegistry>
				<body>
					{children}
				</body>
			</ThemeRegistry>
		</html>
	);
}
