const { withAppBuildGradle, createRunOncePlugin } = require('expo/config-plugins');

const SPLITS_MARKER = 'lugatiAbiSplits';

const ABI_SPLITS_BLOCK = `
    // lugatiAbiSplits — per-CPU APKs instead of one universal APK
    splits {
        abi {
            reset()
            enable true
            universalApk false
            include "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
        }
    }
`;

function withAndroidAbiSplits(config) {
  return withAppBuildGradle(config, (gradleConfig) => {
    if (gradleConfig.modResults.language !== 'groovy') {
      return gradleConfig;
    }

    let contents = gradleConfig.modResults.contents;
    if (contents.includes(SPLITS_MARKER)) {
      return gradleConfig;
    }

    if (!contents.includes('signingConfigs {')) {
      throw new Error(
        'withAndroidAbiSplits: could not find signingConfigs block in android/app/build.gradle',
      );
    }

    contents = contents.replace(/(\n    signingConfigs \{)/, `${ABI_SPLITS_BLOCK}$1`);
    gradleConfig.modResults.contents = contents;
    return gradleConfig;
  });
}

module.exports = createRunOncePlugin(withAndroidAbiSplits, 'withAndroidAbiSplits', '1.0.0');
