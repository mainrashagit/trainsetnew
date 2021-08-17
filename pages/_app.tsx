import type { AppProps } from "next/app"
import "@/styles/styles.sass"
import Layout from "@modules/Layout/Layout"
import { useEffect } from "react"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    return () => {}
  }, [])
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
