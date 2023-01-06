interface ProjectData {
    id: string, 
    name: string,
    description: string, 
    videoUrl: string, 
    technologies: Array<string>,
    demo: string | null, 
    repoFront: string | null, 
    repoBack: string | null
}

export type {ProjectData};