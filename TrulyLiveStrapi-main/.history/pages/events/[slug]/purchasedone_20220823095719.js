import { baseUrl } from '../../../backend'
import cookie from 'cookie'

const OnBoardingPage = ({ result }) => {
// this should never happen
  return result
}

Page.getInitialProps = async ({ store, res }) => {
    if (res) {
        // res available only at server
        // no-store disable bfCache for any browser. So your HTML will not be cached
        res.setHeader('Cache-Control', 'no-store');
    }

    await store.dispatch(action());
    return {};
};

export async function getServerSideProps(context) {

    contxt.res.setHeader('Cache-Control', 'no-store');

    const sessionID = context.query.session
    console.log("Session is "+sessionID)

    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.retrieve(
      sessionID
    );
    console.log("Got Session")
    console.log(session)

    var type = session.metadata.type
   console.log("Type is "+type)

  const eventSlug = context.query.slug
  console.log("Purchase Done")
  console.log("EventSlug is "+eventSlug)

  console.log(context.req.form)

  const eventRes = await fetch(
    baseUrl+'/events?populate[0]=eventTicket&filters[eventSlug][$eq]='+eventSlug
  )

  var eventData = await eventRes.json()
  var eventId = eventData.data[0].id
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

  const { token } = cookie.parse(context.req ? context.req.headers.cookie || '' : '')

  const ures = await fetch(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const profileData = await ures.json()

  console.log("Posting purchased ticket....")
  const res = await fetch(`${baseUrl}/purchases`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      data: {
        event: {
          id: eventId
        },
        eventticket: [
          {
            eventTicketType: type,
            price
          }
        ],
        user: {
          id: profileData?.id
        }
      }
    })
  })
  await res.json()
  var result
  if (res.ok) {
    result=('Purchased Successfully')
  } else {
    result=('Something went wrong')
  }
  console.log("RESULT: "+result)

  var referer=context.req.headers
  if (referer) 
  referer=referer.replace("/purchasedone","")
  console.log("Final purchase divert.........")
  console.log(referer)

  //This just isn't reliable. it caches :(
  //context.res.setHeader('Cache-Control', 'No-Cache');
  //context.res.writeHead(302, {
  //  Location: referer
  //});
  //context.res.end();

    return {
      props: {
        result: result
      }
    }
}

export default OnBoardingPage
