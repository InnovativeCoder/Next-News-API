import Head from 'next/head'
import { Toolbar } from "../components/toolbar"
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>News API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toolbar />
        <div className={styles.main}>
          <h1>News App</h1>
          <h3>Your one stop shop for the latest news articles</h3>
        </div>
      </div>
  )
}
