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

const OnBoardingPage = ({ url }) => {
  return "<script>document.location='"+url+'</script>'
}

export async function getServerSideProps(context) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  var url = 'https://www.trulylive.com/events/'+context.query.slug+'/purchase'
   var session

  try {
      console.log("Creating Session...")
     session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency:'GBP',
            unit_amount:399,
            product_data: {
              name:'Ticket Purchase'
            }
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: url+'/?success=true',
      cancel_url: url+'/?canceled=true'
    });
    console.log("Session created. "+session.url)
  } catch(e){
    throw(e.message())
  }

  //context.res.writeHead(301, {
  //  Location: session.url
  //});
  //context.res.end();


    return {
      props: {
        url: session.url
      }
    }
}

export default OnBoardingPage
