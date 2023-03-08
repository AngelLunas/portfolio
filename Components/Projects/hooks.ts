const chessDescription = 
`Chess 3D es un ajedrez 3D multijugador online. Puedes jugar desde la aplicación web con otro jugador random, crear una sala para jugar con un amigo o unirte a una sala privada. El ajedrez está
desarrollado con React y Three js para la escena 3D, las animaciones están hechas con gsap y utilicé React Three fiber. El backend para el juego multijugador está desarrollado con Express, 
un framework de Node Js y para la conexión en tiempo real entre jugadores utilicé Socket io. Chess 3D se adapta a ordenadores y celulares debido a su diseño responsivo.`;

const slidesDescription = 
`React Slides es un sitio web con aspecto de diapositivas de carácter informativo y visual, cada vista del sitio presenta animaciones. Desarrollé este sitio con React, TypeScript, Webpack y Sass, las
animaciones están hechas con gsap. Cada vista hace parte de un componente principal carrusel. El sitio presenta animaciones al entrar a una nueva vista, al pasar a la siguiente y al regresar a la anterior.`;

const cricketDescription = 
`Sitio web donde se puede visualizar la trayectoría de una bola de cricket animada, existen 3 tipo de vistas y se puede visualizar la trayectoria de multiples bolas simultáneamente o una 
seguida de otra. Los datos para animar la trayectoría son interpretados a partir de un archivo json. El sitio lo desarrollé con Three Js para el escenario 3D, Webpack como empaquetador y las animaciones de la cámara
están desarrolladas con gsap.`;

const moviesDescription =
`Website que consiste de dos carruseles, donde se pueden visualizar información acerca de las peliculas y filtrar a partir de su fecha de lanzamiento, este website ha sido desarrollado con
React, se adapta perfectamente a dispositivos móviles`;

const ecommerceDescription = 
`Este website fue desarrollado con Next js, como parte de una prueba técnica, posee un carrusel con productos que se puede dividir por categorías, un carrito con resumen de orden donde se puede realizar la compra y un panel para visualizar mis pedidos y su estado. Para los administradores existe una sección donde se pueden ver todas las ordenes y cambiar su estado. Se adapta a todos los dispositivos.`;

function animationBtns (onBtns: {
    left: boolean;
    right: boolean;
}, 
btnLeftRef: React.MutableRefObject<HTMLImageElement | null>,
btnRightRef:  React.MutableRefObject<HTMLImageElement | null>,
tl: gsap.core.Timeline 
) {
    if (onBtns.left) {
        tl.to(btnLeftRef.current, {
            scale: 1.2, 
            duration: .4
        })
    } else {
        tl.to(btnLeftRef.current, {
            scale: 1, 
            duration: .4
        });
    };

    if (onBtns.right) {
        tl.to(btnRightRef.current, {
            scale: 1.2, 
            duration: .4
        });
    } else {
        tl.to(btnRightRef.current, {
            scale: 1, 
            duration: .4
        });
    }
}

function onClickNext (carouselRef: React.MutableRefObject<HTMLDivElement | null>, 
projectActive: number, 
projectWidth: number | undefined, 
setProjectActive: React.Dispatch<React.SetStateAction<number>>, 
setBLock: React.Dispatch<React.SetStateAction<boolean>>) {
   if (projectActive !== 3 && projectWidth !== undefined) {
    setBLock(true);
    setTimeout(() => {
        setBLock(false);
    }, 500);
    const left = projectWidth + 15;
    carouselRef.current?.scrollBy({
        left,
        behavior: 'smooth'
    });
    setProjectActive(projectActive + 1);
   }
}

function onClickPrev (carouselRef: React.MutableRefObject<HTMLDivElement | null>, 
projectActive: number, 
projectWidth: number | undefined, 
setProjectActive: React.Dispatch<React.SetStateAction<number>>,
setBLock: React.Dispatch<React.SetStateAction<boolean>>) {
   if (projectActive !== 1 && projectWidth !== undefined) {
    setBLock(true);
    setTimeout(() => {
        setBLock(false);
    }, 500);
    const left = -(projectWidth + 15);
    carouselRef.current?.scrollBy({
        left,
        behavior: 'smooth'
    });
    setProjectActive(projectActive - 1);
   }
}

export {
    chessDescription, 
    slidesDescription, 
    cricketDescription,
    moviesDescription,
    ecommerceDescription,
    onClickNext,
    onClickPrev,
    animationBtns
}