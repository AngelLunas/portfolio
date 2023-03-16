import React, { Suspense, useEffect, useState } from "react";
import { ProjectData } from "../../TypeScript/ProjectData";
import styles from '../../styles/ProjectPage.module.css';
import { projectsType } from "../../lang/dataLang";

const ProjectPage: React.FC<{projectData: ProjectData | null | undefined, projects: any}> = ({projectData, projects}) => {
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (projectData?.id) {
            setDescription(projects[`${projectData.id}Description`]);
        }
    }, [projectData]);

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
                        { projects.title }
                    </span>
                    <p className={styles.textDes} >
                        { description }
                    </p>
                </div>
                <div className={styles.tecContainers}>
                    <span className={styles.titleTec}>
                        { projects.tecnologias }
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
                        { projects.repositorio } 
                    </button>
                </a>
                : null}
                { projectData.repoBack ?
                <a href={projectData.repoBack}>
                    <button type="button" className={styles.btnRepoB}>
                        { projects.repositorioBackend }
                    </button>
                </a>
                : null}
            </div>
        </div> 
        : 
        <div className={styles.notFound}>
            <span className={styles.textNot}>
                { projects.notFound }
            </span>
        </div>}
        </>
    )
}

export default ProjectPage;