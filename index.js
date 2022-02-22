const OFFSET = 0;
const LIMITE = 9;
const API = `https://pokeapi.co/api/v2/pokemon/?offset=${OFFSET}&limit=${LIMITE}`;
const COLORES = [
  "#15a733",
  "#f54e4e",
  "#1a97ed",
  "#2ecea7",
  "#c1ad29",
  "#ca39c3",
];

const $botonera = document.querySelector(".lista-pokemones");
const $btnSiguiente = document.querySelector(".siguiente");
const $btnAnterior = document.querySelector(".anterior");

const $contenedorPokemon = document.querySelector(".poke-contenedor");
const $idPokemon = document.querySelector(".id");
const $nombrePokemon = document.querySelector(".nombre");
const $imagenPokemon = document.querySelector(".poke-imagen");
const $tipoPokemon = document.querySelector(".tipo");
const $alturaPokemon = document.querySelector(".altura");
const $pesoPokemon = document.querySelector(".peso");
const $vidaPokemon = document.querySelector(".vida");
const $ataquePokemon = document.querySelector(".ataque");
const $defensaPokemon = document.querySelector(".defensa");

let paginaAnterior = null;
let paginaSiguiente = null;

function manejarEventos($botonera) {
  $botonera.onclick = function (e) {
    const $elemento = e.target;

    if ($elemento.id) {
      const id = Number($elemento.id);
      obtenerPokemon(id);
    }
  };
}

function obtenerPokemones(url) {
  try {
    fetch(url)
      .then((respuesta) => respuesta.json())
      .then((listaPokemones) => {
        paginaSiguiente = listaPokemones.next;
        paginaAnterior = listaPokemones.previous;
        pintarListaDePokemones(listaPokemones);
      });
  } catch (error) {
    alert("ha ocurrido un error", error);
  }
}

function pintarListaDePokemones(listaPokemones) {
  const pokemones = listaPokemones.results;
  const $listaPokemones = document.querySelectorAll(".lista-pokemon");
  pokemones.forEach((pokemon, i) => {
    const urlLista = pokemon.url.split("/");
    const idPokemon = urlLista[urlLista.length - 2];
    $listaPokemones[i].textContent = pokemon.name;
    $listaPokemones[i].id = idPokemon;
  });
}

function obtenerPokemon(id) {
  try {
    $contenedorPokemon.classList.add("oculto");
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((respuesta) => respuesta.json())
      .then((pokemon) => {
        pintarPokemon(pokemon);
      });
  } catch (error) {
    alert("ha ocurrido un error", error);
  }
}

function pintarPokemon(pokemon) {
  pintarColoresAtributos();
  $idPokemon.textContent = "#" + pokemon.id.toString().padStart(3, "0");
  $nombrePokemon.textContent = pokemon.name;
  $imagenPokemon.src = pokemon.sprites["front_shiny"];
  $imagenPokemon.alt = `foto frontal de ${pokemon.name}`;
  $tipoPokemon.textContent = `type: ${pokemon.types[0].type.name}`;
  $alturaPokemon.textContent = `height: ${pokemon.height}`;
  $pesoPokemon.textContent = `weight: ${pokemon.weight}`;
  $vidaPokemon.textContent = `hp: ${pokemon.stats[0]["base_stat"]}`;
  $ataquePokemon.textContent = `attack: ${pokemon.stats[1]["base_stat"]}`;
  $defensaPokemon.textContent = `defense: ${pokemon.stats[2]["base_stat"]}`;
  $contenedorPokemon.classList.remove("oculto");
}

function traerPaginaSiguiente() {
  if (paginaSiguiente) {
    obtenerPokemones(paginaSiguiente);
  }
}

function traerPaginaAnterior() {
  if (paginaAnterior) {
    obtenerPokemones(paginaAnterior);
  }
}

function desordenarLista(lista) {
  return lista.sort(() => Math.random() - 0.5);
}

function pintarColoresAtributos() {
  const $atributos = document.querySelectorAll(".poke-atributos");
  const coloresDesordenados = desordenarLista(COLORES);
  $atributos.forEach(($atributo, i) => {
    $atributo.style.borderColor = `${coloresDesordenados[i]}`;
    $atributo.style.color = `${coloresDesordenados[i]}`;
  });
}

function main() {
  obtenerPokemones(API);
  manejarEventos($botonera);
  $btnSiguiente.onclick = traerPaginaSiguiente;
  $btnAnterior.onclick = traerPaginaAnterior;
}

main();
