import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ReactPlayer from 'react-player/youtube';
import { projectProps } from './typeScript/ProjectProps';
import { gsap } from 'gsap';
import styles from '../../styles/Project.module.css';

const Project: React.FC<projectProps> = ({description, imgUrl, name, demo, demoUrl, refProject, id}) => {
    const [onBtn, setOnBtn] = useState(false);
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const tl = gsap.timeline();

    useEffect(() => {
        if (onBtn) {
            tl.to(btnRef.current, {
                boxShadow: '10px 10px 0px 0px rgba(0, 0, 0, 0.61)',
                duration: .5
            });
        } else {
            tl.to(btnRef.current, {
                boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
                duration: .5
            });
        }
    }, [onBtn, tl]);
    
    return(
        <div className={styles.containerProject} ref={refProject ? refProject : null}>
            <div className={styles.containerDescription}>
                <span className={styles.titleProject} >
                    {name}
                </span>
                <p className={styles.descriptionProject} >
                    {description}
                </p>
                <div className={styles.containerButtons}>
                    <Link href={`/proyecto/${id}`} className={styles.linkDemo} >
                        <button ref={btnRef} type='button' className={styles.btnDemo} onMouseEnter={() => setOnBtn(true)} onMouseLeave={() => setOnBtn(false)}>
                            Ver más
                        </button>
                    </Link>
                    {demo ? 
                    <button type='button' className={styles.btnSite}>
                        <a href={demoUrl} target='_blank' rel="noreferrer" className={styles.redSite}>
                            Demo
                        </a>
                    </button> 
                    : null}
                </div>
            </div>
            <div className={styles.containerImg}>
                <Image src={imgUrl} width={1365} height={648} alt={name} style={{objectFit: 'contain', width: '100%', height: '100%'}}/>
            </div>
        </div>
    )
}

export default Project;