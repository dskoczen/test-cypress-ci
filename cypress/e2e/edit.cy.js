/// <reference types="cypress" />

import { getRandomUser } from "../generators/userGenerator"

let token;

describe('edit tests', () => {
    const user = getRandomUser()
    const newUser = getRandomUser()

    beforeEach(() => {
        //cy.login('admin', 'admin')
        cy.register(user)
        cy.login(user.username, user.password)
        cy.getCookie('token').then(cookie => token = cookie.value)
        //klikniecie edit na uzytkownika z testu
    })

    afterEach(() => {
        cy.request({
            method: 'DELETE',
            url: `http://localhost:4001/users/${user.username}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    })

    it('should correctly autofill data', () => {
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()

        cy.get('[name=firstName]').should('have.value', user.firstName)
        cy.get('[name=lastName]').should('have.value', user.lastName)
        cy.get('[name=email]').should('have.value', user.email)
        cy.get('[name=username]').should('have.value', user.username)
        cy.get('[name=roles]').should('have.value', user.roles.join(','))
    })

    it('should correctly edit an user', () => {
        // given
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).find('.edit').click()
        
        // when
        cy.get('[name=firstName]').clear().type(newUser.firstName)
        cy.get('[name=lastName]').clear().type(newUser.lastName)
        cy.get('[name=email]').clear().type(newUser.email)
        cy.get('.btn-primary').click()

        // then
        cy.get('.alert').should('have.text', 'Updating user successful')
        cy.get('li').contains(`${newUser.firstName} ${newUser.lastName}`).should('exist')
        cy.get('li').contains(`${user.firstName} ${user.lastName}`).should('not.exist')

        cy.request({
            method: 'GET',
            url: `http://localhost:4001/users/${user.username}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((resp) => {
            const body = resp.body
            expect(body.username).to.eq(user.username)
            expect(body.roles).to.deep.equal(user.roles)
            expect(body.firstName).to.eq(newUser.firstName)
            expect(body.lastName).to.eq(newUser.lastName)
            expect(body.email).to.eq(newUser.email)
        })
    })
})
