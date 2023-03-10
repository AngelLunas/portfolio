import React, { useEffect, useState } from "react";
import Head from 'next/head'
import dynamic from "next/dynamic";
import { ProjectData } from "../../TypeScript/ProjectData";
import { useRouter } from "next/router";
import Footer from "../../Components/Footer";
const Header = dynamic(() => import('../../Components/Header'), {ssr: false});
const ProjectPage = dynamic(() => import('../../Components/ProjectPage'), {ssr: false});

const projectsData: Array<ProjectData> = [
    {
        id: 'chess',
        name: 'Chess 3D',
        description: `Chess 3D es un ajedrez 3D multijugador online. Puedes jugar desde la aplicación web con otro jugador random, crear una sala para jugar con un amigo o unirte a una sala privada. El ajedrez está
        desarrollado con React y Three js para la escena 3D, las animaciones están hechas con gsap y utilicé React Three fiber. El backend para el juego multijugador está desarrollado con Express, 
        un framework de Node Js y para la conexión en tiempo real entre jugadores utilicé Socket io. Chess 3D se adapta a ordenadores y celulares debido a su diseño responsivo.`,
        videoUrl: 'https://www.youtube.com/embed/fwLYmb2fUuo',
        technologies: [
            'React',
            'React three fiber',
            'Three js',
            'gsap',
            'express',
            'socket io'
        ],
        demo: 'https://chess3dloop.netlify.app/',
        repoFront: 'https://github.com/AngelLunas/CHESS-3D',
        repoBack: 'https://github.com/AngelLunas/CHESS-3D-Backend'

    },
    {
        id: 'slides',
        name: 'React slides',
        description: `React Slides es un sitio web con aspecto de diapositivas de carácter informativo y visual, cada vista del sitio presenta animaciones. Desarrollé este sitio con React, TypeScript, Webpack y Sass, las
        animaciones están hechas con gsap. Cada vista hace parte de un componente principal carrusel. El sitio presenta animaciones al entrar a una nueva vista, al pasar a la siguiente y al regresar a la anterior.`,
        videoUrl: 'https://www.youtube.com/embed/HR2WOiSV7Kg',
        technologies: [
            'React',
            'TypeScript',
            'gsap',
            'Sass',
            'Webpack'
        ],
        demo: 'https://react-slides-animation.netlify.app/',
        repoFront: 'https://github.com/AngelLunas/react-slides-test',
        repoBack: null, 
    },
    {
        id: 'cricket',
        name: 'Trajectory viewer Cricket',
        description: `Sitio web donde se puede visualizar la trayectoría de una bola de cricket animada, existen 3 tipo de vistas y se puede visualizar la trayectoria de multiples bolas simultáneamente o una 
        seguida de otra. Los datos para animar la trayectoría son interpretados a partir de un archivo json. El sitio lo desarrollé con Three Js para el escenario 3D, Webpack como empaquetador y las animaciones de la cámara
        están desarrolladas con gsap.`,
        videoUrl: 'https://www.youtube.com/embed/dVygNPPhCYk',
        technologies: [
            'Three js',
            'Webpack'
        ],
        demo: null, 
        repoFront: null, 
        repoBack: null
    },
    {
        id: 'movies',
        name: 'Movies carousel',
        description: 'Website que consiste de dos carruseles, donde se pueden visualizar información acerca de las peliculas y filtrar a partir de su fecha de lanzamiento, este website ha sido desarrollado con React, se adapta perfectamente a dispositivos móviles',
        videoUrl: 'https://www.youtube.com/embed/83R6EYKAq9Y',
        technologies: [
            'React',
            'Html',
            'Css'
        ],
        demo: 'https://movies-carousel.vercel.app/',
        repoFront: 'https://github.com/AngelLunas/movies-carousel',
        repoBack: null
    },
    {
        id: 'ecommerce',
        name: 'Fast buy ecommerce',
        description: 'Este website fue desarrollado con Next js, como parte de una prueba técnica, posee un carrusel con productos que se puede dividir por categorías, un carrito con resumen de orden donde se puede realizar la compra y un panel para visualizar mis pedidos y su estado. Para los administradores existe una sección donde se pueden ver todas las ordenes y cambiar su estado. Se adapta a todos los dispositivos.',
        videoUrl: 'https://www.youtube.com/embed/r7s3kYBDGqg',
        technologies: [
            'React',
            'Next js',
            'MongoDB'
        ],
        demo: 'https://ecommerce-fast.vercel.app/',
        repoFront: 'https://github.com/AngelLunas/ecommerce-fast',
        repoBack: null
    }
];

const PageProject: React.FC = () => {
    const router = useRouter();
    const project = router.query.projectName;
    const [projectData, setProjectData] = useState<null | ProjectData | undefined>(null);

    useEffect(() => {
        if (project !== undefined) {
            const projectDataArr = projectsData.find((element) => element.id === project);
            setProjectData(projectDataArr);
        }
    }, [project]);

    return (
        <>
        <Head>
            <title>{projectData ? projectData.name : 'Proyecto no encontrado'}</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header redirect={true} />
        <ProjectPage projectData={projectData} />
        <Footer redirect={true} />
        </>
    )
}

export default PageProject;