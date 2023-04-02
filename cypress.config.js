const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  viewportHeight: 720,
  viewportWidth: 1280,
  // defaultCommandTimeout: 4000, // default 4000
  // requestTimeout: 15000,
  // responseTimeout: 30000,
  // pageLoadTimeout: 60000,
  e2e: {
    baseUrl: 'https://sg-order.flash-coffee.xyz/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    excludeSpecPattern: [
      // '**/1-getting-started/*', 
      // '**/2-advanced-examples/*'
    ],

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // testIsolation: false,
  },
});

