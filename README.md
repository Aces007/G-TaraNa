G! Tara Na! Chord Checker App

"Harmony Unleashed: Your Ultimate Guide to Guitar Chords!"


Installation

"The node modules are part of the gitignore rules when being pushed into the repository so the files are needed to be installed for use."

1. Clone the main branch of the repository using GitHub Desktop or Git. https://github.com/Aces007/G-TaraNa.git
2. Then, the node modules that are required to be installed is found at the assets/ folder.
3. Then, 'npm install' (to install the dependecies)
4. After installing the modules, 'npm install react-native-svg.'
5. Right after the 4th step, 'npm install --save-dev react-native-svg-transformer.'
6. The last to be installed, 'npm install @react-native/metro-config', is needed for the metro.config.js
7. Then in metro.config.js: 
    copy and paste this
        /**
        * Metro configuration for React Native
        * https://github.com/facebook/react-native
        *
        * @format
        */

        const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

        const defaultConfig = getDefaultConfig(__dirname);

        const {
        resolver: { sourceExts, assetExts },
        } = getDefaultConfig(__dirname);

        const config = {
        transformer: {
            getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
            }),
            babelTransformerPath: require.resolve('react-native-svg-transformer'),
        },
        resolver: {
            assetExts: assetExts.filter(ext => ext !== 'svg'),
            sourceExts: [...sourceExts, 'svg'],
        },
        };

        module.exports = mergeConfig(defaultConfig, config);

8. To start the development process you will use the "npx expo start -c" command to initiate the development environment.
9. You can manually input the address of the environment or scan the qr code using the app to sync the phone to the development environment.
10. With that, you can start coding.
11. To add, when creating changes for the project; create a individual branch with this format: month-day-name.
Use this to achieve that, git checkout -b "month-day-name" .
12. We'll do this to avoid any conflict and possess a version history. 