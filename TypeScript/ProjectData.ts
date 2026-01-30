interface ProjectData {
    id: string,
    name: string,
    videoUrl: string,
    technologies: Array<string>,
    demo: string | null,
    repoFront: string | null,
    repoBack: string | null,
    createdAt?: string
}

export type {ProjectData};