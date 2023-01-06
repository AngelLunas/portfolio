import React from "react";
import Image from 'next/image';
import styles from '../../styles/Skill.module.css';
import { motion } from "framer-motion";

const container = { offScreen: { opacity: 0, scale: 0 }, onScreen: { opacity: 1, scale: 1, transition: {duration: .5} } };

const SkillImg: React.FC<{imgUrl: string, alt: string}> = ({imgUrl, alt}) => {
    return(
        <motion.div className={styles.containerSkill} variants={container}>
            <Image src={imgUrl} alt={alt} className='img-skill' height={512} width={512} style={{objectFit: 'contain'}} title={alt}/>
        </motion.div>
    )
}

export default SkillImg;