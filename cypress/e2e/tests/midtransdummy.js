/// <reference types="cypress" />

describe('My first test', () => {
    beforeEach('Open application', () => {
        cy.visit('https://demo.midtrans.com/')
        cy.reload()
    })

    it('Test GoPay Payment Method', {defaultCommandTimeout: 20000},() => {
        cy.wait(1000)
        cy.get('[class="btn buy"]').click()

        cy.get('[class="cart-content buying"]').should('be.visible')
        // cy.get('[class="cart-checkout"]').click({force: true, waitForAnimations: false, animationDistanceThreshold: 20})
        cy.get('[class="cart-checkout"]').click()

        cy.get('[id="snap-midtrans"]').then($element=> {
            const $body = $element.contents().find('body')
            
            // Gopay
            let stripe = cy.wrap($body)
            stripe.find('[alt="GoPay"]').click()

            // Click button "Back to merchant"
            stripe = cy.wrap($body)
            stripe.find('[class="btn full primary"]').click()
        })
        
    })

    it('Test BCA Payment Method', {defaultCommandTimeout: 20000},() => {
        cy.wait(1000)
        cy.get('[class="btn buy"]').click()

        cy.get('[class="cart-content buying"]').should('be.visible')
        // cy.get('[class="cart-checkout"]').click({force: true, waitForAnimations: false, animationDistanceThreshold: 20})
        cy.get('[class="cart-checkout"]').click()

        cy.get('[id="snap-midtrans"]').then($element=> {
            const $body = $element.contents().find('body')
            let stripe = cy.wrap($body)

            // Gopay
            stripe.find('[alt="BCA"]').click()
            stripe = cy.wrap($body)
            stripe.find('[class="bank-list-layout"]').then(paymentList => {
                cy.get(paymentList).find('[class="bank-list"]').eq(0).then(bca => {
                    cy.get(bca).click()
                    cy.wait(2000)

                    // Click button "Back to merchant"
                    stripe = cy.wrap($body)
                    stripe.find('[class="btn full primary"]').click()
                })
            })
        })  
    })

    it('Test Mandiri Payment Method', {defaultCommandTimeout: 20000},() => {
        cy.wait(1000)
        cy.get('[class="btn buy"]').click()

        cy.get('[class="cart-content buying"]').should('be.visible')
        // cy.get('[class="cart-checkout"]').click({force: true, waitForAnimations: false, animationDistanceThreshold: 20})
        cy.get('[class="cart-checkout"]').click()

        cy.get('[id="snap-midtrans"]').then($element=> {
            const $body = $element.contents().find('body')
            let stripe = cy.wrap($body)

            // Gopay
            stripe.find('[alt="BCA"]').click()
            stripe = cy.wrap($body)
            stripe.find('[class="bank-list-layout"]').then(paymentList => {
                cy.get(paymentList).find('[class="bank-list"]').eq(1).then(mandiri => {
                    cy.get(mandiri).click()
                    cy.wait(2000)

                    // Back to merchant
                    stripe = cy.wrap($body)
                    stripe.find('[class="pay-instruction-text"]').click()
                    // stripe.find('[class="btn full primary"]').click()
                    cy.wait(2000)

                    stripe = cy.wrap($body)
                    stripe.find('[class="content pay-instruction opened"]').then(instructionList => {
                        cy.get(instructionList).find('[class="collapsible instruction"]').eq(0).then(atm => {
                            cy.get(atm).find('[class="float-right"]').click()
                            cy.wait(2000)

                            // Click button "Back to merchant"
                            stripe = cy.wrap($body)
                            stripe.find('[class="btn full primary"]').click()
                        })
                    })
                })
            })
        })  
    })
})
