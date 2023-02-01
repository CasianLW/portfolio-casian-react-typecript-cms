import type { AppProps } from 'next/app'
import '@/styles/globals.css'

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

import Head from 'next/head'
import LayoutComponent from '@/layout'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <LayoutComponent>
        <Component {...pageProps} />
      </LayoutComponent>
    </>
  )
}

export default App
