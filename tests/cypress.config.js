const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000',
  },
  env: {
    apiUrl: 'https://petstore.swagger.io/v2',
    //apiUrl: "https://8ca46caf-f1d0-4faa-a1c2-7036fa9f044f.mock.pstmn.io",
  },
  viewportWidth: 1440,
  viewportHeight: 900,
});
