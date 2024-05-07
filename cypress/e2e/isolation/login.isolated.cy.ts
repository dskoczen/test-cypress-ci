
/// <reference types="cypress" />

import { alerts } from "../../components/alerts"
import { getFakeLoginResponse, getRandomUser } from "../../generators/userGenerator"
import { getUsersMocks } from "../../mocks/getUsers"
import { loginMocks } from "../../mocks/postSignIn"
import { loginPage } from "../../pages/loginPage"

describe('login tests in isolation', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('should successfully login', () => {
    // given
    const fakeLoginResponse = getFakeLoginResponse()
    loginMocks.mockSuccess(fakeLoginResponse)
    getUsersMocks.mockUsers()

    // when
    loginPage.attemptLogin(fakeLoginResponse.username, 'passwordsome')

    // then
    cy.get('h1').should('contain.text', fakeLoginResponse.firstName)
  })

  it('should not successfully login', () => {
    // given
    //const user = getRandomUser()
    const message = 'bad'
    loginMocks.mockFailure(message)

    // when
    loginPage.attemptLogin('wrong', 'wrong')

    // then
    alerts.verifyFailure(message)
    })
})
