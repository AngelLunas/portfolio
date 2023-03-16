interface head {
    inicio: string,
    acerca: string,
    proyectos: string,
    contacto: string
}

interface mainType {
    descripcion: string,
    proyectos: string,
    contacto: string
}

interface aboutType {
    acerca: string, 
    descripcion: string,
    habilidades: string
}

interface projectType {
    titulo: string, 
    ver: string,
    chessDescription: string,
    slidesDescription: string,
    cricketDescription: string,
    moviesDescription: string,
    ecommerceDescription: string
}

interface contactType {
    titulo: string
}

interface footerType {
    inicio: string,
    proyectos: string,
    acerca: string,
    contacto: string,
    title: string
}

interface projectsType {
    title: string,
    tecnologias: string,
    repositorio: string,
    repositorioBackend: string,
    chessDescription: string,
    slidesDescription: string,
    cricketDescription: string,
    moviesDescription: string,
    ecommerceDescription: string,
    notFound: string
}

interface dataType {
    head: head,
    main: mainType,
    about: aboutType,
    projects: projectType,
    contact: contactType,
    footer: footerType,
    projectPage: projectsType
}

export type {
    head,
    mainType,
    aboutType,
    projectType,
    contactType,
    footerType,
    dataType,
    projectsType
}