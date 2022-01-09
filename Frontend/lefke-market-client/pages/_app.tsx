import React, {useEffect} from "react"

import SwiperCore, {Autoplay, Navigation, Pagination} from 'swiper'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'

import '../styles/react-phone-input-2.css'
import '../styles/globals.css'

import type {AppProps} from 'next/app'
import Head from 'next/head'

import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material"
import {CssBaseline} from "@mui/material"
import theme from '../src/theme/theme'
import {Provider} from "react-redux"

import ApiContext from "../src/helpers/api/api-context"
import Api from "../src/helpers/api"
import store from '../src/redux/store'
import Layout from "../src/components/common/layout"


declare module '@mui/styles/defaultTomeme' {
  interface DefaultTheme extends Theme {}
}

SwiperCore.use([Navigation, Pagination, Autoplay])

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      // @ts-ignore
      jssStyles.parentElement.removeChild(jssStyles)
    }

    // @ts-ignore
  }, [])

  return <>
    <Head>
      <meta name="facebook-domain-verification" content="6fkiiyeb9k0kyv17h5fm9606yn1rko" />
      <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      <title>Lefke Market Website</title>
    </Head>
    <ApiContext.Provider value={new Api()}>
        <Provider store={store}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </StyledEngineProvider>
        </Provider>
    </ApiContext.Provider>
  </>
}

export default MyApp
