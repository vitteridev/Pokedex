/// <reference types="cypress" />

context("pokedex", () => {
  before(() => {
    cy.visit("/");
  });

  describe("usa la pokedex", () => {
    const NUMERO_ITEMS_PAGINADOR = 9;
    const NUMERO_BOTONES = 2;

    it("se asegura que carga correctamente", () => {
      cy.get("h1").contains("Pokedex");
      cy.get(".poke-contenedor").should("not.be.visible");
      cy.get(".paginacion")
        .find(".lista-pokemon")
        .should("not.deep.equal", "pokemon")
        .should("have.length", NUMERO_ITEMS_PAGINADOR);
      cy.get(".botones").find(".btn").should("have.length", NUMERO_BOTONES);
    });

    describe("busca un pokemon", () => {
      const NUMERO_ATRIBUTOS = 6;

      it("se asegura que la pokedex obtenga la información del pokemon seleccionado", () => {
        cy.wait(500);
        cy.get(".lista-pokemon").eq(0).click();
        cy.wait(500);
        cy.get(".poke-contenedor").should("be.visible");
        cy.get(".id").contains("#001");
        cy.get(".nombre").contains("bulbasaur");
        cy.get(".poke-imagen").should(
          "have.attr",
          "src",
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png"
        );
        cy.get(".poke-info")
          .find(".poke-atributos")
          .should("have.length", NUMERO_ATRIBUTOS);
      });
    });

    describe("prueba la paginación", () => {
      let listaPokemonesPagina1 = [];
      let listaPokemonesPagina2 = [];
      let listaPokemonesPagina3 = [];

      it("se asegura que la paginación funcione correctamente", () => {
        cy.get(".lista-pokemon").then((pokemones) => {
          pokemones.each(function (i, pokemon) {
            listaPokemonesPagina1.push(pokemon.id);
          });
        });

        cy.get(".siguiente").click();
        cy.wait(1000);

        cy.get(".lista-pokemon").then((pokemones) => {
          pokemones.each(function (i, pokemon) {
            listaPokemonesPagina2.push(pokemon.id);
          });
          cy.wrap(listaPokemonesPagina1).should(
            "not.deep.equal",
            listaPokemonesPagina2
          );
        });

        cy.get(".anterior").click();
        cy.wait(1000);

        cy.get(".lista-pokemon").then((pokemones) => {
          pokemones.each(function (i, pokemon) {
            listaPokemonesPagina3.push(pokemon.id);
          });
          cy.wrap(listaPokemonesPagina1).should(
            "deep.equal",
            listaPokemonesPagina3
          );
        });
      });
    });
  });
});
