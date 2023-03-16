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

export default function Home({data} : any) {
  console.log(data);

  return (
    <>
      <Head>
        <title>Angel Developer</title>
        <meta name="description" content="Desarrollador web Colombia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <WrapperContext>
          <Header redirect={false} headerData={data.head}/>
          <Main mainData={data.main}/>
          <About aboutData={data.about}/>
          <Projects projectsData={data.projects}/>
          <Contact contactData={data.contact}/>
          <Footer redirect={false} footerData={data.footer}/>
        </WrapperContext>
      </main>
    </>
  )
}

export const getStaticProps = async ({ locale } : any) => {
  const response = await import(`../lang/${locale}.json`);

  return {
    props: {
      data: response.default
    }
  }
}
