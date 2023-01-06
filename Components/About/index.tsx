import React, { useContext,  } from "react";
import SkillImg from "../Skill";
import styles from '../../styles/About.module.css';
import { motion } from "framer-motion";
import { DataContext } from "../Context";

const About: React.FC = () => {
    const dataContext = useContext(DataContext);
    return (
        <div className={styles.containerAbout} ref={dataContext ? dataContext.about : null}>
            <div className={styles.textAbout}>
                <div className={styles.containerTitle}>
                    <span className={styles.aboutTitle}>
                        Acerca de mí 
                    </span>
                </div>
                <p className={styles.about}>
                    Mi nombre es Ángel David Luna y soy desarrollador web front-end freelancer. 
                    Vivo en Colombia y soy estudiante de ingeniería de sistemas en 
                    la universidad Tecnológica de Pereira. He trabajado en múltiples proyectos
                    como desarrollador web front-end con tecnologías JavaScript, en las cuales me desenvuelvo bien. 
                    Desde que era niño estuve rodeado por tecnología, lo que creo en mí una pasión por el aprendizaje 
                    tecnológico y posteriormente un amor por la programación.
                </p>
                <div className={styles.containerSkills} >
                    <span className={styles.titleSkills} >
                        Mis habilidades:
                    </span>
                    <motion.div className={styles.imgsSkills} initial='offScreen' whileInView='onScreen' transition={{staggerChildren: .1}} >
                        <SkillImg imgUrl='/tsLogo.png' alt='TypeScript'/>
                        <SkillImg imgUrl='/reactLogo.png' alt='React' />
                        <SkillImg imgUrl='/nodeLogo.png' alt='Node js'/>
                        <SkillImg imgUrl='/sassLogo.png' alt='Sass'/>
                        <SkillImg imgUrl='/htmlLogo.png' alt='HTML'/>
                        <SkillImg imgUrl='/cssLogo.png' alt='CSS'/>
                        <SkillImg imgUrl='/jsLogo.png' alt='JavaScript'/>
                        <SkillImg imgUrl='/threeLogo.png' alt='Three js'/>
                        <SkillImg imgUrl='/nextLogo.png' alt='Next Js'/>
                        <SkillImg imgUrl='/mongoLogo.png' alt='MongoDb'/>
                    </motion.div>
                </div>
            </div>
        </div>  
    )
}

export default About