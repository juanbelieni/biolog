import Head from 'next/head'
import styles from '../styles/Landing.module.css'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>BioLog | IFSULDEMINAS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
        
    </div>
  )
}
