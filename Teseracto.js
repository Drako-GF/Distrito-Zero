/******************************************************************************
 ==============================================================================
    DISTRITO ZERO
    ERROR CODE 198

    Archivo: Teseracto.js
    FASE 1
    - Inicialización del teseracto
    - Animaciones principales
    - Brillo dinámico
    - Movimiento flotante
 ==============================================================================
******************************************************************************/

/******************************************************************************
    IMPORTANTE

    Este archivo necesita Three.js cargado previamente desde el HTML.

******************************************************************************/

//======================================================================
// ESCENA
//======================================================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);

//======================================================================
// CÁMARA
//======================================================================

const camera = new THREE.PerspectiveCamera(

    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000

);

camera.position.z = 4;


//======================================================================
// RENDERER
//======================================================================

const renderer = new THREE.WebGLRenderer({

    antialias: true,
    alpha: false

});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(

    window.innerWidth,
    window.innerHeight

);

document.body.appendChild(renderer.domElement);


//======================================================================
// GEOMETRÍA
//======================================================================

const geometry = new THREE.BoxGeometry(1,1,1);


//======================================================================
// MATERIALES
//======================================================================

const materialExterior = new THREE.MeshBasicMaterial({

    color:0x00bfff,
    wireframe:true

});

const materialInterior = new THREE.MeshBasicMaterial({

    color:0x00e5ff,
    wireframe:true

});


//======================================================================
// CUBOS
//======================================================================

const cuboExterior = new THREE.Mesh(

    geometry,
    materialExterior

);

const cuboInterior = new THREE.Mesh(

    geometry.clone(),
    materialInterior

);

cuboInterior.scale.set(

    0.6,
    0.6,
    0.6

);

scene.add(cuboExterior);

scene.add(cuboInterior);


//======================================================================
// VARIABLES DE ANIMACIÓN
//======================================================================

const reloj = new THREE.Clock();

let tiempo = 0;


//======================================================================
// BUCLE PRINCIPAL
//======================================================================

function animate(){

    requestAnimationFrame(animate);

    tiempo = reloj.getElapsedTime();


    //----------------------------------------------------------
    // ROTACIÓN
    //----------------------------------------------------------

    cuboExterior.rotation.x += 0.003;

    cuboExterior.rotation.y += 0.004;

    cuboExterior.rotation.z += 0.0015;

    cuboInterior.rotation.x -= 0.004;

    cuboInterior.rotation.y -= 0.003;

    cuboInterior.rotation.z -= 0.002;


    //----------------------------------------------------------
    // RESPIRACIÓN
    //----------------------------------------------------------

    const respiracion =

        1 + Math.sin(tiempo * 1.2) * 0.12;

    cuboExterior.scale.set(

        respiracion,
        respiracion,
        respiracion

    );

    cuboInterior.scale.set(

        respiracion * 0.6,
        respiracion * 0.6,
        respiracion * 0.6

    );


    //----------------------------------------------------------
    // MOVIMIENTO FLOTANTE
    //----------------------------------------------------------

    const flotacion =

        Math.sin(tiempo * 0.7) * 0.12;

    cuboExterior.position.y = flotacion;

    cuboInterior.position.y = flotacion;


    //----------------------------------------------------------
    // CAMBIO SUAVE DE COLOR
    //----------------------------------------------------------

    const intensidad =

        (Math.sin(tiempo * 2) + 1) / 2;

    materialExterior.color.setHSL(

        0.55,
        1,
        0.45 + intensidad * 0.15

    );

    materialInterior.color.setHSL(

        0.53,
        1,
        0.55 + intensidad * 0.20

    );


    //----------------------------------------------------------
    // RENDER
    //----------------------------------------------------------

    renderer.render(

        scene,
        camera

    );

}

animate();


//======================================================================
// RESPONSIVE
//======================================================================

window.addEventListener(

    "resize",

    () => {

        camera.aspect =

            window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(

            window.innerWidth,
            window.innerHeight

        );

    }

);
/******************************************************************************
==============================================================================
                FASE 2
        RECUPERACIÓN DEL ARCHIVO CLASIFICADO
==============================================================================
******************************************************************************/

/*===========================================================================
    MENSAJE CENTRAL
===========================================================================*/

const mensajeCentral = document.getElementById("mensaje-teseracto");

/*===========================================================================
    SECUENCIA DE ARRANQUE
===========================================================================*/

const secuenciaInicio = [

    "RECUPERANDO ARCHIVO...",
    "ERROR CODE 198",
    "Buscando datos...",
    "Sincronizando...",
    "Verificando integridad...",
    "Acceso concedido."

];

let pasoActual = 0;


/*===========================================================================
    CAMBIAR TEXTO
===========================================================================*/

function siguientePaso(){

    if(pasoActual < secuenciaInicio.length){

        mensajeCentral.textContent =

            secuenciaInicio[pasoActual];

        pasoActual++;

    }

}


/*===========================================================================
    EFECTO GLITCH
===========================================================================*/

function glitchMensaje(){

    mensajeCentral.style.transform =

        `translate(
            ${Math.random()*12-6}px,
            ${Math.random()*12-6}px
        )`;

    mensajeCentral.style.letterSpacing =

        (1 + Math.random()*6) + "px";

    mensajeCentral.style.opacity =

        0.6 + Math.random()*0.4;

}


/*===========================================================================
    RESTAURAR MENSAJE
===========================================================================*/

function restaurarMensaje(){

    mensajeCentral.style.transform =

        "translate(-50%, -50%)";

    mensajeCentral.style.letterSpacing =

        "2px";

    mensajeCentral.style.opacity =

        1;

}


/*===========================================================================
    CAMBIAR MENSAJE CADA DOS SEGUNDOS
===========================================================================*/

const intervaloInicio = setInterval(()=>{

    glitchMensaje();

    setTimeout(restaurarMensaje,120);

    siguientePaso();

},2000);


/*===========================================================================
    DESAPARECER AL FINAL
===========================================================================*/

setTimeout(()=>{

    clearInterval(intervaloInicio);

    mensajeCentral.style.transition =

        "opacity 3s ease";

    mensajeCentral.style.opacity = 0;

},14000);



/*===========================================================================
    DESTELLOS MUY SUAVES
===========================================================================*/

function destelloPantalla(){

    document.body.style.filter =

        "brightness(130%)";

    setTimeout(()=>{

        document.body.style.filter =

            "brightness(100%)";

    },80);

}


/*===========================================================================
    INTERFERENCIAS ALEATORIAS
===========================================================================*/

setInterval(()=>{

    if(Math.random()<0.15){

        glitchMensaje();

        destelloPantalla();

        setTimeout(restaurarMensaje,120);

    }

},5000);



/*===========================================================================
    PEQUEÑA VIBRACIÓN DEL TESERACTO
===========================================================================*/

function vibracionTeseracto(){

    const x = (Math.random()-0.5)*0.05;

    const y = (Math.random()-0.5)*0.05;

    cuboExterior.position.x = x;

    cuboExterior.position.y += y;

    cuboInterior.position.x = x;

    cuboInterior.position.y += y;

    setTimeout(()=>{

        cuboExterior.position.x = 0;

        cuboInterior.position.x = 0;

    },120);

}


/*===========================================================================
    VIBRACIÓN MUY POCO FRECUENTE
===========================================================================*/

setInterval(()=>{

    if(Math.random()<0.08){

        vibracionTeseracto();

    }

},7000);
/******************************************************************************
==============================================================================
                    FASE 3
            SISTEMA DE MENSAJES INTELIGENTES
==============================================================================
******************************************************************************/

/*===========================================================================
    MENSAJES
===========================================================================*/

const mensajesNormales = [

    "Rachel...",
    "Rásek...",
    "Lumen...",
    "Drako...",
    "Lilith...",
    "Siempre fuimos familia.",
    "Siempre fuiste tú.",
    "Nos une un gran poder.",
    "Todo comenzó aquí.",
    "La causa siempre fue el efecto."

];

const mensajesAdvertencia = [

    "Él viene.",
    "No mires atrás.",
    "Nos queda poco tiempo.",
    "No abras la puerta.",
    "No sigas buscando.",
    "Demasiado tarde.",
    "No deberías estar aquí.",
    "El tiempo está colapsando."

];

const mensajesError = [

    "ERROR TEMPORAL",
    "ARCHIVO DAÑADO",
    "SECUENCIA ALTERADA",
    "ERROR CODE 198",
    "INTEGRIDAD COMPROMETIDA",
    "SINCRONIZACIÓN FALLIDA"

];


/*===========================================================================
    MENSAJES QUE MUTAN
===========================================================================*/

const mutaciones = {

    "Rachel..." :
    "Rachel ha desaparecido.",

    "Siempre fuiste tú." :
    "Siempre serás tú.",

    "Nos une un gran poder." :
    "...que aún no comprendemos.",

    "Él viene." :
    "Ya está aquí.",

    "No mires atrás." :
    "Demasiado tarde."

};


/*===========================================================================
    CREAR MENSAJE
===========================================================================*/

function crearMensaje(texto,color){

    const mensaje = document.createElement("div");

    mensaje.className = "mensaje-aleatorio";

    mensaje.textContent = texto;

    mensaje.style.color = color;

    mensaje.style.left =
        Math.random()*85 + "%";

    mensaje.style.top =
        Math.random()*85 + "%";

    mensaje.style.fontSize =
        (18 + Math.random()*16) + "px";

    mensaje.style.opacity = 0;

    document.body.appendChild(mensaje);

    requestAnimationFrame(()=>{

        mensaje.style.opacity = 1;

    });


    //----------------------------------------------------
    // Movimiento lento
    //----------------------------------------------------

    let dx =
        (Math.random()-0.5)*30;

    let dy =
        (Math.random()-0.5)*30;

    mensaje.animate(

        [

            {

                transform:"translate(0px,0px)"

            },

            {

                transform:
                `translate(${dx}px,${dy}px)`

            }

        ],

        {

            duration:5000,
            fill:"forwards"

        }

    );


    //----------------------------------------------------
    // Posible mutación
    //----------------------------------------------------

    if(mutaciones[texto] && Math.random()<0.25){

        setTimeout(()=>{

            mensaje.textContent =

                mutaciones[texto];

        },2500);

    }


    //----------------------------------------------------
    // Desaparecer
    //----------------------------------------------------

    setTimeout(()=>{

        mensaje.style.opacity=0;

        setTimeout(()=>{

            mensaje.remove();

        },1000);

    },5000);

}


/*===========================================================================
    GENERADOR
===========================================================================*/

function generarMensaje(){

    const tipo = Math.random();

    if(tipo<0.65){

        crearMensaje(

            mensajesNormales[
                Math.floor(Math.random()*mensajesNormales.length)
            ],

            "#6fdcff"

        );

    }

    else if(tipo<0.90){

        crearMensaje(

            mensajesAdvertencia[
                Math.floor(Math.random()*mensajesAdvertencia.length)
            ],

            "#ffe45a"

        );

    }

    else{

        crearMensaje(

            mensajesError[
                Math.floor(Math.random()*mensajesError.length)
            ],

            "#ff4040"

        );

    }

}


/*===========================================================================
    FRECUENCIA
===========================================================================*/

setInterval(

    generarMensaje,

    9000

);
/******************************************************************************
==============================================================================
                            FASE 4
              EVENTOS RAROS · ANOMALÍAS · ACABADO FINAL
==============================================================================
******************************************************************************/

/*===========================================================================
    TIEMPO EN LA PÁGINA
===========================================================================*/

const inicioSesion = Date.now();


/*===========================================================================
    MENSAJES EXCLUSIVOS
===========================================================================*/

const mensajesCincoMinutos = [

    "¿Sigues aquí?",
    "No esperaba que permanecieras tanto tiempo.",
    "El archivo comienza a responder.",
    "La sincronización aumenta.",
    "Algo está cambiando."

];

const mensajesDiezMinutos = [

    "Ahora él sabe que has entrado.",
    "Ya no puedes deshacer esto.",
    "El ciclo vuelve a comenzar.",
    "No deberías haber visto esto.",
    "Todo estaba escrito."

];


/*===========================================================================
    MENSAJE CENTRAL GIGANTE
===========================================================================*/

function mensajeCentralGigante(texto,color){

    const cartel = document.createElement("div");

    cartel.style.position="absolute";
    cartel.style.left="50%";
    cartel.style.top="50%";
    cartel.style.transform="translate(-50%,-50%)";

    cartel.style.fontSize="70px";
    cartel.style.fontWeight="bold";
    cartel.style.fontFamily="Georgia";

    cartel.style.color=color;

    cartel.style.opacity="0";

    cartel.style.pointerEvents="none";

    cartel.style.textShadow=
        "0 0 20px "+color;

    cartel.textContent=texto;

    document.body.appendChild(cartel);

    requestAnimationFrame(()=>{

        cartel.style.transition="opacity .4s";

        cartel.style.opacity=1;

    });

    setTimeout(()=>{

        cartel.style.opacity=0;

        setTimeout(()=>{

            cartel.remove();

        },600);

    },1800);

}


/*===========================================================================
    GLITCH GENERAL
===========================================================================*/

function glitchPantalla(){

    renderer.domElement.style.transform=

        `translate(
        ${Math.random()*10-5}px,
        ${Math.random()*10-5}px
        )`;

    renderer.domElement.style.filter=

        "brightness(150%)";

    setTimeout(()=>{

        renderer.domElement.style.transform="none";

        renderer.domElement.style.filter="brightness(100%)";

    },120);

}


/*===========================================================================
    EVENTOS MUY POCO FRECUENTES
===========================================================================*/

setInterval(()=>{

    const tiempo=

        (Date.now()-inicioSesion)/1000;


    //-------------------------------------------------------
    // Después de 5 minutos
    //-------------------------------------------------------

    if(tiempo>300 && Math.random()<0.20){

        crearMensaje(

            mensajesCincoMinutos[
                Math.floor(Math.random()*mensajesCincoMinutos.length)
            ],

            "#7df7ff"

        );

    }


    //-------------------------------------------------------
    // Después de 10 minutos
    //-------------------------------------------------------

    if(tiempo>600 && Math.random()<0.15){

        crearMensaje(

            mensajesDiezMinutos[
                Math.floor(Math.random()*mensajesDiezMinutos.length)
            ],

            "#ff8d8d"

        );

    }


    //-------------------------------------------------------
    // Evento extremadamente raro
    //-------------------------------------------------------

    if(Math.random()<0.008){

        glitchPantalla();

        vibracionTeseracto();

        mensajeCentralGigante(

            "ERROR CODE 198",

            "#ff0000"

        );

    }


    //-------------------------------------------------------
    // Evento ultra raro
    //-------------------------------------------------------

    if(Math.random()<0.003){

        glitchPantalla();

        vibracionTeseracto();

        mensajeCentralGigante(

            "ÉL YA ESTÁ AQUÍ",

            "#ffe74a"

        );

    }

},15000);



/*===========================================================================
    PULSO DEL TESERACTO
===========================================================================*/

setInterval(()=>{

    const escalaOriginal=cuboExterior.scale.x;

    cuboExterior.scale.multiplyScalar(1.18);

    cuboInterior.scale.multiplyScalar(1.18);

    setTimeout(()=>{

        cuboExterior.scale.set(

            escalaOriginal,
            escalaOriginal,
            escalaOriginal

        );

        cuboInterior.scale.set(

            escalaOriginal*0.6,
            escalaOriginal*0.6,
            escalaOriginal*0.6

        );

    },250);

},18000);



/*===========================================================================
    CAMBIO NOCTURNO
===========================================================================*/

const hora=new Date().getHours();

if(hora>=22 || hora<=5){

    materialExterior.color.set(0x5577ff);

    materialInterior.color.set(0xaa55ff);

}



/*===========================================================================
    MENSAJE EXCLUSIVO ENTRE LAS 03:00 Y LAS 04:00
===========================================================================*/

if(hora===3){

    setTimeout(()=>{

        mensajeCentralGigante(

            "YA HAS LLEGADO DEMASIADO TARDE",

            "#ff0000"

        );

    },10000);

}
