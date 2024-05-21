/// <reference types="cypress" />

describe('Two-Step Task Application', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080'); // Adjust URL if necessary
    });
  
    it('should display initial stage correctly', () => {
      cy.get('#roundNumber').should('contain', '1');
      cy.get('#stage').should('contain', 'Stage 1: Choose between these two options');
      cy.get('#task img').should('have.length', 2);
    });
  
    it('should progress to stage 2 on selecting an option', () => {
      cy.get('#task img').first().click();
      cy.get('#stage').should('contain', 'Stage 2: Choose between these two options');
      cy.get('#task img').should('have.length', 2);
    });
  
    it('should update points and round correctly', () => {
      cy.get('#task img').first().click();
      cy.get('#task img').first().click(); // Move to next round
      cy.get('#roundNumber').should('contain', '2');
      cy.get('#pointCounter').invoke('text').then(parseFloat).should('be.gt', 0); // Points should be greater than 0
    });
  
    it('should complete task after total rounds', () => {
      for (let i = 0; i < 10; i++) {
        cy.get('#task img').first().click();
        cy.get('#task img').first().click();
      }
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Task completed! Thank you for participating.');
      });
    });
  });
  