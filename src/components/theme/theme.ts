/*
	CodeQuest Frontend
	Written by Jonathan Verbeek - 2023
*/

'use client';

import { createTheme } from '@mui/material/styles';
import GoogleInterFont from '@/app/fonts/fonts';
import { orange } from "@mui/material/colors";

// Typescript module augmentation to allow custom colors in theme (https://mui.com/material-ui/customization/palette/#typescript) 
declare module "@mui/material/styles" {
	interface PaletteOptions {
		shaded?: PaletteOptions["primary"]
	}
}

// Default (light) theme
const lightTheme = createTheme({
	// Typography
	typography: {
		fontFamily: GoogleInterFont.style.fontFamily,
		body1: { fontFamily: GoogleInterFont.style.fontFamily },
		body2: { fontFamily: GoogleInterFont.style.fontFamily },
	},
	// Color palette
	palette: {
		primary: { 
			main: orange[500]
		},
		shaded: {
			light: "#F2F2F2",
			dark: "#222222",
			main: "#F2F2F2",
			contrastText: "rgba(0, 0, 0, 0.87)"
		},
		mode: "light"
	}
});

// Dark theme
const darkTheme = createTheme({
	// Typography
	typography: {
		fontFamily: GoogleInterFont.style.fontFamily,
		body1: { fontFamily: GoogleInterFont.style.fontFamily },
		body2: { fontFamily: GoogleInterFont.style.fontFamily },
	},
	// Color palette
	palette: {
		primary: { 
			main: orange[500]
		},
		shaded: {
			light: "#F2F2F2",
			dark: "#222222",
			main: "#F2F2F2",
			contrastText: "rgba(0, 0, 0, 0.87)"
		},
		mode: "dark"
	}
});

export { lightTheme, darkTheme };
