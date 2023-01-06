interface contextInterface {home: React.MutableRefObject<HTMLDivElement | null> | undefined, 
    about: React.MutableRefObject<HTMLDivElement | null> | undefined,
    contact: React.MutableRefObject<HTMLDivElement | null> | undefined,
    projects: React.MutableRefObject<HTMLDivElement | null> | undefined,
    homeSection: React.MutableRefObject<HTMLDivElement | null> | undefined, 
    projectsSection: React.MutableRefObject<HTMLDivElement | null> | undefined,
    aboutSection: React.MutableRefObject<HTMLDivElement | null> | undefined,
    containerSections: React.MutableRefObject<HTMLDivElement | null> | undefined,
    positionLine:  {
        width: number | undefined;
        left: number | undefined;
        init: boolean;
        option: string;
        set: boolean | undefined;
    },
    setPositionLine: React.Dispatch<React.SetStateAction<{
        width: number | undefined;
        left: number | undefined;
        init: boolean;
        option: string;
        set: boolean | undefined;
    }>>
}

export type {
    contextInterface
}