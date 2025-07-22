const { getDefaultConfig } = require("expo/metro-config")
const { withNativeWind } = require("nativewind/metro")

const config = getDefaultConfig(__dirname, {
  // Add this to ensure NativeWind works properly
  resolver: {
    sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'svg'],
  },
})

// SVG support
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};
config.resolver.assetExts = config.resolver.assetExts.filter((ext: string) => ext !== 'svg');
config.resolver.sourceExts = Array.from(new Set([...(config.resolver.sourceExts || []), 'svg']));

module.exports = withNativeWind(config, { input: "./global.css" })