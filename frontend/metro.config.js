const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('cjs');
config.resolver.unstable_enablePackageExports = false;
config.resolver.platforms = ['web', 'native', 'ios', 'android'];
config.resolver.alias = {
  'react-native$': 'react-native-web',
};


module.exports = config;