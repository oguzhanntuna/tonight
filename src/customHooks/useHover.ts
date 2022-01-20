import { useState, useEffect, useRef } from 'react';

export const useHover = (): [React.MutableRefObject<HTMLDivElement | null>, boolean] => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [hovered, setHovered] = useState<boolean>(false);
    
    const enter = (): void => setHovered(true);
    const leave = (): void => setHovered(false);

    useEffect(() => {
        const elementRef = ref.current;

        if (elementRef) {

            elementRef.addEventListener('mouseenter', () => enter());
            elementRef.addEventListener('mouseleave', () => leave());

            return () => {
                console.log('cleanup');

                elementRef.removeEventListener('mouseenter', () => enter());
                elementRef.removeEventListener('mouseleave', () => leave());
            }
        }
    }, []);

    return [ref, hovered];
}