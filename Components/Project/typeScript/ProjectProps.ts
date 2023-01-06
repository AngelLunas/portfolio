interface projectProps {
    name: string;
    imgUrl: string; 
    description: string, 
    demoUrl?: string,
    demo: boolean,
    refProject?: React.MutableRefObject<HTMLDivElement | null>,
    id: string
}

export type {
    projectProps
}