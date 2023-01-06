import React, { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from '../../styles/Footer.module.css';
import { DataContext } from "../Context";
import { handleRedirect } from "../Header/hooks";

const Footer: React.FC<{redirect: boolean}> = ({redirect}) => {
    const dataContext = useContext(DataContext);
    const router = useRouter();

    return(
        <div className={styles.footer}>
            <div className={styles.containerFooter}>
                <div className={styles.navFooter}>
                    <span className={styles.title}>
                        Angel Developer
                    </span>
                    <div className={styles.containerNav}>
                        <div className={styles.column}>
                            <span className={styles.text} onClick={() => handleRedirect('home', redirect, dataContext, router)}>
                                Inicio
                            </span>
                            <span className={styles.text} onClick={() => handleRedirect('about', redirect, dataContext, router)}>
                                Acerca de mí
                            </span>
                        </div>
                        <div className={styles.column}>
                            <span className={styles.text} onClick={() => handleRedirect('projects', redirect, dataContext, router)}>
                                Proyectos
                            </span>
                            <span className={styles.text} onClick={() => handleRedirect('contact', redirect, dataContext, router)}>
                                Contacto
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.contact}>
                    <div className={styles.media}>
                        <a href="https://github.com/AngelLunas" target='_blank' rel="noreferrer" className={styles.link} >
                            <Image src='/githubGray.png' alt='github icon' width={30} height={30} />
                        </a>
                        <a rel="noreferrer" target='_blank' href='https://www.linkedin.com/in/angel-david-luna-ospina-29b15a23b/' className={styles.link} >
                            <Image src='/linkGrey.png' alt='linkedin icon' width={30} height={30} />
                        </a>
                        <a rel="noreferrer" target='_blank' href='https://www.upwork.com/freelancers/~014db4649586b17d8a' className={styles.link} >
                            <Image src='/upGrey.png' alt='upwork icon' width={30} height={30} />
                        </a>
                    </div>
                    <div className={styles.dataContact}>
                        <span className={styles.contactText}>
                            Contáctame en:
                        </span>
                        <div className={styles.rowsContainerContact}>
                            <div className={styles.rowContact}>
                                <Image src='/callIcon.png' alt='icon call' width={20} height={20}/>
                                <a className={styles.dataText} href='https://api.whatsapp.com/send/?phone=573177148356' target='_blank' rel="noreferrer" >
                                    +57 3177148356
                                </a>
                            </div>
                            <div className={styles.rowContact}>
                                <Image src='/mailIcon.png' alt='icon mail' width={20} height={20}/>
                                <a className={styles.dataText} href="mailto:angellunadeveloper@gmail.com" >
                                    angellunadeveloper@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;