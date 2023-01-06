import Head from 'next/head'
import dynamic from 'next/dynamic'
import styles from '../styles/Home.module.css'
import Main from '../Components/Main'
import About from '../Components/About'
import Contact from '../Components/Contact'
import Footer from '../Components/Footer'
import WrapperContext from '../Components/Context';
const Projects = dynamic(() => import('../Components/Projects'), { ssr: false });
const Header = dynamic(() => import('../Components/Header'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Angel Developer</title>
        <meta name="description" content="Desarrollador web Colombia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/dev.ico" />
      </Head>
      <main className={styles.main}>
        <WrapperContext>
          <Header redirect={false} />
          <Main />
          <About />
          <Projects />
          <Contact />
          <Footer redirect={false} />
        </WrapperContext>
      </main>
    </>
  )
}
