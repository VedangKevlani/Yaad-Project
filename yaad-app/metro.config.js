const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  
  return {
    transformer: {
      assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    },
    resolver: {
      assetExts: [...assetExts, 'bin', 'db', 'mp3', 'cjs'],
      sourceExts: [...sourceExts, 'jsx', 'js', 'ts', 'tsx'],
    },
  };
})();
