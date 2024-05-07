import { User } from "../types/user";

// cypress/support/index.ts
declare global {
    namespace Cypress {
        interface Chainable {
            login(username: string, password: string): void;
            register(user: User): void;
        }
    }
}