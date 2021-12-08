import {useEffect} from "react"

import SwiperCore, {Autoplay, Navigation, Pagination} from 'swiper'
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'

import '../styles/react-phone-input-2.css'
import '../styles/globals.css'

import type {AppProps} from 'next/app'
import Head from 'next/head'

import makeStyles from "@mui/styles/makeStyles"
import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material"
import {CssBaseline} from "@mui/material"
import theme from '../src/theme/theme'
import {Provider} from "react-redux"
import NextNprogress from 'nextjs-progressbar'

import ApiContext from "../src/helpers/api/api-context"
import Api from "../src/helpers/api"
import store from '../src/redux/store'
import AuthModal from "../src/components/common/auth/auth-modal"

import {SCREEN_TYPE} from "../src/enums"
import ScrollToTop from "../src/components/common/scroll-to-top"
import dynamic from "next/dynamic"

const DesktopCategoryDrawer = dynamic(() => import('../src/components/common/drawer/category/desktop-drawer'), { ssr: false })
const MobileCategoryDrawer = dynamic(() => import('../src/components/common/drawer/category/mobile-drawer'), { ssr: false })
const DesktopHeader = dynamic(() => import('../src/components/common/header/desktop-header'), { ssr: false })
const MobileHeader = dynamic(() => import('../src/components/common/header/mobile-header'), { ssr: false })
const MobileBottomNavigation = dynamic(() => import('../src/components/common/mobile-bottom-navigation'), { ssr: false })

declare module '@mui/styles/defaultTomeme' {
  interface DefaultTheme extends Theme {}
}

SwiperCore.use([Navigation, Pagination, Autoplay])

const useStyles = makeStyles({
  site: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'space-between',

  },
  siteContent: {
    position: 'relative',
    backgroundColor: '#fff',
  },
  header: { },
})

const screenType = store.getState().settings.screenType


function MyApp({ Component, pageProps }: AppProps) {

  const classes = useStyles()

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
              <NextNprogress
                  color="#29D"
                  startPosition={0.3}
                  stopDelayMs={200}
                  height={3}
                  showOnShallow={true}
              />

              { screenType === SCREEN_TYPE.DESKTOP ? <>
                <DesktopHeader/>
              </> : <>
                <MobileHeader/>
              </> }

              <div className={classes.site}>
                <div className={classes.siteContent} id="scroller">
                  <Component {...pageProps} />
                </div>
              </div>

              { screenType !== SCREEN_TYPE.DESKTOP ? <>
                <MobileCategoryDrawer storeName="global"/>
                <MobileBottomNavigation/>
              </> : <>
                <DesktopCategoryDrawer storeName="global"/>
                <AuthModal/>
              </> }
              <ScrollToTop/>
            </ThemeProvider>
          </StyledEngineProvider>
        </Provider>
    </ApiContext.Provider>
  </>
}

export default MyApp
