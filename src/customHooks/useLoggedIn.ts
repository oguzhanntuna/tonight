import { useEffect, useState } from 'react';
import { useSelector } from "react-redux"

import { IApplicationState } from '../models/interfaces/store/states/application';

export const useLoggedIn = () => {
    const token = useSelector((state: IApplicationState) => state.auth.token);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [token]);

    return isLoggedIn;
}