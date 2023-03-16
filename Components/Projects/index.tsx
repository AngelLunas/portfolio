import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Project from "../Project";
import { gsap } from "gsap";
import { animationBtns, onClickNext, onClickPrev } from "./hooks";
import styles from '../../styles/Projects.module.css';
import { DataContext } from "../Context";
import { projectType } from "../../lang/dataLang";

const Projects: React.FC<{projectsData: projectType}> = ({ projectsData }) => {
    const [onBtns, setOnBtns] = useState({left: false, right: false});
    const [projectActive, setProjectActive] = useState(1);
    const [block, setBlock] = useState(false);
    const btnLeftRef = useRef<HTMLImageElement | null>(null);
    const btnRightRef = useRef<HTMLImageElement | null>(null);
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const projectRef = useRef<HTMLDivElement | null>(null);
    const tl = gsap.timeline();
    const dataContext = useContext(DataContext);

    useEffect(() => {
        animationBtns(onBtns, btnLeftRef, btnRightRef, tl);
    }, [onBtns, tl]);


    return(
       <div className={styles.containerProjects} ref={dataContext ? dataContext.projects : null} >
            <span className={styles.title}>
                { projectsData.titulo }
            </span>
            <div className={styles.containerCarousel}>
                <div className={styles.containerIcon} 
                    onClick={() => block === false ? onClickPrev(carouselRef, projectActive, projectRef.current?.clientWidth, setProjectActive, setBlock) : null} 
                    style={projectActive === 1 ? {cursor: 'not-allowed'} : {cursor: 'pointer'}}
                >
                    <Image src='/leftIcon.svg' 
                        alt='left icon'
                        className={styles.iconBtn} 
                        height={50} 
                        width={50} 
                        ref={btnLeftRef} 
                        onMouseEnter={() => setOnBtns((prev) => ({...prev, left: true}))} 
                        onMouseLeave={() => setOnBtns((prev) => ({...prev, left: false}))}
                    />
                </div>
                <div className={styles.carouselProjects} ref={carouselRef} >
                    <div className={styles.carousel}>
                        <Project name='Chess 3D' 
                            demo 
                            description={projectsData.chessDescription} 
                            imgUrl='/Chess3D.png' 
                            demoUrl="https://chess3dloop.netlify.app/" 
                            refProject={projectRef} 
                            id='chess'
                            ver={projectsData.ver}
                        />
                        <Project name='React Slides' 
                            demo 
                            description={projectsData.slidesDescription} 
                            imgUrl='/reactSlides.png' 
                            demoUrl='https://react-slides-animation.netlify.app/'
                            id='slides'
                            ver={projectsData.ver}
                        />
                        <Project name='Cricket Trajectory Viewer' 
                            demo={false} 
                            description={projectsData.cricketDescription} 
                            imgUrl='/cricket.png' 
                            id='cricket'
                            ver={projectsData.ver}
                        />
                        <Project name='Movies carousel'
                            demo
                            demoUrl="https://movies-carousel.vercel.app/"
                            description={projectsData.moviesDescription}
                            imgUrl="/movies.png"
                            id='movies'
                            ver={projectsData.ver}
                        />
                        <Project name='Fast buy ecommerce'
                            demo
                            demoUrl="https://ecommerce-fast.vercel.app/"
                            description={projectsData.ecommerceDescription}
                            imgUrl="/ecommerce.png"
                            id='ecommerce'
                            ver={projectsData.ver}
                        />
                    </div>
                </div>
                <div className={styles.containerIcon} 
                    onClick={() => block === false ? onClickNext(carouselRef, projectActive, projectRef.current?.clientWidth, setProjectActive, setBlock) : null}
                    style={projectActive === 5 ? {cursor: 'not-allowed'} : {cursor: 'pointer'}}
                >
                    <Image src='/rightIcon.svg' 
                        alt='left icon' 
                        className={styles.iconBtn}
                        height={50} 
                        width={50} 
                        ref={btnRightRef} 
                        onMouseEnter={() => setOnBtns((prev) => ({...prev, right: true}))} 
                        onMouseLeave={() => setOnBtns((prev) => ({...prev, right: false}))}/>
                </div>
            </div>
        </div>
    )
} 

export default Projects