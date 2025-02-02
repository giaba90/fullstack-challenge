module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest", // Assicurati che ts-jest sia usato per i file TS
        "^.+\\.(js)$": "babel-jest",   // Usa babel-jest per i file JS se necessario
    },
    moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],  // Assicurati che il percorso sia corretto

};
