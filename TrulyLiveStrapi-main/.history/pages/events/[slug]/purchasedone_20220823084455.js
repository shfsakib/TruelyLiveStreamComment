import { baseUrl } from '../../../backend'
import getRawBody from 'raw-body';
import formidable from 'formidable';

const OnBoardingPage = ({ url }) => {
// this should never happen
  return url
}

export async function getServerSideProps(context) {

    console.log("Getting Post Data")
    const body = await getRawBody(req)
    console.log(body.toString("utf-8"))

    const form = new formidable.IncomingForm();
  form.uploadDir = "./";
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log(err, fields, files);
  });

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
      mode: 'payment',
      success_url: 'https://www.trulylive.com/events/'+context.query.slug+'/purchasedone',
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
