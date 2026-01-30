import React from "react";
import Head from 'next/head'
import dynamic from "next/dynamic";
import { ProjectData } from "../../TypeScript/ProjectData";
import Footer from "../../Components/Footer";
import { dataType } from "../../lang/dataLang";
import { GetStaticPaths, GetStaticProps } from "next";
const Header = dynamic(() => import('../../Components/Header'), {ssr: false});
const ProjectPage = dynamic(() => import('../../Components/ProjectPage'), {ssr: false});

const projectsData: Array<ProjectData> = [
    {
        id: 'chess',
        name: 'Chess 3D',
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
        repoBack: 'https://github.com/AngelLunas/CHESS-3D-Backend',
        createdAt: new Date('2023-06-15'),
        getSlug: function() { return this.id.toLowerCase(); }
    },
    {
        id: 'slides',
        name: 'React slides',
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

interface PageProps {
    data: dataType;
    projectData: ProjectData;
}

const PageProject: React.FC<PageProps> = ({ data, projectData }) => {
    return (
        <>
        <Head>
            <title>{projectData.name}</title>
            <meta name="description" content={`Project: ${projectData.name}`} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header redirect={true} headerData={data.head}/>
        <ProjectPage projectData={projectData} projects={data.projectPage} />
        <Footer redirect={true} footerData={data.footer}/>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
    const paths = projectsData.flatMap((project) => {
        return locales!.map((locale) => ({
            params: { projectName: project.id },
            locale
        }));
    });

    return {
        paths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params, locale }) => {
    const response = await import(`../../lang/${locale}.json`);

    const projectId = params?.projectName as string;
    const projectData = projectsData.find((p) => p.id === projectId);

    if (!projectData) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            data: response.default,
            projectData
        }
    };
};

export default PageProject;
