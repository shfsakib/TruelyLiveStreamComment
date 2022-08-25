
const OnBoardingPage = ({ url }) => {
  return "<script>document.location='"+url+'</script>'
}

export async function getServerSideProps(context) {
  console.log("Creating Stripe")
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

  context.res.writeHead(301, {
    Location: session.url
  //});
  //context.res.end();
    return {
      props: {
        url: session.url
      }
    }
}

export default OnBoardingPage
