import { baseUrl } from '../../../backend'
import cookie from 'cookie'

const OnBoardingPage = ({ url }) => {
// this should never happen
  return url
}

export async function getServerSideProps(context) {

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
  var eventID = eventData.data[0].id
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
  if (res.ok) {
    toast('Purchased Successfully')
    router.reload()
  } else {
    toast.error('Something went wrong')
  }

    return {
      props: {
        url: session.url
      }
    }
}

export default OnBoardingPage
