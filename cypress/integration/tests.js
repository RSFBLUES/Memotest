const URL = '127.0.0.1:5500/index.html';

context('Memotest', () => {

    before(() => {
        cy.visit(URL);
      });
    
    describe('Verifica cantidad de rectangulos antes de jugar', () => {
        const cantidadDeRectangulosGrises = 12;
        const cantidadDeRectangulosOculto = 12;

        it("Cantidad de rectangulos grises", () => {
            cy.get('#tablero').find('.gris').should('have.length', cantidadDeRectangulosGrises);
        });

        it("Cantidad de rectangulos ocultos", () => {
            cy.get('#tablero').find('.oculto').should('have.length', cantidadDeRectangulosOculto);
        });
    });

    

});

