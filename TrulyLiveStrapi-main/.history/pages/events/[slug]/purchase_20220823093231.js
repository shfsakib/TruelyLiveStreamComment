import { baseUrl } from '../../../backend'

const OnBoardingPage = ({ url }) => {
// this should never happen
return url
}

export async function getServerSideProps(context) {

  const { type } = context.query;
  const eventSlug = context.query.slug
  console.log("Creating Stripe with Type "+type)
  console.log("EventSlug is "+eventSlug)

  const eventRes = await fetch(
    baseUrl+'/events?populate[0]=eventTicket&filters[eventSlug][$eq]='+eventSlug
  )

  var eventData = await eventRes.json()
  //console.log("Event Data is "+JSON.stringify(eventData)) //?.data[0]?.attributes
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

  var mainUrl = context.req.headers.referer //host
//  console.log(context.req.headers)
  console.log("MAIN URL "+mainUrl)

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
              name:type+' Ticket for '+eventData?.eventName
            }
          },
          quantity: 1
        }
      ],
      metadata:{"type":type},
      mode: 'payment',
      success_url: mainUrl+'/purchasedone?session={CHECKOUT_SESSION_ID}',
      cancel_url: mainUrl
    });
    console.log("Session created. URL: "+session.url)
  } catch(e){
    throw(e.message)
  }

  console.log("Now diverting to ")
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
