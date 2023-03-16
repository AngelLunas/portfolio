import { contextInterface } from "../../Context/typescript/context";
import { NextRouter } from "next/router";
import { motion, animate } from "framer-motion";
import Image from "next/image";
import MenuToggle from "../../ButtonToggle";
import { head } from "../../../lang/dataLang";

const containerNav = {
    initial: {
        top: 0, 
        left: '-100%', 
        width: '40vw', 
        height: '100vh'
    },
    onScreen: {
        left: 0,
        top: 0,
        width: '40vw',
        height: '100vh',
        transition: {
            duration: .5
        }
    }
}

const menuTexts = {
    initial: {
        opacity: 0
    }, 
    onScreen: {
        opacity: 1, 
        transition: {
            duration: .3
        }
    }
}

function navigateScroll (refs: contextInterface,
option: string,
) {
    const heightHeader = (10 * window.innerHeight) / 100;
    switch (option) {
        case 'home': 
            if (refs && refs.contact && refs.contact.current) {
                window.scrollTo(0, 0);
            };
            break
        case 'projects': 
            if (refs && refs.projects && refs.projects.current) {
                window.scrollTo(0, refs.projects.current.offsetTop - heightHeader + 3);
            };
            break
        case 'about': 
            if (refs && refs.about && refs.about.current) {
                window.scrollTo(0, refs.about.current.offsetTop - heightHeader + 3);
            }
            break
        case 'contact':
            if (refs && refs.contact && refs.contact.current) {
                window.scrollTo(0, refs.contact.current.offsetTop - heightHeader + 3);
            }
            break
    }
}

function handleRedirect (option: string, redirect: boolean, refsContext: contextInterface, router: NextRouter) {
    if (redirect) {
        window.localStorage.setItem('redirect', option);
        router.push('/');
    } else {    
        navigateScroll(refsContext, option);
    }
}

function navResponsive (headerActive: string,
styles: {
    readonly [key: string]: string;
},
line: React.MutableRefObject<null>,
containerSections: React.MutableRefObject<HTMLDivElement | null> | undefined,
homeSection: React.MutableRefObject<HTMLDivElement | null> | undefined, 
aboutSection: React.MutableRefObject<HTMLDivElement | null> | undefined,
projectsSection: React.MutableRefObject<HTMLDivElement | null> | undefined, 
redirect: boolean, 
refsContext: contextInterface, 
router: NextRouter,
toggleOpen: () => void,
isOpen: boolean,
headerData: head
) {
    if (headerActive === 'desktop') {
        return (
            <>
            <div className={styles.subContainerSections}>
                    <div ref={line} className={styles.lineSection}>
                    </div>
                    <div ref={containerSections} className={styles.containerSections}>
                        <div ref={homeSection} className={styles.sections} onClick={() => handleRedirect('home', redirect, refsContext, router)}>
                            <span className={styles.text}>
                                { headerData.inicio }
                            </span>
                        </div>
                        <div ref={aboutSection} className={styles.sections} onClick={() => handleRedirect('about', redirect, refsContext, router)}>
                            <span className={styles.text}>
                                { headerData.acerca }
                            </span>
                        </div>
                        <div ref={projectsSection} className={styles.sections} onClick={() => handleRedirect('projects', redirect, refsContext, router)}>
                            <span className={styles.text}>
                                { headerData.proyectos }
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.containerButton}>
                    <button className={styles.buttonContact} onClick={() => handleRedirect('contact', redirect, refsContext, router)}>
                        <div className={styles.shadowButton}>
                            <span className={styles.textContact}>
                                { headerData.contacto }
                            </span>
                        </div>
                    </button>
                </div>
            </>
        )
    } else if (headerActive === 'mobile') {
        return (
            <>
            <motion.div animate={isOpen ? "open" : "closed"} className={styles.btnNav} onClick={() => toggleOpen()}>
                <MenuToggle />
            </motion.div>
            <motion.div className={styles.navMobile} 
                variants={containerNav}
                animate={isOpen ? 'onScreen' : 'initial'}
            >
                <motion.div className={styles.navMobileContainer} animate={isOpen ? 'onScreen' : 'initial'} transition={{staggerChildren: .3, delay: .5}}>
                    <motion.span className={styles.titleMobile} variants={menuTexts}>
                        Angel Developer
                    </motion.span>
                    <div className={styles.columnNav}>
                        <motion.span className={styles.textMobile} variants={menuTexts} onClick={() => {toggleOpen(); handleRedirect('home', redirect, refsContext, router)}}>
                            { headerData.inicio }
                        </motion.span>
                        <motion.span className={styles.textMobile} variants={menuTexts} onClick={() => {toggleOpen(); handleRedirect('about', redirect, refsContext, router)}}>
                            { headerData.acerca }
                        </motion.span>
                        <motion.span className={styles.textMobile} variants={menuTexts} onClick={() => {toggleOpen(); handleRedirect('projects', redirect, refsContext, router)}}>
                            { headerData.proyectos }
                        </motion.span>
                        <motion.button className={styles.btnContactNav} variants={menuTexts} onClick={() => {toggleOpen(); handleRedirect('contact', redirect, refsContext, router)}}>
                            { headerData.contacto }
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
            </>
        )
    }
}

export {
    navigateScroll,
    handleRedirect,
    navResponsive
}