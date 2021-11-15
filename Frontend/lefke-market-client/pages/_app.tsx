import React, {useEffect} from "react"
import '../styles/globals.css'
import {makeStyles, ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import {setScreenType} from "../src/redux/states/settings/actions"

import {Provider} from "react-redux"
import {AppBar, Hidden, useMediaQuery} from "@material-ui/core"

import CollapseOnScroll from "../src/components/onScroll/collapseOnScroll"
import DesktopHeader from "../src/components/header/desktop/desktop-header"
import MobileHeader from "../src/components/header/mobile/mobile-header"
import {ScreenTypes} from "../src/constants"

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
  const classes = useStyles()

  const isLaptop = useMediaQuery('(max-width: 1360px')
  const isMobile = useMediaQuery('(max-width: 768px')

  useEffect(() => {

    let screenType

    if (isMobile){
      screenType = ScreenTypes.mobile
    } else if (isLaptop){
      screenType = ScreenTypes.laptop
    } else {
      screenType = ScreenTypes.desktop
    }

    store.dispatch(setScreenType(screenType))

  }, [isLaptop, isMobile])


  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      // @ts-ignore
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

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
      <Hidden only={["lg", "xl"]}>

        <MobileHeader/>
      </Hidden>

      <Component {...pageProps} />
  </>
}

export default MyApp
