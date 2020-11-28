module.exports = {
  preset: "ts-jest",
  testMatch: ["**/*.(test|spec).(ts|tsx)"],
  globals: {
    // we must specify a custom tsconfig for tests because we need the typescript transform
    // to transform jsx into js rather than leaving it jsx such as the next build requires.  you
    // can see this setting in tsconfig.jest.json -> "jsx": "react"
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },
  moduleNameMapper: {
    "^.+\\.svg$": "<rootDir>/jest.assets.mock.js",
    "^.+\\.module\\.s?css$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["./jest.setup.tsx"],
  collectCoverageFrom: ["./pages/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "!./src/**/*.spec", "!./src/**/index.ts"],
};
