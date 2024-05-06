/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	experimental: {
		missingSuspenseWithCSRBailout: false,
	},
	images: {
		domains: ["**.stripedemos.com"],
	},
	async headers() {
		return [
			{
				source: "/.well-known/apple-app-site-association",
				headers: [
					{
						key: "Content-Type",
						value: "application/json",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
