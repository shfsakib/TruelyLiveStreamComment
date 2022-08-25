import { useEffect, useState } from 'react'
import Head from 'next/head'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { baseUrl } from '../../backend'
import cookie from 'cookie'
import 'bootstrap/dist/css/bootstrap.min.css'
import Comments from '../../components/comments'
import InputEmoji from 'react-input-emoji'
import { useRouter } from 'next/router'
import io from 'socket.io-client'
const ChatEndPoint = 'https://trulylivechatbackend.herokuapp.com/'

export default function Video({ navData, footerData, profileData, token, videoData }) {
  let router = useRouter()
  const [text, setText] = useState('')
  const [windowSize, setWindowSize] = useState(null)
  const [sideMenu, setSideMenu] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const [hideDrop, setHideDrop] = useState(null)
  const [currentUser, setCurrentUser] = useState({
    Image: profileData && profileData.image.url,
    Email: profileData.email
  })
  //Unique Room By URL path name
  const UniqueRoomId = router.asPath
  //
  //socket initial
  const socket = io(ChatEndPoint, { transports: ['websocket', 'polling', 'flashsocket'], forceNew: true })
  var selectedUserId = ''
  const [chat, setChat] = useState([])

  //
  useEffect(() => {
    setWindowWidth([window.innerWidth])
    window.addEventListener('resize', changeWindowWidth)
  }, [])

  useEffect(() => {
    triggerSideBar()
  }, [windowWidth])
  const changeWindowWidth = () => {
    setWindowWidth([window.innerWidth])
  }

  const triggerSideBar = () => {
    if (windowWidth <= 992) {
      setSideMenu(false)
    } else {
      setSideMenu(true)
    }
  }
  const LoadData = () => {
    socket.emit('loadAllComment', { OwnUnique: currentUser.Email, RoomId: UniqueRoomId })
  }

  useEffect(() => {
    socket.on('loadData' + currentUser.Email, (data) => {
      var chatData = []
      data.forEach((element) => {
        chatData.push(element)
      })
      setChat(chatData)
      scrollChatMiddle()
    })
    socket.on('rcvOwnMsg', (data) => {
      setChat((chat) => [...chat, data])
      scrollChatMiddle()
    })
    return function cleanup() {
      socket.off('rcvOwnMsg')
      socket.off('loadData' + currentUser.Email)
    }
  }, [])
  const scrollChatMiddle = () => {
    document.getElementById('usersComments').scrollTop = document.getElementById('usersComments').scrollHeight
  }
  const sendText = (data, e) => {
    // document.getElementById('messageBox').value = '';
    if (text.trim() !== '') {
      if (e.keyCode === 13 && !e.shiftKey) {
        if (data && data.trim() !== '') {
          socket.emit('sendMessage', {
            Email: currentUser.Email,
            OwnPic: currentUser.Image,
            Message: data,
            RoomId: UniqueRoomId
          })
        }
        e.preventDefault()
      }
    } else {
      if (e.keyCode === 13) e.preventDefault()
    }

    scrollChatMiddle()
  }
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize(window.innerWidth)
    })
    scrollChatMiddle()
  }, [windowSize])
  const handleComment = (text) => {
    scrollChatMiddle()
  }
  const handleCommentMenu = () => {
    document.getElementById('usersComments').style.height =
      document.getElementById('streamingVideo').scrollHeight - 150 + 'px'
    scrollChatMiddle()
    setSideMenu(!sideMenu)
    hideDrop === null ? setHideDrop(false) : setHideDrop(!hideDrop)
    LoadData()
  }

  const betweenDate =
    new Date().getTime() <= new Date(videoData[0]?.videoDateEnd).getTime() &&
    new Date().getTime() >= new Date(videoData[0]?.videoDateStart).getTime()

  const beforeDate = new Date().getTime() < new Date(videoData[0]?.videoDateStart)
  const AfterDate = new Date().getTime() > new Date(videoData[0]?.videoDateEnd)

  return (
    <>
      <Head>
        <title>Truly Live | Video</title>
        <meta name="description" content="Truly Live - 100% Live by definition" />
      </Head>
      <Navbar navData={navData} />
      <div className="row" id="streamRow">
        <div className={`video-left-div  ${!sideMenu && 'close'} ${hideDrop && 'hide'}`}>
          <video
            src={
              (betweenDate && videoData[0]?.videoURL) ||
              (beforeDate && videoData[0]?.videoURLbefore) ||
              (AfterDate && videoData[0]?.videoURLafter)
            }
            controls
            id="streamingVideo"
            name="streamingVideo"
            className="min-w-full"
            poster={videoData[0]?.videoPoster?.data?.attributes?.url}
          />
          {/* <button className={`comment-button btn btn-primary ${!sideMenu && 'd-none'}`} onClick={handleCommentMenu}><i className="fas fa-comment fa-lg"></i></button> */}
          <button className={`comment-button btn btn-primary ${!sideMenu && 'd-none'}`} onClick={handleCommentMenu}>
            <img src="/images/comment.png" alt="comments" />
          </button>
        </div>
        <div className={`comments-div ${sideMenu && 'close'}`}>
          <div className="comment-top">
            <div className="row">
              <div className="col-8">
                <span className="title">Comments</span>
              </div>
              <div className="col-4 text-right">
                {/* <a className='btn text-white pt-0' onClick={handleCommentMenu}><i className="fas fa-times fa-lg"></i></a> */}
                <a className="btn text-white pt-0" onClick={handleCommentMenu}>
                  <img src="/images/close.png" alt="comments" style={{ width: '15px' }} />
                </a>
              </div>
            </div>
            <hr />
          </div>
          <div className="comment-bottom">
            <div id="usersComments" className="users-comments">
              {chat &&
                chat.length > 0 &&
                chat.map((item, key) => <Comments chat={item} key={key} scrollChatMiddle={scrollChatMiddle} />)}
            </div>
            <div className="comment-section">
              <div className="col-11">
                <InputEmoji
                  value={text}
                  onChange={setText}
                  cleanOnEnter
                  placeholder="Type a message"
                  onKeyDown={(e) => sendText(text, e)}
                />
              </div>
              <div className="col-1 text-left">
                {/* <button className='btn ps-0 text-primary mt-2' onClick={() => sendText(text)}><i className="fas fa-paper-plane fa-lg"></i></button> */}
                <button className="btn p-0 text-primary mt-2" onClick={(e) => sendText(text, e, 'button')}>
                  <img
                    src="/images/send.png"
                    style={{ width: '35px', position: 'relative', top: '5px' }}
                    alt="comments"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer footerData={footerData} />
    </>
  )
}

export const getServerSideProps = async ({ req, query }) => {
  const { token } = cookie.parse(req ? req.headers.cookie || '' : '')

  const navRes = await fetch(`${baseUrl}/nav-bars?populate=%2A`)
  const navData = await navRes.json()
  const footerRes = await fetch(`${baseUrl}/footers?populate=*`)
  const footerData = await footerRes.json()

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const videoRes = await fetch(
    `${baseUrl}/events?populate[0]=eventDiary.videoPoster&filters[eventDiary][id][$eq]=${query.diaryitemtitle}`
  )
  const videoData = await videoRes.json()
  console.log("Event Slug="+eventSlug)

  const eventSlug = query.eventSlug
  console.log("Event Slug="+eventSlug)

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


  const res = await fetch(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()

  const profileTickets = data?.purchases
    ?.filter((item) => item?.event?.id === videoData.data[0]?.id)
    ?.map((item) => item?.eventticket)
    ?.flat()

  const videoToShow = videoData.data[0].attributes?.eventDiary?.filter(
    (item) => item?.id === parseInt(query.diaryitemtitle)
  )

  const allowedToSee = videoToShow.filter((item) =>
    profileTickets.some((ticket) => ticket?.eventTicketType === item?.ticketLevel)
  )

  if (allowedToSee.length === 0) {
    return {
      redirect: {
        destination: '/events',
        permanent: false
      }
    }
  }

  return {
    props: {
      navData: navData.data[0].attributes,
      footerData: footerData.data[0].attributes,
      token,
      videoData: videoToShow,
      profileData: data
    }
  }
}
