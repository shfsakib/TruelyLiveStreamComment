import { baseUrl } from '../../../backend'

const OnBoardingPage = ({ url }) => {
// this should never happen
  return url
}

export async function getServerSideProps(context) {

    const session = context.query.session
    console.log("Session is "+session)

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(
      'cs_test_a1Ds1dKBOmgt4sDHEEb5EUZcdg7LiE3KGqQxSRJOTRVi2GEehnYNYRNaTe'
    );



  const eventSlug = context.query.slug
  console.log("Purchase Done")
  console.log("EventSlug is "+eventSlug)

  console.log(context.req.form)

  const eventRes = await fetch(
    baseUrl+'/events?populate[0]=eventImage,imageEventAssets.imageEventMedia,videoEventAssets.videoEventMedia,eventTicket,eventDiary,document&filters[eventSlug][$eq]='+eventSlug
  )

  var eventData = await eventRes.json()
  eventData = eventData.data[0].attributes

  const allTickets = eventData?.eventTicket
  console.log("All Tickets is "+JSON.stringify(allTickets))

  var thisTicket = allTickets?.filter((item) => item?.eventTicketType==type)
  thisTicket=thisTicket[0]
  console.log("This Ticket is "+JSON.stringify(thisTicket))

  var price = thisTicket?.price

  price=price*100 //convert to pence

  console.log("Event Description is "+eventData?.eventName)
  console.log("Price is "+price)

  console.log("Stripe...")
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


    return {
      props: {
        url: session.url
      }
    }
}

export default OnBoardingPage
