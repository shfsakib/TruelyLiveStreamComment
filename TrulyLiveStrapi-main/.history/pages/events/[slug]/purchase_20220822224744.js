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

  return (
    router.push("")
  )
}

export async function getServerSideProps(context) {
//export const getServerSideProps = async ({ req, query: { slug } }) => {

  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  var url = 'https://www.trulylive.com/events/'+context.query.slug+'/purchase'

  try {
    const session =  stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency:'GBP',
            unit_amount:399
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: url+'/?success=true',
      cancel_url: url+'/?canceled=true',
    });

    return {
      props: {
        url: session.url
      }
    }
}

export default OnBoardingPage
