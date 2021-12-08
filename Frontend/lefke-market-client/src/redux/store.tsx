import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import settingsReducer, {settingsInitialState} from "./states/settings/reducer"
import catalogReducer, {catalogInitialState} from "./states/catalog/reducer"
import authReducer, {authInitialState} from "./states/auth/reducer"

// @ts-ignore
const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initStore = () => {
    return createStore(combineReducers({
        catalog: catalogReducer,
        settings: settingsReducer,
        auth: authReducer,
    }), {
        catalog: catalogInitialState,
        settings: settingsInitialState,
        auth: authInitialState,
    }, composeEnhancers(
        applyMiddleware(thunkMiddleware) )
    )
}

const store = initStore()

store.subscribe(() => console.log('store : ', store.getState()))

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppGetState = typeof store.getState
