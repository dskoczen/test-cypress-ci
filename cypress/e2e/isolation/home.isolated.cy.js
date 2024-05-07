/// <reference types="cypress" />

import { getFakeLoginResponse } from "../../generators/userGenerator"

describe('Home tests in isolation', () => {
    beforeEach(() => {
        // given
        const user = getFakeLoginResponse()
        cy.setCookie('token', user.token)
        localStorage.setItem('user', JSON.stringify(user))
        cy.intercept('GET', '**/users', { fixture: 'users.json'})
    })

    it('should display login page if we use fake credentials', () => {
        // when
        cy.visit('http://localhost:8081')

        // then
        cy.get('li').should('have.length.at.least', 1)
    })
  
  })
 
