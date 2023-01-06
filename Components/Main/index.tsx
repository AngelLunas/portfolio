import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap/dist/gsap";
import { navigateScroll } from "../Header/hooks";
import { motion } from 'framer-motion';
import styles from '../../styles/Main.module.css';
import { DataContext } from "../Context";

const title = {
    initial: {
        opacity: 0, 
        scale: 0,
        x: 40
    },
    onScreen: {
        opacity: 1, 
        scale: 1, 
        x: 0,
        transition: {
            duration: .7
        }
    }
};

const btnP = {
    initial: {
        opacity: 0, 
        scale: 0
    }, 
    onScreen: {
        opacity: 1, 
        scale: 1,
        transition: {
            duration: .7,
            delay: .7
        }
    }
};

const btnC = {
    initial: {
        opacity: 0,
        scale: 0
    },
    onScreen: {
        opacity: 1, 
        scale: 1, 
        transition: {
            duration: .7,
            delay: 1.4
        }
    }
}

const Main: React.FC = () => {
    const [onBtn, setOnBtn] = useState(false);
    const btnProject = useRef<HTMLButtonElement>(null);
    const tl = gsap.timeline();
    const dataContext = useContext(DataContext);

    useEffect(() => {
        if (onBtn) {
            tl.to(btnProject.current, {
                boxShadow: '10px 10px 0px 0px rgba(0, 0, 0, 0.61)',
                duration: .5
            });
        } else {
            tl.to(btnProject.current, {
                boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
                duration: .5
            });
        }
    }, [onBtn, tl]);


    return (
        <div className={styles.mainContainer}>
            <div className={styles.containerTitle}>
                <motion.h1 className={styles.title} variants={title} initial='initial' whileInView='onScreen'>
                    Soy Ángel Luna y soy desarrollador web front-end
                </motion.h1>
                <div className={styles.containerButtons}>
                    <motion.button ref={btnProject} 
                        className={styles.btnProjects} 
                        onMouseEnter={() => setOnBtn(true)} 
                        onMouseLeave={() => setOnBtn(false)} 
                        onClick={() => navigateScroll(dataContext, 'projects')}
                        variants={btnP}
                        initial='initial'
                        whileInView='onScreen'
                    >
                        Mira mis proyectos
                    </motion.button>
                    <motion.button className={styles.btnContact} onClick={() => navigateScroll(dataContext, 'contact')} variants={btnC} initial='initial' whileInView='onScreen' >
                        {'Contactame  >'}
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

export default Main;