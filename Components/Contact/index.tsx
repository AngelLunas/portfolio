import React, { useContext } from "react";
import Image from "next/image";
import styles from '../../styles/Contact.module.css';
import { motion } from 'framer-motion';
import { DataContext } from "../Context";
import { contactType } from "../../lang/dataLang";

const container = {
    initial: {
        x: -1000,
    },
    onScreen: {
        x: 0,  
        transition: {
            duration: 1,
        }
    }
}

const Contact: React.FC<{contactData: contactType}> = ({contactData}) => {
    const dataContext = useContext(DataContext);

    return(
        <motion.div className={styles.containerContact} ref={dataContext ? dataContext.contact : null} initial='initial' whileInView='onScreen' >
            <motion.div className={styles.contact} variants={container} >
                <div className={styles.contactContainer}>
                    <span className={styles.title}>
                        { contactData.titulo }
                    </span>
                    <div className={styles.containerData}>
                        <div className={styles.data}>
                            <Image src='/iconCall.png' alt='icon call' width={30} height={30} className={styles.img} />
                            <a href='https://api.whatsapp.com/send/?phone=573177148356' target='_blank' rel="noreferrer" className={styles.textData}>
                                +57 3177148356
                            </a>
                        </div>
                        <div className={styles.data}>
                            <Image src='/iconMail.png' alt='icon mail' width={30} height={30} className={styles.img} />
                            <a href="mailto:angellunadeveloper@gmail.com" className={styles.textData}>
                                angellunadeveloper@gmail.com
                            </a>
                        </div>
                    </div>
                    <div className={styles.containerMedia}>
                        <a href="https://github.com/AngelLunas" target='_blank' rel="noreferrer" className={styles.link} >
                            <Image src='/githubIcon.png' alt='github icon' width={35} height={35} />
                        </a>
                        <a rel="noreferrer" target='_blank' href='https://www.linkedin.com/in/angel-david-luna-ospina-29b15a23b/' className={styles.link} >
                            <Image src='/linkedinIcon.png' alt='linkedin icon' width={35} height={35} />
                        </a>
                        <a rel="noreferrer" target='_blank' href='https://www.upwork.com/freelancers/~014db4649586b17d8a' className={styles.link} >
                            <Image src='/upIcon.png' alt='upwork icon' width={35} height={35} />
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Contact;