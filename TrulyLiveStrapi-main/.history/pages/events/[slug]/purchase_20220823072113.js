
const OnBoardingPage = ({ url }) => {
  return url
}

export async function getServerSideProps(context) {

  const { type } = context.query;
  console.log("Creating Stripe with Type "+type)
  console.log("Event is "+)
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
              name:type+' Ticket Purchase'
            }
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: 'https://www.trulylive.com/events/'+context.query.slug+'/purchase?success=true',
      cancel_url: 'https://www.trulylive.com/events/'+context.query.slug
    });
    console.log("Session created. "+session.url)
  } catch(e){
    throw(e.message())
  }

  context.res.writeHead(301, {
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