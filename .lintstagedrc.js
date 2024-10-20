module.exports = {

    // Lint & Prettify TS and JS files
    '**/*.(ts|tsx|js|jsx)': filenames => [
      `npm run eslint ${filenames.join(' ')}`,
      `npm run prettier --write ${filenames.join(' ')}`
    ],
  
    // Prettify only Markdown and JSON files
    '**/*.(md|json)': filenames => `npm run prettier --write ${filenames.join(' ')}`
  };