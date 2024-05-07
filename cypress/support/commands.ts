Cypress.Commands.add('login', (username, password) => {
    //zadanie: chcemy sie pozbyc logowania przez ui
    //cy.get('[name=username]').type('admin')
    //cy.get('[name=password]').type('admin')
    //cy.get('.btn-primary').click()
    //1. request na logowanie
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signin', // baseUrl is prepend to URL
        body: {
            username: username,
            password: password
        },
    }).then((resp) => {
        //2. ustawiamy odpowiedz w localstorage
        localStorage.setItem('user', JSON.stringify(resp.body))
        //3. ustawiamy token z odpowiedzi w ciastku token
        cy.setCookie('token', resp.body.token)
    })
    cy.visit('http://localhost:8081')
})

Cypress.Commands.add('register', (user) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signup', // baseUrl is prepend to URL
        body: user
    })
}
)