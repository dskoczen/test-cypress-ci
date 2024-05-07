const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8081',
    video: true,
    setupNodeEvents(on, config) {
      allureCypress(on);
    },
  },
});