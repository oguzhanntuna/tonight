import { useEffect, useRef, useState } from "react"

interface IUseClickOutsideReturnValue {
    ref: React.MutableRefObject<HTMLDivElement | null>;
    isClickedOutside: boolean;
}

export const useClickOutside = (): IUseClickOutsideReturnValue => {
    const [isClickedOutside, setIsClickedOutside] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement | null>(null);

    const handleClickOutside = (event: any) => {
        
        if (ref.current && !ref.current.contains(event.target)) {
            setIsClickedOutside(true);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, []);

    return { ref, isClickedOutside };
}