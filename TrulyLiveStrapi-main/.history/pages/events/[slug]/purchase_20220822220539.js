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

  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: '{{PRICE_ID}}',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/?success=true`,
      cancel_url: `${req.headers.origin}/?canceled=true`,
    });
    res.redirect(303, session.url);

  return (
    router.push("")
  )
}

export default OnBoardingPage
