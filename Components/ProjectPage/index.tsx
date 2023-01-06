import React, { Suspense } from "react";
import { ProjectData } from "../../pages/proyecto/typescript/ProjectData";
import styles from '../../styles/ProjectPage.module.css';

const ProjectPage: React.FC<{projectData: ProjectData | null | undefined}> = ({projectData}) => {
    return (
        <>
        {projectData ? 
        <div className={styles.containerProject}>
            <span className={styles.title}>
                {projectData.name}
            </span>
            <div className={styles.playerContainer}>
                <iframe 
                    src={projectData.videoUrl}
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className={styles.player}
                >
                </iframe>
            </div>
            <div className={styles.descriptionContainer}>
                <div className={styles.dataDescription}>
                    <span className={styles.titleDes}>
                        Descripción
                    </span>
                    <p className={styles.textDes} >
                        {projectData.description}
                    </p>
                </div>
                <div className={styles.tecContainers}>
                    <span className={styles.titleTec}>
                        Tecnologías
                    </span>
                    <div className={styles.containerTec}>
                        {projectData.technologies.map((element, index) => {
                            return (
                                <span className={styles.textTec} key={index}>
                                    - {element}
                                </span>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className={styles.containerBtns}>
                { projectData.demo ?
                <a href={projectData.demo}>
                    <button type='button' className={styles.btnDemo}>
                        Demo
                    </button>
                </a>
                : null}
                { projectData.repoFront ?
                <a href={projectData.repoFront}>
                    <button type="button" className={styles.btnRepoF}>
                        Repositorio 
                    </button>
                </a>
                : null}
                { projectData.repoBack ?
                <a href={projectData.repoBack}>
                    <button type="button" className={styles.btnRepoB}>
                        Repositorio Backend
                    </button>
                </a>
                : null}
            </div>
        </div> 
        : 
        <div className={styles.notFound}>
            <span className={styles.textNot}>
                El proyecto no existe
            </span>
        </div>}
        </>
    )
}

export default ProjectPage;