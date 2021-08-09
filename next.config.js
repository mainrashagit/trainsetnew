module.exports = {
  reactStrictMode: true,

  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      })
    }
    config.module.rules.push({
      test: /\.ipynb$/,
      exclude: /node_modules/,
      use: ["ipynb?cellsOnly=true"],
    })
    return config
  },
  // images: {
  //   loader: 'imgix',
  //   path: 'paste url here',
  // },
  trailingSlash: true,

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}
