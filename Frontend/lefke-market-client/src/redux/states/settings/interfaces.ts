export interface ISettings {
    screenType: number,
    isAuthModalOpen: boolean,
    isCartModalOpen: boolean,
}

export interface ISettingsAction {
    type: string,
    payload: any
}
