var babelPresetReact = require('@babel/preset-react');
var addReactDisplayName = require('babel-plugin-add-react-displayname');
var reactRemovePropTypes = require('babel-plugin-transform-react-remove-prop-types');
var reactTransformConstant = require('@babel/plugin-transform-react-constant-elements');
var reactTransformInline = require('@babel/plugin-transform-react-inline-elements');
var babelPresetKytCore = require('babel-preset-kyt-core');

module.exports = function getPresetReact(context, opts) {
  opts = opts || {};
  return {
    plugins: [addReactDisplayName],
    env: {
      development: {
        presets: [
          [babelPresetReact, { development: true }],
          // pass options through to core preset
          [babelPresetKytCore, opts || {}],
        ],
      },
      test: {
        presets: [
          babelPresetReact,
          // pass options through to core preset
          [babelPresetKytCore, opts || {}],
        ],
      },
      production: {
        presets: [
          babelPresetReact,
          // pass options through to core preset
          [babelPresetKytCore, opts || {}],
        ],
        plugins: [reactRemovePropTypes, reactTransformConstant, reactTransformInline],
      },
    },
  };
};
