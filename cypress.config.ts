import { defineConfig } from 'cypress';

export default defineConfig({
    component: {
        devServer: {
            framework: 'angular',
            bundler: 'webpack',
        },
        specPattern: '**/*.cy.ts',
    },

    e2e: {
        setupNodeEvents(_on, _config) {
            // implement node event listeners here
        },

        baseUrl: 'http://localhost:4200',
    },
});
