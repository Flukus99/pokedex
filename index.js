let numero_pokemons=50;
let numero_inicial=1

var carga=[0]
document.addEventListener("DOMContentLoaded",llamar(numero_pokemons,numero_inicial));
const container=document.getElementById("container");
const paginas=document.getElementById("paginas")
const btn_siguiente=document.querySelector(".btn_siguiente");
const titulo=document.querySelector(".title");
const close=document.getElementById("btn_cloes");


function siguiente(){


    numero_pokemons+=50
    numero_inicial+=50
    llamar(numero_pokemons,numero_inicial)
}

function limpiar(){
    container.innerHTML=""
}

async function llamar(num,numero_inicial){
    for (let i =numero_inicial; i <= num; i++) {
        await buscar(i)

    }

}


async function buscar(id){
    let characters=await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    characters=await characters.json();
    carga.push(characters)
    console.log(characters)
    await pintar(characters,id);

}

function pintar(character,id){
let contenedor= document.createElement("div");
contenedor.setAttribute("class","character")
let nombre=document.createElement("h2");
nombre.setAttribute("class","character_title");

let imagen=document.createElement("img");
imagen.setAttribute("class","character_image")
nombre.innerHTML=character.name
let tipo_personaje=document.createElement("h3");
tipo_personaje.innerHTML=character.types[0].type.name
tipo_personaje.setAttribute("class","tipo_personaje")


imagen.setAttribute("src",`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`)
contenedor.setAttribute("onclick",`unico(${id})`)
contenedor.appendChild(imagen);
contenedor.appendChild(nombre);
contenedor.appendChild(tipo_personaje);

container.appendChild(contenedor)

tipo(character,contenedor)


}

function tipo(character,cotenedor){
    let tipo=character.types[0].type.name


    switch (tipo) {
        case "grass":
            cotenedor.setAttribute("class","character character_grass")
            break;
        case "fire":
            cotenedor.setAttribute("class","character character_fire")
            break;
        case "water":
            cotenedor.setAttribute("class","character character_water")
            break;
        case "bug":
            cotenedor.setAttribute("class","character character_bug")
            break;
        case "electric":
            cotenedor.setAttribute("class","character character_electric")
            break;
        case "normal":
            cotenedor.setAttribute("class","character character_normal")
            break
        case "poison":
            cotenedor.setAttribute("class","character character_poison")
            break
        case "fairy":
            cotenedor.setAttribute("class","character character_fairy")
        case "ground":
            cotenedor.setAttribute("class","character character_ground")
            break
        default:
            cotenedor.setAttribute("class","character character_default")
            break;
    }
}


function limpiar_todo(){
titulo.setAttribute("class","no_active");
btn_siguiente.setAttribute("class","no_active")
close.setAttribute("class","active")

}
function regresa_todo(){
titulo.setAttribute("class","title");
btn_siguiente.setAttribute("class","btn_siguiente")
close.setAttribute("class","no_active")
container.setAttribute("class","container");
let descativo=document.querySelector(".activo");
descativo.setAttribute("class","");
let activo=document.getElementById("about");
activo.setAttribute("class","activo")

let feature=document.querySelector(".features_active");
feature.setAttribute("class","features");
let navbar=document.querySelector(".navbar_active");
navbar.setAttribute("class","navbar")  


}
function unico(id){

    limpiar()
    limpiar_todo()
    pintar_unico(id)
}
function pintar_unico(id){
    let personaje=carga[id];
    pintar(personaje,id)
    container.setAttribute("class","character_container");
    let image=document.querySelector(".character_image")
    image.setAttribute("class","image_unica")
    let text=document.querySelector(".character_title")
    text.setAttribute("class","titulo_unico")
    console.log(personaje)
    estadisticas("about",personaje);

   
}
function back(){
    limpiar()
    regresa_todo()
    for (let i =1; i <=carga.length ; i++) {
        let personaje=carga[i];
        pintar(personaje,i)

    }

}
function estadisticas(e,character){
  cambiar_stat(e);
  cambiar_about(character)


}
function cambiar_stat(e){
    let descativo=document.querySelector(".activo");
    descativo.setAttribute("class","")
    let activo=document.getElementById(e);
    activo.setAttribute("class","activo")
}

function cambiar_about(character){
    let about={
        especie:character.species.name,
        altura:character.height,
        peso:character.weight,
        habilidad:character.abilities
      }
    let feature=document.querySelector(".features");
    feature.setAttribute("class","features_active");
    let navbar=document.querySelector(".navbar");
    navbar.setAttribute("class","navbar_active")  



    let especie=document.querySelector(".especie");
    especie.innerHTML=about.especie;
    let altura=document.querySelector(".altura");
    altura.innerHTML=about.altura;
    let peso=document.querySelector(".peso");
    peso.innerHTML=about.peso;
    let habilidad=document.querySelector(".habilidad");
    habilidad.innerHTML=`${about.habilidad[0].ability.name},  ${about.habilidad[1].ability.name}`
    console.log(about.habilidad)
   

}