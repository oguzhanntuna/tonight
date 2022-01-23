import { useEffect } from "react";

export const useScrollToTop = (): void => {

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0 });
    }, []);
}