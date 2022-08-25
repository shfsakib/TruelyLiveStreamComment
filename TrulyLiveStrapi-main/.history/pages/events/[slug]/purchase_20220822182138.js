import { baseUrl } from '../../../backend'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import Head from 'next/head'
import Events from '../../../components/Events'

const OnBoardingPage = ({ navData, footerData, eventData }) => {
  
  return (
    <>
      <Head>
        <title>Truly Live | Events</title>
        <meta name="description" content="Truly Live - 100% Live by definition" />
      </Head>
      <Navbar navData={navData} />
      <div className="my-20 md:px-20 px-4 container">
        <h1>Purchase Page</h1>
      </div>
      <Footer footerData={footerData} />
    </>
  )
}

export const getStaticProps = async () => {
  const navRes = await fetch(`${baseUrl}/nav-bars?populate=%2A`)
  const navData = await navRes.json()
  const footerRes = await fetch(`${baseUrl}/footers?populate=*`)
  const footerData = await footerRes.json()

  const eventRes = await fetch(`${baseUrl}/events?populate=*&sort[0]=eventDateAndTime&sort[1]=eventName`)
  const eventData = await eventRes.json()

  return {
    props: {
      navData: navData.data[0].attributes,
      footerData: footerData.data[0].attributes,
      eventData
    },
    revalidate: 1
  }
}

export default OnBoardingPage
