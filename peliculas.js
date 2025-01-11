class Pelicula {
  #presupuesto = 0;
  genero = [];

  static GENEROS = ["Action","Comedy","Adventure","Animation","Children","Sci-Fi","Drama","Documentary","Thriller","Romance","Fantasy","Crime","Horror","War","Musical","Mystery","Film-Noir","Western"];

  constructor(id, titulo, genero = [], presupuesto = 0, director = "") {
    this.id = id;
    this.titulo = titulo;
    this.presupuesto = presupuesto;
    this.director = director;
    genero.forEach(g => this.addGenero(g));
  }

  toString() {
    return `${this.titulo} (${this.director}) ${this.presupuesto}€ [${this.genero.join(", ")}]`;
  }

  get presupuesto() {
    return this.#presupuesto;
  }

  set presupuesto(value) {
    if (value >= 0) {
      this.#presupuesto = value;
    }
  }

  addGenero(genero) {
    if (!this.genero.includes(genero) && Pelicula.GENEROS.includes(genero)) {
      this.genero.push(genero);
    }
  }

  removeGenero(genero) {
    this.genero = this.genero.filter(g => g !== genero);
  }
}

function pruebaPelicula() {
  console.log("\nProbando clase Pelicula con todos los datos");
  const pelicula = new Pelicula(1, "Titanic", ["Romance"], 200000000, "James Cameron");
  console.log(pelicula.toString());

  console.log("\nProbando clase Pelicula sin todos los datos");
  const pelicula2 = new Pelicula(2, "Origen");
  pelicula2.presupuesto = 160000000;
  pelicula2.director = "Christopher Nolan";

  console.log(pelicula2.toString());

  console.log("\nProbando cambiar el presupuesto de la película Titanic");
  pelicula.presupuesto = 250000000;
  console.log(pelicula.toString());

  console.log("\nProbando poner un presupuesto negativo en la película Titanic");
  pelicula.presupuesto = -100000000;
  console.log(pelicula.toString());

  console.log("\nProbando añadir un género que está en la lista en la película Origen");
  pelicula2.addGenero("Thriller");
  console.log(pelicula2.toString());

  console.log("\nProbando añadir varios géneros más que están en la lista en la película Titanic");
  pelicula.addGenero("Drama");
  pelicula.addGenero("Action");
  console.log(pelicula.toString());

  console.log("\nProbando añadir un género que no está en la lista en la película Titanic");
  pelicula.addGenero("Javascript");
  console.log(pelicula.toString());

  console.log("\nProbando añadir un género repetido en la película Titanic");
  pelicula.addGenero("Action");
  console.log(pelicula.toString());

  console.log("\nProbando eliminar un género de la película Titanic");
  pelicula.removeGenero("Action");
  console.log(pelicula.toString());

}

const peliculas = [];
PELICULAS.forEach(p => peliculas.push(new Pelicula(p.id, p.titulo, p.genero.split("|"), p.presupuesto, p.director.nombre)));

const listaDOM = document.querySelector("ol");
function mostrarPeliculas(listado) {
  listaDOM.innerHTML = "";
  listado.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p.toString();
    listaDOM.appendChild(li);
  });
}

function mostrarTodas() {
  mostrarPeliculas(peliculas);
}

function mostrarEnOrdenTitulo() {
  const listado = [...peliculas].sort((a, b) => a.titulo.localeCompare(b.titulo));
  mostrarPeliculas(listado);
}

function mostrarOrdenDescendientePresupuesto() {
  const listado = [...peliculas].sort((a, b) => b.presupuesto - a.presupuesto);
  mostrarPeliculas(listado);
}

function mostrarSoloGenero(genero) {
  const listado = peliculas.filter(p => p.genero.includes(genero));
  mostrarPeliculas(listado);
}