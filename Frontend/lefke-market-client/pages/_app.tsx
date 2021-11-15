import React, {useEffect} from "react"
import '../styles/globals.css'
import {makeStyles, ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import {Provider} from "react-redux"
import {AppBar, Hidden, useMediaQuery} from "@material-ui/core"
import DesktopHeader from "../src/components/header/desktop/desktop-header"
import {initStore} from "../src/redux/store"
import Head from 'next/head'
const store = initStore()


const useStyles = makeStyles({
  siteContent: {
    position: 'relative',
  },
  bottomNavContainer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
})

function MyApp({ Component, pageProps }: AppProps) {

  return <>
    <Head>
      <title>My page</title>
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <title>Lefke Market</title>
    </Head>
    <CssBaseline />
      <Hidden only={["xs", "sm", "md"]}>
        <DesktopHeader/>
      </Hidden>

      <Component {...pageProps} />
  </>
}

export default MyApp
