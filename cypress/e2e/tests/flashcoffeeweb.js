/// <reference types="cypress" />

describe('My first test', () => {
    const G_PICKUP = 'PICK UP'
    const G_COUNTRY = 'Singapore'
    const G_SEARCH_EXISTS_STORE = 'changi'
    const G_SEARCH_NONEXISTS_STORE = 'xxx'

    before('Open application', () => {
        cy.visit('https://fcconsumer-web-sg.vercel.app')
    })

    it('Check click button "Place Pickup Order" is enable', () => {
        cy.contains('Place Pickup Order').should('be.visible').click()
        cy.get('[data-cy="storeList_panelStoreList"]').should('be.visible')        
    })

    it('Check how many number of stores is exists in the store list"', () => {
        cy.contains('Stores in').invoke('text').then( ($storesNumber) => {
            let text = $storesNumber
            let position = text.search(" ")
            let storeNumber = text.substring(0, position)
            cy.get('[data-cy="storeList_panelStoreListItem"]').should('have.length', storeNumber)
        })
    })

    it('Check the country url', () => {
        cy.get('div.m-3 > span:nth-child(2)').should('contain.text', G_COUNTRY)
    })

    it('Check order method is "pick up"', () => {
        cy.get('div.my-2').should('contain.text', G_PICKUP)
    })

    it('Check 3 stores is exists', () => {
        cy.contains('[data-cy="storeList_panelStoreListItem"]', 'Dev NUS').should('be.visible')
        cy.contains('[data-cy="storeList_panelStoreListItem"]', 'Dev Oxley Store').should('be.visible')
        cy.contains('[data-cy="storeList_panelStoreListItem"]', 'Dev Auto Store SG Open').should('be.visible')
    })

    it('Check if the search icon is able to use', () => {
        cy.get('[data-cy="storeList_btnSearchStore"]').click()
        cy.get('[data-cy="storeList_txtInputSearchStore"]').should('be.visible')
    })

    it('Check the search box for existing data', () => {
        cy.get('[data-cy="storeList_txtInputSearchStore"]').type(G_SEARCH_EXISTS_STORE)
        cy.wait(200)

        cy.contains('Stores in').invoke('text').then( ($storesNumber) => {
            let text = $storesNumber
            let position = text.search(" ")
            let storeNumber = text.substring(0, position)
            cy.get('[data-cy="storeList_panelStoreListItem"]').should('have.length', storeNumber)
        })
    })

    it('Check the search box for non existing data', () => {
        cy.get('[data-cy="storeList_txtInputSearchStore"]').clear()
        cy.get('[data-cy="storeList_txtInputSearchStore"]').type(G_SEARCH_NONEXISTS_STORE)
        cy.wait(100)

        cy.get('div.max-w-xs').should('contain.text', "Sorry, we can’t find a match for ‘"+G_SEARCH_NONEXISTS_STORE+"’")
        cy.get('div.max-w-\\[280px\\]').should('contain.text', 'Try searching for something else instead or view all stores.')
        cy.get('div.pt-5.w-\\[150px\\]').should('contain.text', 'View All Stores')
    })

    it('Check if the button "View All Store" is working', () => {
        cy.get('div.pt-5.w-\\[150px\\]').click()

        cy.contains('Stores in').invoke('text').then( ($storesNumber) => {
            let text = $storesNumber
            let position = text.search(" ")
            let storeNumber = text.substring(0, position)
            cy.get('[data-cy="storeList_panelStoreListItem"]').should('have.length', storeNumber)
        })
    })
})