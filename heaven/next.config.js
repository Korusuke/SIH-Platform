const withCSS = require('@zeit/next-css')
const withOptimizedImages = require('next-optimized-images');

module.exports = withCSS(withOptimizedImages({
  target: 'serverless',
}));
