export const loginPage = {
    attemptLogin: (username: string, password: string) => {
        cy.intercept('GET', '**/users', { fixture: 'users.json'})
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('.btn-primary').click()
    }
}