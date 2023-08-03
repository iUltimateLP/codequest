/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	modularizeImports: {
		'@mui/icons-material': {
			transform: '@mui/icons-material/{{member}}',
		},
	},
	webpack: (config) => {
		config.externals = [...config.externals, "canvas", "jsdom"];
		return config;
	},
	typescript: {
		ignoreBuildErrors: true
	}
};

module.exports = nextConfig;
