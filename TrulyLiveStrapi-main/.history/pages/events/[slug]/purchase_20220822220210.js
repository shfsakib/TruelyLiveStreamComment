import { baseUrl } from '../../../backend'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import cookie from 'cookie'
import { toast } from 'react-toastify'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'
import { BiArrowBack } from 'react-icons/bi'
import rehypeRaw from 'rehype-raw'

const OnBoardingPage = ({ navData, footerData, eventData, profileData, token, eventId }) => {
  const router = useRouter()

  const filterBasedOnTicket = (arrOfObj) => {
    return arrOfObj?.filter((item) => profileTickets?.some((ticket) => ticket?.eventTicketType === item?.ticketLevel))
  }

  const filterBasedOnPublic = (arrOfObj) => {
    return arrOfObj?.filter((item) => item?.isPublic === true)
  }

  const imageAssets = filterBasedOnTicket(eventData?.imageEventAssets)
  const publicImageAssets = filterBasedOnPublic(eventData?.imageEventAssets)
  const videoAssets = filterBasedOnTicket(eventData?.videoEventAssets)
  const publicVideoAssets = filterBasedOnPublic(eventData?.videoEventAssets)
  const documentAssets = filterBasedOnTicket(eventData?.document)
  const publicDocumentAssets = filterBasedOnPublic(eventData?.document)

  // const allowedToSee = eventData?.eventDiary.filter((item) =>
  //   profileTickets.some((ticket) => ticket?.eventTicketType === item?.ticketLevel)
  // )

  const documentsLength = publicDocumentAssets?.length >= 1 || documentAssets?.length >= 1
  const ticketMediaAssetLength = imageAssets?.length >= 1 || videoAssets?.length >= 1
  const publicMediaAssetLength = publicImageAssets?.length >= 1 || publicVideoAssets?.length >= 1

  return (
    <>
      <Head>
        <title>Truly Live | {eventData?.eventName}</title>
        <meta name="description" content="Truly Live - 100% Live by definition" />
      </Head>
      <Navbar navData={navData} />
      <div className="my-20 md:px-20 px-4 container">
        PURCHASE!          
      </div>

      <Footer footerData={footerData} />
    </>
  )
}

export const getServerSideProps = async ({ req, query: { slug } }) => {
  const { token } = cookie.parse(req ? req.headers.cookie || '' : '')

  const navRes = await fetch(`${baseUrl}/nav-bars?populate=%2A`)
  const navData = await navRes.json()
  const footerRes = await fetch(`${baseUrl}/footers?populate=*`)
  const footerData = await footerRes.json()

  const eventRes = await fetch(
    `${baseUrl}/events?populate[0]=eventImage,imageEventAssets.imageEventMedia,videoEventAssets.videoEventMedia,eventTicket,eventDiary,document&filters[eventSlug][$eq]=${slug}`
  )
  const eventData = await eventRes.json()

  const res = await fetch(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()

  return {
    props: {
      navData: navData.data[0].attributes,
      footerData: footerData.data[0].attributes,
      eventData: eventData?.data[0]?.attributes,
      eventId: eventData?.data[0]?.id,
      profileData: data,
      token: token ? token : ''
    }
  }
}

export default OnBoardingPage
