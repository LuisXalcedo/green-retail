import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
// next.config.mjs

const nextConfig = {
  experimental: {
    swcPlugins: [
      ["fluentui-next-appdir-directive", { paths: ["@griffel", "@fluentui"] }],
    ],
    // ppr: true,
  },
  reactStrictMode: false,
};

export default withNextIntl(nextConfig);
