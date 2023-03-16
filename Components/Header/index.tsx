import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { DataContext } from "../Context";
import { gsap } from "gsap";
import { navigateScroll, navResponsive } from "./hooks";
import { useCycle } from "framer-motion";
import { head } from "../../lang/dataLang";
import styles from '../../styles/Header.module.css';

const Header: React.FC<{redirect: boolean, headerData: head}> = ({redirect, headerData}) => {
    const line = useRef(null);
    const tl = gsap.timeline();
    const refsContext = useContext(DataContext);
    const { aboutSection, containerSections, homeSection, positionLine, setPositionLine, projectsSection } = refsContext;
    const section = useRef('home');
    const headerActive = useRef('');
    const [headerActiveState, setHeaderActiveState] = useState('');
    const [isOpen, toggleOpen] = useCycle(false, true);
    const router = useRouter();

    useEffect(() => {
        if (headerActiveState === 'desktop') {
            if (positionLine.init === false) {
                tl.to(line.current, {
                    duration: positionLine.set ? 0 : .5, 
                    left: positionLine.left,
                    width: homeSection?.current?.clientWidth,
    
                });  
            } else {
                tl.to(line.current, {
                    duration: positionLine.set ? 0 : .5, 
                    left: positionLine.left,
                    width: positionLine.width
                }); 
            }
        }
    }, [positionLine, tl]);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const heightHeader = (10 * window.innerHeight) / 100;
        if (refsContext.about?.current && refsContext.projects?.current && refsContext.contact?.current) {
            if (scrollY >= 0 && scrollY < (refsContext.about.current.offsetTop - heightHeader)) {
                if (section.current !== 'home') {
                    section.current = 'home';
                    setPositionLine({width: homeSection?.current?.clientWidth, left: 0, init: true, option: 'home', set: false});
                }
            } else if (scrollY >= (refsContext.about.current.offsetTop - heightHeader) && scrollY < (refsContext.projects.current.offsetTop - heightHeader)) {
                if (section.current !== 'about') {
                    section.current = 'about';
                    let marginPercent = 0;
                    if (containerSections && containerSections.current) {
                        marginPercent = (15 * containerSections.current.clientWidth) / 100;
                    }
                    if (homeSection && homeSection.current && aboutSection?.current) {
                        const left = homeSection.current.clientWidth + marginPercent;
                        setPositionLine({width: aboutSection.current.clientWidth, left: left, init: true, option: 'about', set: false}); 
                    }
                }
            } else if (scrollY >= (refsContext.projects.current.offsetTop - heightHeader) && scrollY < (refsContext.contact.current.offsetTop - heightHeader)) {
                let marginPercent = 0;
                if (containerSections && containerSections.current) {
                    marginPercent = (15 * containerSections.current.clientWidth) / 100;
                }
                if (section.current !== 'projects') {
                    section.current = 'projects';
                    let left = 0;
                    if (homeSection && projectsSection && aboutSection && homeSection.current && projectsSection.current && aboutSection.current) {
                        left = homeSection.current.clientWidth + aboutSection.current.clientWidth + marginPercent + marginPercent;
                    }
                    setPositionLine({width: projectsSection?.current?.clientWidth, left, init: true, option: 'projects', set: false});
                }
            } else if (scrollY >= (refsContext.contact.current.offsetTop - heightHeader)) {
                if (section.current !== 'contact') {
                    section.current = 'contact';
                    setPositionLine({width: 0, left: 0, init: true, option: 'contact', set: false});
                }
            }
        }
    };

    const handleResponsive = () => {
        if (window.innerWidth <= 600) {
            if (headerActive.current !== 'mobile') {
                headerActive.current = 'mobile';
                setHeaderActiveState('mobile');
            }
        } else {
            if (headerActive.current !== 'desktop') {
                headerActive.current = 'desktop';
                setHeaderActiveState('desktop');
            }
        }
    }


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        if (redirect === false) {
            const itemRedirect = window.localStorage.getItem('redirect');
            if (typeof itemRedirect === 'string') {
                setTimeout(() => {
                    navigateScroll(refsContext, itemRedirect);
                }, 300);
                window.localStorage.removeItem('redirect');
            }
        };
        window.addEventListener('resize', handleResponsive);

        if (window.innerWidth <= 600) {
            setHeaderActiveState('mobile')
        } else {
            setHeaderActiveState('desktop');
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResponsive);
        }
    }, []);


    return (
        <div className={styles.containerHeader}>
            <div className={styles.containerElements}>
                <div>
                    <span className={styles.title}>
                        Angel Developer
                    </span>
                </div>
                { navResponsive(headerActiveState, styles, line, containerSections, homeSection, aboutSection, projectsSection, redirect, refsContext, router, toggleOpen, isOpen, headerData) }
            </div>
        </div>
    );
}

export default Header;