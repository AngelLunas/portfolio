import React, { useContext,  } from "react";
import SkillImg from "../Skill";
import styles from '../../styles/About.module.css';
import { motion } from "framer-motion";
import { DataContext } from "../Context";
import { aboutType } from "../../lang/dataLang";

const About: React.FC<{aboutData: aboutType}> = ({ aboutData }) => {
    const dataContext = useContext(DataContext);
    return (
        <div className={styles.containerAbout} ref={dataContext ? dataContext.about : null}>
            <div className={styles.textAbout}>
                <div className={styles.containerTitle}>
                    <span className={styles.aboutTitle}>
                        { aboutData.acerca }
                    </span>
                </div>
                <p className={styles.about}>
                    { aboutData.descripcion }
                </p>
                <div className={styles.containerSkills} >
                    <span className={styles.titleSkills} >
                        { aboutData.habilidades }
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