
/// <reference types="cypress" />

import { getFakeLoginResponse, getRandomUser } from "../../generators/userGenerator"

describe('login tests in isolation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        const fakeLoginResponse = getFakeLoginResponse()
        cy.intercept('POST', '**/users/signin', (req) => {
            req.reply({
              statusCode: 200,
              body: fakeLoginResponse
            })
          })

        cy.intercept('GET', '**/users', { fixture: 'users.json'})
        cy.get('[name=username]').type(fakeLoginResponse.username)
        cy.get('[name=password]').type('jdkfnjkdnjkdfn')
        cy.get('.btn-primary').click()

        cy.get('h1').should('contain.text', fakeLoginResponse.firstName)
    })

    it('should not successfully login', () => {
        const fakeLoginResponse = getFakeLoginResponse()
        const user = getRandomUser()
        const message ='bad'
        cy.intercept('POST', '**/users/signin', (req) => {
            req.reply({
              statusCode: 422,
              body: {
                "timestamp": "2024-05-06T15:45:32.855+00:00",
                "status": 422,
                "error": "Unprocessable Entity",
                "message": message,
                "path": "/users/signin"
            }})
          })

        cy.intercept('GET', '**/users', { fixture: 'error.json'})

        cy.get('[name=username]').type('wrongData')
        cy.get('[name=password]').type('jdkfnjkdnjkdfn')
        cy.get('.btn-primary').click()
          if (user.username !== 'wrongData') {
            cy.get('.alert-danger').should('have.text', message)
          }
    })
})
