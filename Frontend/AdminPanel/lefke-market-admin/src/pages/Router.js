import React, {Suspense, lazy} from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import WithBgSpinner from "../components/spinners/WithBgSpinner"

const LoginPage = lazy(() => import('./auth/LoginPage'))

export default function Router(){
  return (
    <Suspense fallback={<WithBgSpinner/>}>
      <Switch>
        <Route exact path="/auth/login">
          <LoginPage/>
        </Route>

        <Route exact path="/login">
          <Redirect to="/auth/login" />
        </Route>

      </Switch>
    </Suspense>
  )
}
