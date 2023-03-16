function animationBtns (onBtns: {
    left: boolean;
    right: boolean;
}, 
btnLeftRef: React.MutableRefObject<HTMLImageElement | null>,
btnRightRef:  React.MutableRefObject<HTMLImageElement | null>,
tl: gsap.core.Timeline 
) {
    if (onBtns.left) {
        tl.to(btnLeftRef.current, {
            scale: 1.2, 
            duration: .4
        })
    } else {
        tl.to(btnLeftRef.current, {
            scale: 1, 
            duration: .4
        });
    };

    if (onBtns.right) {
        tl.to(btnRightRef.current, {
            scale: 1.2, 
            duration: .4
        });
    } else {
        tl.to(btnRightRef.current, {
            scale: 1, 
            duration: .4
        });
    }
}

function onClickNext (carouselRef: React.MutableRefObject<HTMLDivElement | null>, 
projectActive: number, 
projectWidth: number | undefined, 
setProjectActive: React.Dispatch<React.SetStateAction<number>>, 
setBLock: React.Dispatch<React.SetStateAction<boolean>>) {
   if (projectActive !== 5 && projectWidth !== undefined) {
    setBLock(true);
    setTimeout(() => {
        setBLock(false);
    }, 500);
    const left = projectWidth + 15;
    carouselRef.current?.scrollBy({
        left,
        behavior: 'smooth'
    });
    setProjectActive(projectActive + 1);
   }
}

function onClickPrev (carouselRef: React.MutableRefObject<HTMLDivElement | null>, 
projectActive: number, 
projectWidth: number | undefined, 
setProjectActive: React.Dispatch<React.SetStateAction<number>>,
setBLock: React.Dispatch<React.SetStateAction<boolean>>) {
   if (projectActive !== 1 && projectWidth !== undefined) {
    setBLock(true);
    setTimeout(() => {
        setBLock(false);
    }, 500);
    const left = -(projectWidth + 15);
    carouselRef.current?.scrollBy({
        left,
        behavior: 'smooth'
    });
    setProjectActive(projectActive - 1);
   }
}

export {
    onClickNext,
    onClickPrev,
    animationBtns
}