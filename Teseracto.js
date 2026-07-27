/******************************************************************************
==============================================================================
                            DISTRITO ZERO
                            ERROR CODE 198

                            Teseracto.js
                            BLOQUE 1 / 7

    • Inicialización de Three.js
    • Escena
    • Cámara
    • Renderer
    • Luces
    • Grupo principal del teseracto
    • Materiales
==============================================================================/

/*===========================================================================
    ESCENA
===========================================================================*/

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);


/*===========================================================================
    CÁMARA
===========================================================================*/

const camera = new THREE.PerspectiveCamera(

    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000

);

camera.position.set(0,0,5.5);


/*===========================================================================
    RENDERER
===========================================================================*/

const renderer = new THREE.WebGLRenderer({

    antialias:true,
    alpha:false

});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(

    window.innerWidth,
    window.innerHeight

);

renderer.outputColorSpace = THREE.SRGBColorSpace;

document.body.appendChild(renderer.domElement);


/*===========================================================================
    LUCES
===========================================================================*/

// Luz ambiental

const ambientLight = new THREE.AmbientLight(

    0x88ccff,
    0.35

);

scene.add(ambientLight);


// Luz principal

const pointLight = new THREE.PointLight(

    0x7eeeff,
    2.2,
    25

);

pointLight.position.set(

    0,
    0,
    4

);

scene.add(pointLight);


// Luz trasera

const backLight = new THREE.PointLight(

    0x3355ff,
    1.4,
    20

);

backLight.position.set(

    0,
    0,
    -5

);

scene.add(backLight);


/*===========================================================================
    GRUPO PRINCIPAL
===========================================================================*/

const teseracto = new THREE.Group();

scene.add(teseracto);


/*===========================================================================
    GEOMETRÍAS
===========================================================================*/

const geometriaExterior = new THREE.BoxGeometry(

    1.8,
    1.8,
    1.8

);

const geometriaInterior = new THREE.BoxGeometry(

    1.1,
    1.1,
    1.1

);

const geometriaNucleo = new THREE.BoxGeometry(

    0.45,
    0.45,
    0.45

);


/*===========================================================================
    MATERIALES
===========================================================================*/

const materialExterior = new THREE.MeshBasicMaterial({

    color:0x7fefff,
    wireframe:true,
    transparent:true,
    opacity:0.95

});

const materialInterior = new THREE.MeshBasicMaterial({

    color:0x6acbff,
    wireframe:true,
    transparent:true,
    opacity:0.85

});

const materialNucleo = new THREE.MeshBasicMaterial({

    color:0xffffff,
    wireframe:true,
    transparent:true,
    opacity:1

});


/*===========================================================================
    CUBOS
===========================================================================*/

const cuboExterior = new THREE.Mesh(

    geometriaExterior,
    materialExterior

);

const cuboInterior = new THREE.Mesh(

    geometriaInterior,
    materialInterior

);

const cuboNucleo = new THREE.Mesh(

    geometriaNucleo,
    materialNucleo

);

teseracto.add(cuboExterior);
teseracto.add(cuboInterior);
teseracto.add(cuboNucleo);


/*===========================================================================
    VARIABLES GLOBALES
===========================================================================*/

const reloj = new THREE.Clock();

let tiempo = 0;

let intensidadEnergia = 1;

let vibracion = 0;

const objetosBrillantes = [];

const particulas = [];
/******************************************************************************
==============================================================================
                            DISTRITO ZERO
                            ERROR CODE 198

                            Teseracto.js
                            BLOQUE 2 / 7

    • Aristas del teseracto
    • Conexiones entre cubos
    • Halo energético
    • Partículas orbitales
==============================================================================
******************************************************************************/

/*===========================================================================
    ARISTAS DEL TESERACTO
===========================================================================*/

const aristas = new THREE.EdgesGeometry(geometriaExterior);

const lineasExterior = new THREE.LineSegments(

    aristas,

    new THREE.LineBasicMaterial({

        color:0xb8ffff,
        transparent:true,
        opacity:0.95

    })

);

teseracto.add(lineasExterior);


const aristasInterior = new THREE.EdgesGeometry(geometriaInterior);

const lineasInterior = new THREE.LineSegments(

    aristasInterior,

    new THREE.LineBasicMaterial({

        color:0x6fdcff,
        transparent:true,
        opacity:0.8

    })

);

teseracto.add(lineasInterior);


/*===========================================================================
    UNIONES ENTRE LOS DOS CUBOS
===========================================================================*/

const verticesExterior = [

    [-0.9,-0.9,-0.9],
    [ 0.9,-0.9,-0.9],
    [ 0.9, 0.9,-0.9],
    [-0.9, 0.9,-0.9],

    [-0.9,-0.9, 0.9],
    [ 0.9,-0.9, 0.9],
    [ 0.9, 0.9, 0.9],
    [-0.9, 0.9, 0.9]

];

const verticesInterior = [

    [-0.55,-0.55,-0.55],
    [ 0.55,-0.55,-0.55],
    [ 0.55, 0.55,-0.55],
    [-0.55, 0.55,-0.55],

    [-0.55,-0.55, 0.55],
    [ 0.55,-0.55, 0.55],
    [ 0.55, 0.55, 0.55],
    [-0.55, 0.55, 0.55]

];

for(let i=0;i<8;i++){

    const puntos=[];

    puntos.push(

        new THREE.Vector3(...verticesExterior[i]),
        new THREE.Vector3(...verticesInterior[i])

    );

    const geometriaLinea = new THREE.BufferGeometry().setFromPoints(puntos);

    const linea = new THREE.Line(

        geometriaLinea,

        new THREE.LineBasicMaterial({

            color:0xffffff,
            transparent:true,
            opacity:0.75

        })

    );

    objetosBrillantes.push(linea);

    teseracto.add(linea);

}


/*===========================================================================
    HALO ENERGÉTICO
===========================================================================*/

const halo = new THREE.Sprite(

    new THREE.SpriteMaterial({

        color:0x6fefff,

        transparent:true,

        opacity:0.16,

        blending:THREE.AdditiveBlending,

        depthWrite:false

    })

);

halo.scale.set(

    3.6,
    3.6,
    3.6

);

teseracto.add(halo);


/*===========================================================================
    PARTÍCULAS
===========================================================================*/

const geometriaParticula = new THREE.SphereGeometry(

    0.015,
    8,
    8

);

for(let i=0;i<45;i++){

    const material = new THREE.MeshBasicMaterial({

        color:0xb8ffff,

        transparent:true,

        opacity:0.75

    });

    const particula = new THREE.Mesh(

        geometriaParticula,

        material

    );

    const radio =

        1.6 + Math.random()*1.2;

    const angulo =

        Math.random()*Math.PI*2;

    const altura =

        (Math.random()-0.5)*2;

    particula.position.set(

        Math.cos(angulo)*radio,

        altura,

        Math.sin(angulo)*radio

    );

    particula.userData={

        radio,

        angulo,

        velocidad:

            0.002 + Math.random()*0.006,

        altura,

        desfase:

            Math.random()*Math.PI*2

    };

    particulas.push(particula);

    teseracto.add(particula);

}


/*===========================================================================
    RESPLANDOR CENTRAL
===========================================================================*/

const luzNucleo = new THREE.PointLight(

    0xa8ffff,

    2.5,

    10

);

teseracto.add(luzNucleo);


/*===========================================================================
    POSICIÓN INICIAL
===========================================================================*/

teseracto.position.set(

    0,
    0,
    0

);
/******************************************************************************
==============================================================================
                            DISTRITO ZERO
                            ERROR CODE 198

                            Teseracto.js
                            BLOQUE 3 / 7

    • Animación principal
    • Rotación orgánica
    • Respiración
    • Órbita de partículas
    • Pulso energético
    • Destellos
==============================================================================
******************************************************************************/

/*===========================================================================
    DESTELLOS EN LAS ARISTAS
===========================================================================*/

let aristaActiva = -1;

function actualizarDestellos(){

    if(Math.random()<0.025){

        aristaActiva = Math.floor(

            Math.random()*objetosBrillantes.length

        );

    }

    objetosBrillantes.forEach((linea,i)=>{

        if(i===aristaActiva){

            linea.material.opacity=1;

            linea.material.color.set(0xffffff);

        }

        else{

            linea.material.opacity=0.45;

            linea.material.color.set(0x8fdfff);

        }

    });

}


/*===========================================================================
    ANIMACIÓN
===========================================================================*/

function animate(){

    requestAnimationFrame(animate);

    tiempo = reloj.getElapsedTime();


    /*----------------------------------------------------------
        ROTACIÓN ORGÁNICA
    ----------------------------------------------------------*/

    teseracto.rotation.y += 0.0045;

    teseracto.rotation.x =

        Math.sin(tiempo*0.45)*0.22;

    teseracto.rotation.z =

        Math.cos(tiempo*0.33)*0.12;


    cuboInterior.rotation.x -=0.006;

    cuboInterior.rotation.y +=0.004;

    cuboNucleo.rotation.x +=0.015;

    cuboNucleo.rotation.y -=0.012;

    cuboNucleo.rotation.z +=0.010;


    /*----------------------------------------------------------
        RESPIRACIÓN
    ----------------------------------------------------------*/

    const respiracion =

        1 + Math.sin(tiempo*1.15)*0.05;

    teseracto.scale.set(

        respiracion,

        respiracion,

        respiracion

    );


    /*----------------------------------------------------------
        FLOTACIÓN
    ----------------------------------------------------------*/

   teseracto.position.y =
    -0.9 +
    Math.sin(tiempo*0.65)*0.18;


    /*----------------------------------------------------------
        PULSO DEL HALO
    ----------------------------------------------------------*/

    halo.material.opacity =

        0.10 +

        Math.sin(tiempo*2)*0.05;

    halo.scale.setScalar(

        3.5 +

        Math.sin(tiempo*1.4)*0.25

    );


    /*----------------------------------------------------------
        COLOR DINÁMICO
    ----------------------------------------------------------*/

    intensidadEnergia =

        (Math.sin(tiempo*2)+1)/2;

    materialExterior.color.setHSL(

        0.54,

        1,

        0.55 + intensidadEnergia*0.12

    );

    materialInterior.color.setHSL(

        0.56,

        1,

        0.50 + intensidadEnergia*0.15

    );

    materialNucleo.color.setHSL(

        0.57,

        0.2,

        0.90

    );


    pointLight.intensity =

        2 +

        intensidadEnergia*1.2;

    luzNucleo.intensity =

        2 +

        intensidadEnergia*2;


    /*----------------------------------------------------------
        PARTÍCULAS
    ----------------------------------------------------------*/

    particulas.forEach((p)=>{

        p.userData.angulo +=

            p.userData.velocidad;

        p.position.x =

            Math.cos(p.userData.angulo)

            *p.userData.radio;

        p.position.z =

            Math.sin(p.userData.angulo)

            *p.userData.radio;

        p.position.y =

            p.userData.altura +

            Math.sin(

                tiempo +

                p.userData.desfase

            )*0.10;

    });


    /*----------------------------------------------------------
        DESTELLOS
    ----------------------------------------------------------*/

    actualizarDestellos();


    /*----------------------------------------------------------
        RENDER
    ----------------------------------------------------------*/

    renderer.render(

        scene,

        camera

    );

}


/*===========================================================================
    INICIO
===========================================================================*/

animate();


/*===========================================================================
    RESPONSIVE
===========================================================================*/

window.addEventListener(

    "resize",

    ()=>{

        camera.aspect=

            window.innerWidth/

            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

    }

);
/******************************************************************************
==============================================================================
                            DISTRITO ZERO
                            ERROR CODE 198

                            Teseracto.js
                            BLOQUE 4 / 7

    • Mensaje principal
    • Escritura progresiva
    • Cursor
    • Mensajes orbitando alrededor del teseracto
    • Glitches
==============================================================================
******************************************************************************/

/*===========================================================================
    MENSAJE PRINCIPAL
===========================================================================*/

const mensajeCentral = document.getElementById("mensaje-teseracto");

const secuenciaInicio = [

    "RECUPERANDO ARCHIVO...",
    "ERROR CODE 198",
    "BUSCANDO DATOS...",
    "DESCIFRANDO MEMORIA...",
    "SINCRONIZANDO...",
    "VERIFICANDO INTEGRIDAD...",
    "ARCHIVO RECUPERADO"

];

let indiceMensaje = 0;


/*===========================================================================
    EFECTO MÁQUINA DE ESCRIBIR
===========================================================================*/

function escribirTexto(texto){

    let i = 0;

    mensajeCentral.textContent = "";

    const intervalo = setInterval(()=>{

        mensajeCentral.textContent =

            texto.substring(0,i) +

         

        i++;

        if(i>texto.length){

            clearInterval(intervalo);

            mensajeCentral.textContent = texto;

        }

    },45);

}


/*===========================================================================
    SIGUIENTE MENSAJE
===========================================================================*/

function siguienteMensaje(){

    if(indiceMensaje>=secuenciaInicio.length){

        return;

    }

    escribirTexto(

        secuenciaInicio[indiceMensaje]

    );

    indiceMensaje++;

}


/*===========================================================================
    GLITCH DEL MENSAJE CENTRAL
===========================================================================*/

function glitchTexto(){

    mensajeCentral.classList.add("glitch");

    mensajeCentral.style.transform =

        `translate(-50%,-50%)
         translate(${Math.random()*10-5}px,
         ${Math.random()*10-5}px)`;

    mensajeCentral.style.opacity =

        0.6 + Math.random()*0.4;

    setTimeout(()=>{

        mensajeCentral.classList.remove("glitch");

        mensajeCentral.style.transform =

            "translate(-50%,-50%)";

        mensajeCentral.style.opacity = 1;

    },120);

}


/*===========================================================================
    INICIO
===========================================================================*/

const inicio = setInterval(()=>{

    glitchTexto();

    siguienteMensaje();

},2200);

setTimeout(()=>{

    clearInterval(inicio);

},16000);


/*===========================================================================
    MENSAJES ORBITALES
===========================================================================*/

const mensajes = [

    "Rachel...",
    "Rásek...",
    "Drako...",
    "Lilith...",
    "Arthur...",
    "Lumen...",
    "Distrito Zero",
    "Proyecto Nexus",
    "ERROR CODE 198",
    "MEMORIA CORRUPTA",
    "NO MIRES ATRÁS",
    "EL CICLO CONTINÚA",
    "YA ESTÁ AQUÍ",
    "ARCHIVO DAÑADO",
    "TEMPORAL ERROR",
    "NO ABRAS ESA PUERTA",
    "2501",
    "2897",
    "REDACTADO",
    "██████████"

];


/*===========================================================================
    CREAR MENSAJE ORBITAL
===========================================================================*/

function crearMensajeOrbital(){

    const mensaje = document.createElement("div");

    mensaje.className = "mensaje-aleatorio";

    mensaje.textContent =

        mensajes[

            Math.floor(

                Math.random()*mensajes.length

            )

        ];

    const radio =

        180 + Math.random()*180;

    const angulo =

        Math.random()*Math.PI*2;

    const centroX =

        window.innerWidth/2;

    const centroY =

        window.innerHeight/2;

    mensaje.style.left =

        (centroX +

        Math.cos(angulo)*radio) + "px";

    mensaje.style.top =

        (centroY +

        Math.sin(angulo)*radio) + "px";

    mensaje.style.fontSize =

        (16+Math.random()*14)+"px";

    const colores=[

        "#7fefff",

        "#ffd95a",

        "#ff5555",

        "#ffffff"

    ];

    mensaje.style.color=

        colores[

            Math.floor(

                Math.random()*colores.length

            )

        ];

    mensaje.style.opacity=0;

    document.body.appendChild(mensaje);

    requestAnimationFrame(()=>{

        mensaje.style.opacity=.9;

    });


    let desplazamiento=

        0;

    const velocidad=

        0.002+

        Math.random()*0.003;

    const animacion =

        setInterval(()=>{

            desplazamiento += velocidad;

            mensaje.style.left =

                (centroX +

                Math.cos(angulo+desplazamiento)

                *radio)+"px";

            mensaje.style.top =

                (centroY +

                Math.sin(angulo+desplazamiento)

                *radio)+"px";

        },16);


    if(Math.random()<0.25){

        setTimeout(()=>{

            glitchTexto();

        },1500);

    }


    setTimeout(()=>{

        mensaje.style.opacity=0;

        clearInterval(animacion);

        setTimeout(()=>{

            mensaje.remove();

        },800);

    },6000);

}


/*===========================================================================
    GENERADOR
===========================================================================*/

setInterval(

    crearMensajeOrbital,

    3500

);


/*===========================================================================
    INTERFERENCIAS
===========================================================================*/

setInterval(()=>{

    if(Math.random()<0.18){

        glitchTexto();

    }

},6000);
/******************************************************************************
==============================================================================
                            DISTRITO ZERO
                            ERROR CODE 198

                            Teseracto.js
                            BLOQUE 5 / 7

    • Anomalías visuales
    • Corrupciones
    • Flash
    • Distorsiones
    • Eventos raros
==============================================================================
******************************************************************************/

/*===========================================================================
    DESTELLO DE PANTALLA
===========================================================================*/

function flashPantalla(){

    document.body.style.filter="brightness(170%)";

    setTimeout(()=>{

        document.body.style.filter="brightness(100%)";

    },80);

}


/*===========================================================================
    GLITCH GLOBAL
===========================================================================*/

function glitchPantalla(){

    renderer.domElement.style.transform=

        `translate(
            ${Math.random()*12-6}px,
            ${Math.random()*12-6}px
        )
        scale(${1+(Math.random()*0.02)})`;

    renderer.domElement.style.filter=

        "contrast(140%) brightness(130%)";

    setTimeout(()=>{

        renderer.domElement.style.transform="none";

        renderer.domElement.style.filter="none";

    },120);

}


/*===========================================================================
    VIBRACIÓN DEL TESERACTO
===========================================================================*/

function vibrarTeseracto(){

    const x=(Math.random()-0.5)*0.08;

    const y=(Math.random()-0.5)*0.08;

    const z=(Math.random()-0.5)*0.08;

    teseracto.position.set(x,y,z);

    setTimeout(()=>{

        teseracto.position.set(

            0,

            Math.sin(tiempo*0.65)*0.18,

            0

        );

    },120);

}


/*===========================================================================
    PULSO ENERGÉTICO
===========================================================================*/

function pulsoEnergia(){

    halo.scale.multiplyScalar(1.45);

    pointLight.intensity*=1.8;

    luzNucleo.intensity*=2;

    setTimeout(()=>{

        halo.scale.set(

            3.5,

            3.5,

            3.5

        );

        pointLight.intensity=2.2;

        luzNucleo.intensity=2.5;

    },250);

}


/*===========================================================================
    CORRUPCIÓN DE TEXTO
===========================================================================*/

const simbolos=[

    "█",

    "▓",

    "▒",

    "#",

    "0",

    "1",

    "∆",

    "⊗",

    "⌬",

    "?"

];

function corrupcionTexto(){

    const mensaje=document.createElement("div");

    mensaje.className="mensaje-aleatorio";

    let texto="";

    const longitud=15+Math.floor(Math.random()*20);

    for(let i=0;i<longitud;i++){

        texto+=

            simbolos[

                Math.floor(

                    Math.random()*simbolos.length

                )

            ];

    }

    mensaje.textContent=texto;

    mensaje.style.left=

        (10+Math.random()*80)+"%";

    mensaje.style.top=

        (10+Math.random()*80)+"%";

    mensaje.style.color="#ffffff";

    mensaje.style.opacity=0;

    document.body.appendChild(mensaje);

    requestAnimationFrame(()=>{

        mensaje.style.opacity=.35;

    });

    setTimeout(()=>{

        mensaje.style.opacity=0;

        setTimeout(()=>{

            mensaje.remove();

        },500);

    },900);

}


/*===========================================================================
    MENSAJE GIGANTE
===========================================================================*/

function mensajeGigante(texto,color){

    const cartel=document.createElement("div");

    cartel.style.position="absolute";

    cartel.style.left="50%";

    cartel.style.top="50%";

    cartel.style.transform="translate(-50%,-50%)";

    cartel.style.fontSize="70px";

    cartel.style.fontWeight="bold";

    cartel.style.color=color;

    cartel.style.textShadow=

        "0 0 25px "+color;

    cartel.style.opacity=0;

    cartel.style.pointerEvents="none";

    cartel.textContent=texto;

    document.body.appendChild(cartel);

    requestAnimationFrame(()=>{

        cartel.style.transition="opacity .3s";

        cartel.style.opacity=1;

    });

    setTimeout(()=>{

        cartel.style.opacity=0;

        setTimeout(()=>{

            cartel.remove();

        },500);

    },1700);

}


/*===========================================================================
    EVENTOS ALEATORIOS
===========================================================================*/

setInterval(()=>{

    const r=Math.random();

    if(r<0.12){

        glitchPantalla();

    }

    if(r<0.09){

        vibrarTeseracto();

    }

    if(r<0.08){

        flashPantalla();

    }

    if(r<0.07){

        pulsoEnergia();

    }

    if(r<0.05){

        corrupcionTexto();

    }

},5000);


/*===========================================================================
    EVENTOS MUY RAROS
===========================================================================*/

setInterval(()=>{

    const r=Math.random();

    if(r<0.020){

        mensajeGigante(

            "ERROR CODE 198",

            "#ff2b2b"

        );

        flashPantalla();

        glitchPantalla();

        pulsoEnergia();

    }

    if(r<0.008){

        mensajeGigante(

            "ÉL YA ESTÁ AQUÍ",

            "#ffe84d"

        );

        flashPantalla();

        glitchPantalla();

        vibrarTeseracto();

        pulsoEnergia();

    }

    if(r<0.004){

        mensajeGigante(

            "NO DEBERÍAS HABER ENTRADO",

            "#ffffff"

        );

        flashPantalla();

        glitchPantalla();

        corrupcionTexto();

        vibrarTeseracto();

    }

},18000);
/******************************************************************************
==============================================================================
                            DISTRITO ZERO
                            ERROR CODE 198

                            Teseracto.js
                            BLOQUE 6 / 7

    • Eventos dependientes del tiempo
    • Mensajes exclusivos
    • Aceleraciones temporales
    • Variaciones de energía
    • Estado inestable
==============================================================================
******************************************************************************/

/*===========================================================================
    TIEMPO EN LA PÁGINA
===========================================================================*/

const inicioSesion = Date.now();


/*===========================================================================
    MENSAJES ESPECIALES
===========================================================================*/

const mensajesCincoMinutos=[

    "¿SIGUES AQUÍ?",
    "EL ARCHIVO COMIENZA A RESPONDER.",
    "LA SINCRONIZACIÓN HA AUMENTADO.",
    "EL TESERACTO TE HA DETECTADO.",
    "YA NO ERES UN SIMPLE OBSERVADOR."

];

const mensajesDiezMinutos=[

    "YA FORMAS PARTE DEL REGISTRO.",
    "NO EXISTE SALIDA.",
    "EL CICLO CONTINÚA.",
    "ÉL YA SABE QUE ESTÁS AQUÍ.",
    "NO DEBERÍAS HABER PERMANECIDO TANTO."

];


/*===========================================================================
    MENSAJES TEMPORALES
===========================================================================*/

setInterval(()=>{

    const tiempo=

        (Date.now()-inicioSesion)/1000;

    if(tiempo>300 && Math.random()<0.18){

        crearMensajeOrbital();

        mensajeGigante(

            mensajesCincoMinutos[
                Math.floor(

                    Math.random()*

                    mensajesCincoMinutos.length

                )
            ],

            "#7eeeff"

        );

    }

    if(tiempo>600 && Math.random()<0.15){

        crearMensajeOrbital();

        mensajeGigante(

            mensajesDiezMinutos[
                Math.floor(

                    Math.random()*

                    mensajesDiezMinutos.length

                )
            ],

            "#ff8d8d"

        );

    }

},25000);


/*===========================================================================
    ACELERACIÓN DEL TESERACTO
===========================================================================*/

let velocidadExtra=1;

function acelerarTeseracto(){

    velocidadExtra=2;

    pointLight.intensity=4;

    luzNucleo.intensity=5;

    halo.material.opacity=0.28;

    setTimeout(()=>{

        velocidadExtra=1;

        pointLight.intensity=2.2;

        luzNucleo.intensity=2.5;

        halo.material.opacity=0.16;

    },5000);

}


/*===========================================================================
    ACELERACIONES ALEATORIAS
===========================================================================*/

setInterval(()=>{

    if(Math.random()<0.10){

        acelerarTeseracto();

    }

},30000);


/*===========================================================================
    CAMBIO SEGÚN LA HORA
===========================================================================*/

const hora=new Date().getHours();

if(hora>=22 || hora<=5){

    materialExterior.color.set(0x6688ff);

    materialInterior.color.set(0xaa88ff);

    halo.material.color.set(0x8888ff);

}


/*===========================================================================
    EVENTO EXCLUSIVO ENTRE LAS 03:00 Y LAS 04:00
===========================================================================*/

if(hora===3){

    setTimeout(()=>{

        mensajeGigante(

            "YA HAS LLEGADO DEMASIADO TARDE",

            "#ff0000"

        );

        flashPantalla();

        pulsoEnergia();

    },12000);

}


/*===========================================================================
    EVENTOS DIMENSIONALES
===========================================================================*/

setInterval(()=>{

    if(Math.random()<0.05){

        particulas.forEach((p)=>{

            p.userData.radio=

                1.2+

                Math.random()*2.3;

        });

    }

},15000);


/*===========================================================================
    PARPADEO DE LUCES
===========================================================================*/

setInterval(()=>{

    if(Math.random()<0.15){

        const intensidadOriginal=

            pointLight.intensity;

        pointLight.intensity=0.5;

        setTimeout(()=>{

            pointLight.intensity=

                intensidadOriginal;

        },120);

    }

},7000);


/*===========================================================================
    MENSAJE FANTASMA
===========================================================================*/

setInterval(()=>{

    if(Math.random()<0.03){

        const fantasma=document.createElement("div");

        fantasma.className="mensaje-aleatorio";

        fantasma.textContent="ERROR-198";

        fantasma.style.left="50%";

        fantasma.style.top="50%";

        fantasma.style.transform=

            "translate(-50%,-50%) scale(3)";

        fantasma.style.color="#ffffff";

        fantasma.style.opacity=0;

        document.body.appendChild(fantasma);

        requestAnimationFrame(()=>{

            fantasma.style.opacity=.12;

        });

        setTimeout(()=>{

            fantasma.style.opacity=0;

            setTimeout(()=>{

                fantasma.remove();

            },400);

        },200);

    }

},20000);
/******************************************************************************
==============================================================================
                            DISTRITO ZERO
                            ERROR CODE 198

                            Teseracto.js
                            BLOQUE 7 / 7

    • Acabado
    • Optimización
    • Detalles visuales
    • Efectos finales
==============================================================================
******************************************************************************/

/*===========================================================================
    RESPIRACIÓN DEL MENSAJE PRINCIPAL
===========================================================================*/

setInterval(()=>{

    mensajeCentral.animate(

        [

            {

                transform:"translate(-50%,-50%) scale(1)"

            },

            {

                transform:"translate(-50%,-50%) scale(1.02)"

            },

            {

                transform:"translate(-50%,-50%) scale(1)"

            }

        ],

        {

            duration:3000,

            easing:"ease-in-out"

        }

    );

},3200);


/*===========================================================================
    PARPADEO MUY SUAVE DEL HALO
===========================================================================*/

setInterval(()=>{

    halo.material.opacity=

        0.12+

        Math.random()*0.08;

},1800);


/*===========================================================================
    CAMBIO ALEATORIO DE COLOR
===========================================================================*/

setInterval(()=>{

    if(Math.random()<0.08){

        materialExterior.color.offsetHSL(

            0.01,

            0,

            0

        );

        materialInterior.color.offsetHSL(

            -0.01,

            0,

            0

        );

    }

},12000);


/*===========================================================================
    DESTELLO DEL NÚCLEO
===========================================================================*/

setInterval(()=>{

    if(Math.random()<0.12){

        cuboNucleo.scale.set(

            1.35,

            1.35,

            1.35

        );

        setTimeout(()=>{

            cuboNucleo.scale.set(

                1,

                1,

                1

            );

        },180);

    }

},9000);


/*===========================================================================
    MICROVIBRACIÓN CONTINUA
===========================================================================*/

setInterval(()=>{

    teseracto.rotation.x +=

        (Math.random()-0.5)*0.002;

    teseracto.rotation.z +=

        (Math.random()-0.5)*0.002;

},80);


/*===========================================================================
    MENSAJE OCULTO EXTREMADAMENTE RARO
===========================================================================*/

setInterval(()=>{

    if(Math.random()<0.001){

        mensajeGigante(

            "TODO EMPEZÓ AQUÍ",

            "#ffffff"

        );

    }

},60000);


/*===========================================================================
    REORDENAR LAS ÓRBITAS
===========================================================================*/

setInterval(()=>{

    particulas.forEach((p)=>{

        p.userData.velocidad=

            0.002+

            Math.random()*0.007;

        p.userData.desfase=

            Math.random()*Math.PI*2;

    });

},25000);


/*===========================================================================
    CAMBIO DE INTENSIDAD GENERAL
===========================================================================*/

setInterval(()=>{

    const intensidad=

        0.8+

        Math.random()*0.4;

    renderer.toneMappingExposure=

        intensidad;

},7000);


/*===========================================================================
    EFECTO "LATIDO"
===========================================================================*/

setInterval(()=>{

    if(Math.random()<0.18){

        teseracto.scale.multiplyScalar(1.08);

        halo.scale.multiplyScalar(1.10);

        setTimeout(()=>{

            teseracto.scale.set(

                1,

                1,

                1

            );

            halo.scale.set(

                3.5,

                3.5,

                3.5

            );

        },180);

    }

},16000);


/*===========================================================================
    MENSAJE FINAL
===========================================================================*/

console.clear();

console.log(

`═══════════════════════════════════════════════

        DISTRITO ZERO

        ERROR CODE 198

        Acceso autorizado.

        Archivo recuperado correctamente.

        Estado:
        █ INESTABLE

═══════════════════════════════════════════════`

);
