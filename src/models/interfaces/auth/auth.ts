export interface IUserData {
    username: string;
    email: string;
    password: string;
}

export interface ILoginData {
    email: string;
    password: string;
}

export interface IUpdateData {
    idToken: string;
    displayName: string;
    photoUrl: string;
}

export interface ILocalStorageUserData {
    token: string;
    userId: string;
    displayName: string;
}