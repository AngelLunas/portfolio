import React, { createContext, useRef, useState } from "react";
import { contextInterface } from "./typescript/context";

const DataContext = createContext<contextInterface>({
    home: undefined,
    about: undefined,
    contact: undefined,
    projects: undefined,
    homeSection: undefined,
    projectsSection: undefined,
    aboutSection: undefined,
    containerSections: undefined,
    positionLine: {
        width: undefined,
        left: undefined,
        init: false,
        option: "",
        set: undefined
    },
    setPositionLine: function (value: React.SetStateAction<{ width: number | undefined; left: number | undefined; init: boolean; option: string; set: boolean | undefined; }>): void {
        throw new Error("Function not implemented.");
    }
});

const WrapperContext: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [positionLine, setPositionLine] = useState<{
        width: number | undefined, 
        left: number | undefined, 
        init: boolean, 
        option: string, 
        set: boolean | undefined}>({width: 0, left: 0, init: false, option: 'home', set: false});
    const home = useRef<null | HTMLDivElement>(null);
    const about = useRef<null | HTMLDivElement>(null);
    const contact = useRef<null | HTMLDivElement>(null);
    const projects = useRef<null | HTMLDivElement>(null);
    const homeSection = useRef<HTMLDivElement | null>(null);
    const projectsSection = useRef<HTMLDivElement | null>(null);
    const aboutSection = useRef<HTMLDivElement | null>(null);
    const containerSections = useRef<HTMLDivElement | null>(null);

    return(
        <DataContext.Provider value={{
            home, 
            about,
            contact,
            projects,
            homeSection,
            projectsSection,
            aboutSection,
            containerSections,
            positionLine,
            setPositionLine
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default WrapperContext;
export {
    DataContext
}