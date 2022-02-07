export interface IAuthState {
    displayName: string | null;
    token: string | null;
    userId: string | null;
    error: string | null;
    loading: boolean;
}