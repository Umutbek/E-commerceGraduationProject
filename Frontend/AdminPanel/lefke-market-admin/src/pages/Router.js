import React, {Suspense, lazy} from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import PrivateRoute from "../containers/PrivateRoute"
import WithBgSpinner from "../components/spinners/WithBgSpinner"

const LoginPage = lazy(() => import('./auth/LoginPage'))
const Page404 = lazy(() => import('./Page404'))
const OrdersPage = lazy(() => import('./orders/OrdersPage'))

export default function Router(){
  return (
    <Suspense fallback={<WithBgSpinner/>}>
      <Switch>
        <Route exact path="/auth/login">
          <LoginPage/>
        </Route>
        <PrivateRoute exact path="/orders">
          <OrdersPage/>
        </PrivateRoute>
        <Route exact path="/login">
          <Redirect to="/auth/login" />
        </Route>
        <Route exact path="/">
          <Redirect to="/orders" />
        </Route>
        <Route>
          <Page404/>
        </Route>
      </Switch>
    </Suspense>
  )
}
