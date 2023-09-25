const nextJS = require("next/jest")

const createJestConfig = nextJS({
  dir: "./",
});

/**  @type {import("jest").Config} */
const config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  preset: "ts-jest",
};

module.exports = createJestConfig(config)
