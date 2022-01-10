//Juego
let colores = ["azul", "rojo", "verde", "violeta", "amarillo", "naranja", 
               "azul", "rojo", "verde", "violeta", "amarillo", "naranja"];
let puntajeTotal = 0;
const puntajePorAcierto = 100;
let aciertos = 0;
let rectangulos = [];

deshabilitarBoton("abandonar");

const $jugar = document.querySelector("#jugar");
$jugar.onclick = function(){
    deshabilitarBoton("jugar");

    habilitarBoton("abandonar");

    manejarAbandonarPartida();

    cambiarMensajeAlIniciarPartida();

    ordenarRectangulosAleatoriamente(colores);

    habilitarJugador();
}

function habilitarBoton(boton){
    document.getElementById(boton).classList.remove("disabled");
}

function deshabilitarBoton(boton){
    document.getElementById(boton).classList.add("disabled");
}

function jugarTurno(e){
    mostrarRectangulo(e);
    let rectangulo = asociarRectanguloGrisConElDeColor(e.target.id);
    rectangulos.push(rectangulo);

    if(rectangulos.length === 2){
        
        let color1 = document.getElementById(rectangulos[0]).classList[1];
        let color2 = document.getElementById(rectangulos[1]).classList[1];
        if(color1 !== color2){
            bloquearJugador();
            ocultarRectangulos(rectangulos[0], rectangulos[1]);
            rectangulos = [];
            setTimeout(function(){
                habilitarJugador();
            }, 1000);

        }else{
            aciertos++;
            calcularPuntajeTotal();
            rectangulos = [];
        }
    }

    setTimeout(function(){
        revisarSiSeAcaboLaPartida();
    }, 500);

}

function revisarSiSeAcaboLaPartida(){
    if(aciertos === 6){
        cambiarMensajeAlAcabarPartida();
        puntajeTotal = 0;  
        aciertos = 0;
        rectangulos = [];
        ocultarRectangulosColores();
        deshabilitarBoton("abandonar");
        habilitarBoton("jugar");
        bloquearJugador();
    }
}

function manejarAbandonarPartida(){
    const $abandonar = document.querySelector("#abandonar");
    $abandonar.onclick = function(){
        cambiarMensajeAlAcabarPartida();
        puntajeTotal = 0;
        aciertos = 0;
        rectangulos = [];
        ocultarRectangulosColores();
        deshabilitarBoton("abandonar");
        habilitarBoton("jugar");
        bloquearJugador();
    }
}
//Cambiar mensajes 
function cambiarMensajeAlIniciarPartida(){
    const $mensaje = document.querySelector("#mensaje");
    $mensaje.textContent = 'Estás jugando, si quieres terminar el juego presiona el botón "abandonar".';
}

function cambiarMensajeAlAcabarPartida(){
    const $mensaje = document.querySelector("#mensaje");
    let mensajeNuevo = 'Tú puntaje es ' + puntajeTotal + ', presiona el botón "jugar" para jugar de nuevo.';
    $mensaje.textContent = mensajeNuevo;
}

//Puntaje
function calcularPuntajeTotal(){
    puntajeTotal = puntajeTotal + puntajePorAcierto;
}

//Mostras u ocultar rectangulos
function ocultarRectangulos(color1, color2){
    setTimeout(function(){
        const $color1 = document.getElementById(color1);
        $color1.className += " oculto";
        color1 = color1.substring(1);
        const $rectanguloGris1 = document.getElementById("g" + color1);
        $rectanguloGris1.classList.remove("oculto");
    
        const $color2 = document.getElementById(color2);
        $color2.className += " oculto";
        color2 = color2.substring(1);
        const $rectanguloGris2 = document.getElementById("g" + color2);
        $rectanguloGris2.classList.remove("oculto");
        },500)

}

function mostrarRectangulo(e){
    const rectanguloGris = e.target.id;
    const $rectanguloGris = document.getElementById(rectanguloGris);
        $rectanguloGris.className += " oculto";
       
    const rectanguloColor = asociarRectanguloGrisConElDeColor(rectanguloGris);
    const $rectanguloColor = document.getElementById(rectanguloColor);
        $rectanguloColor.classList.remove("oculto");

}

function ocultarRectangulosColores(){
    const $rectangulosGrises = document.querySelectorAll(".gris");
    $rectangulosGrises.forEach(gris => 
        gris.classList.remove("oculto"));

    for(let i = 0; i < 12; i++){
        let idColor = "c" + i;
        const $rectanguloColor = document.getElementById(idColor);
        $rectanguloColor.classList.add("oculto");
    }
}
//Asociar rectangulos grises con los de color
function asociarRectanguloGrisConElDeColor(rectanguloGris){
    let numero = rectanguloGris.substring(1);
    let colorAsociado = "c" + numero;
    return colorAsociado;
}

//Habilitar y bloquaer jugador
function habilitarJugador() {
    document.querySelectorAll(".gris").forEach(element =>
        element.onclick = jugarTurno);
}

function bloquearJugador(){
    document.querySelectorAll(".gris").forEach(element => 
        element.onclick = function(){});
}

function intercambiarElementos(elementos, index, numAleatorio){
    let elementoGuardado = elementos[index];
    elementos[index] = elementos[numAleatorio];
    elementos[numAleatorio] = elementoGuardado;
}

function definirRectangulos(elementos){
    for(let i = 0; i < elementos.length; i++){
        let color = String(elementos[i]);
        let idColor = "c" + i;
        const $rectangulo = document.getElementById(idColor);
        $rectangulo.className = "rectangulo oculto";
        $rectangulo.className += " "+ color;
    }
}

function ordenarRectangulosAleatoriamente(elementos){
    for(let i = 0; i < elementos.length; i++){
        let numAleatorio = Math.floor(Math.random()*elementos.length);
        intercambiarElementos(elementos, i, numAleatorio);
    }

    definirRectangulos(elementos);
}

