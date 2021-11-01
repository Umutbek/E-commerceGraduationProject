import {combineReducers} from "redux"
import authReducer from "./authReducer"
import settingsReducer from "./settingsReducer"
import {firebaseReducer} from "react-redux-firebase"
import {firestoreReducer} from "redux-firestore"

export default combineReducers({
  settings: settingsReducer,
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})
