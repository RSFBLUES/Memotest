const URL = '127.0.0.1:5500/index.html';

context('Memotest', () => {

    before(() => {
        cy.visit(URL);
    });
    
    describe('Verifica la cantidad de rectangulos antes de jugar', () => {
        const cantidadDeRectangulosGrises = 12;
        const cantidadDeRectangulosOculto = 12;

        it("Cantidad de rectangulos grises", () => {
            cy.get('#tablero').find('.gris').should('have.length', cantidadDeRectangulosGrises);
        });

        it("Cantidad de rectangulos ocultos", () => {
            cy.get('#tablero').find('.oculto').should('have.length', cantidadDeRectangulosOculto);
        });
    });

    describe('Verifica la cantidad de rectangulos después de apretar el botón jugar', () => {
        const cantidadDeRectangulosGrises = 12;
        const cantidadDeRectangulosOculto = 12;
        
        before(() => {
            cy.get('#jugar').click();
        });
        
        
        it("Cantidad de rectangulos grises", () => {
            cy.get('#tablero').find('.gris').should('have.length', cantidadDeRectangulosGrises);
        });

        it("Cantidad de rectangulos ocultos", () => {
            cy.get('#tablero').find('.oculto').should('have.length', cantidadDeRectangulosOculto);
        });

    })

    describe('Se puede jugar bien', () => {
        const cantidadDeRectangulosGrises = 12;
        const cantidadDeRectangulosOculto = 12;
        
        it("Cantidad de rectangulos grises", () => {
            cy.get('#tablero').find('.gris').should('have.length', cantidadDeRectangulosGrises);
        });

        it("Cantidad de rectangulos ocultos", () => {
            cy.get('#tablero').find('.oculto').should('have.length', cantidadDeRectangulosOculto);
        });

        it("Resolver juego", () => {            
            hacerClickEnColor('azul');
            hacerClickEnColor('rojo');
            hacerClickEnColor('verde');
            hacerClickEnColor('violeta');
            hacerClickEnColor('amarillo');
            hacerClickEnColor('naranja');

            cy.get('#mensaje').contains(
             'Tú puntaje es 600, presiona el botón "jugar" para jugar de nuevo.');
        });

    });

    describe('Se puede abandonar', () => {
        const cantidadDeRectangulosGrises = 12;
        const cantidadDeRectangulosOculto = 12;

        before(() => {
            cy.get('#jugar').click();
        });

        it("Se acierta dos veces y se abandona", () =>{
    
            hacerClickEnColor('azul');
            hacerClickEnColor('rojo');
    
            cy.get('#abandonar').click();
            cy.get('#mensaje').contains(
                'Tú puntaje es 200, presiona el botón "jugar" para jugar de nuevo.');
        });

        it("No se acierta y se abandona", () => {
            cy.get('#jugar').click();

            hacerClickEnDistintosColores('azul', 'rojo');

            cy.get('#tablero').find('.oculto').should('have.length', cantidadDeRectangulosOculto);
            cy.get('#tablero').find('.gris').should('have.length', cantidadDeRectangulosGrises);
    
            cy.get('#abandonar').click();
            cy.get('#mensaje').contains(
                'Tú puntaje es 0, presiona el botón "jugar" para jugar de nuevo.');
        });
    });
    
});

function hacerClickEnDistintosColores(color1, color2){
    cy.get('#tablero').find('.'+ color1).then(rectangulo => {
        let rectanguloColor1 = rectangulo[0].id;
        let rectanguloGris1 = asociarRectanguloDeColorConGris(rectanguloColor1);

        cy.get('#'+ rectanguloGris1).click();
    });

    cy.get('#tablero').find('.'+ color2).then(rectangulo => {
        let rectanguloColor2 = rectangulo[1].id;
        let rectanguloGris2 = asociarRectanguloDeColorConGris(rectanguloColor2);

        cy.get('#'+ rectanguloGris2).click();
    });
};

function hacerClickEnColor(color){
    cy.get('#tablero').find('.'+ color).then(rectangulo => {
        let rectanguloColor1 = rectangulo[0].id;
        let rectanguloColor2 = rectangulo[1].id;
        let rectanguloGris1 = asociarRectanguloDeColorConGris(rectanguloColor1);
        let rectanguloGris2 = asociarRectanguloDeColorConGris(rectanguloColor2);

        cy.get('#'+ rectanguloGris1).click();
        cy.get('#'+ rectanguloGris2).click();
    });
};

function asociarRectanguloDeColorConGris(color){
    if(color === "0"){
        return "g0";
    }else if(color === "1"){
        return "g1";
    }else if(color === "2"){
        return "g2";
    }else if(color === "3"){
        return "g3";
    }else if(color === "4"){
        return "g4";
    }else if(color === "5"){
        return "g5";
    }else if(color === "6"){
        return "g6";
    }else if(color === "7"){
        return "g7";
    }else if(color === "8"){
        return "g8";
    }else if(color === "9"){
        return "g9";
    }else if(color === "10"){
        return "g10";
    }else if(color === "11"){
        return "g11";
    }
};

