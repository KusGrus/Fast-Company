import '../styles/globals.css'
import React from 'react'
import type {AppProps} from 'next/app'
import Head from 'next/head'

function MyApp({Component, pageProps}: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <title>My top</title>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
