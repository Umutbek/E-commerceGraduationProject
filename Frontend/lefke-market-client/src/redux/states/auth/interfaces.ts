export interface IAuthAction {
    type: string,
    payload: any
}

export interface IAuth {
    isAuth: boolean,
    token: string | null,
    user: object | null,
    isAuthLoading: boolean,
    isLoginLoading: boolean,
}
