import { baseUrl } from '../../../backend'

const OnBoardingPage = ({ url }) => {
  return url
}

export async function getServerSideProps(context) {

  const { type } = context.query;
  const eventSlug = context.query.slug
  console.log("Creating Stripe with Type "+type)
  console.log("EventSlug is "+eventSlug)

  const eventRes = await fetch(
    baseUrl+'/events?populate[0]=eventImage,imageEventAssets.imageEventMedia,videoEventAssets.videoEventMedia,eventTicket,eventDiary,document&filters[eventSlug][$eq]='+eventSlug
  )

  var eventData = await eventRes.json()
  //console.log("Event Data is "+JSON.stringify(eventData)) //?.data[0]?.attributes
  eventData = eventData.data[0].attributes

  const allTickets = eventData?.eventTicket
  console.log("All Tickets is "+JSON.stringify(allTickets))

  const thisTicket = allTickets?.filter((item) => item?.eventTicketType==type)
  var price = thisTicket?.price

  price=price*100 //convert to pence

  console.log("Event Description is "+eventData?.eventName)
  console.log("Price is "+price)

  console.log("Stripe...")
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

  var session

  try {
      console.log("Creating Session...")
     session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency:'GBP',
            unit_amount:price,
            product_data: {
              name:type+' Ticket Purchase for '+eventData?.eventName
            }
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: 'https://www.trulylive.com/events/'+context.query.slug+'/purchase?success=true',
      cancel_url: 'https://www.trulylive.com/events/'+context.query.slug
    });
    console.log("Session created. URL: "+session.url)
  } catch(e){
    throw(e.message)
  }

  context.res.setHeader('Cache-Control', 'No-Cache');
  context.res.writeHead(302, {
    Location: session.url
  });
  context.res.end();

    return {
      props: {
        url: session.url
      }
    }
}

export default OnBoardingPage
