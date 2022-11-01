export default {
  roots: ["<rootDir>/src/"],
  clearMocks: true, // nao tem no dele
  collectCoverage: true, // nao tem no dele
  coverageProvider: "v8", // nao tem no dele
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};
