import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import settingsReducer from "./states/settings/reducer";

export const initStore = (initialState: any) => {
    return createStore(combineReducers({
        settings: settingsReducer
    }), {}, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
