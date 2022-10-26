import { Fragment, useEffect, useState, useRef } from 'react'
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
import { toast } from 'react-toastify'
import { RiMenu5Fill } from 'react-icons/ri'
let Picker;
if (typeof window !== 'undefined') {
  import('emoji-picker-react').then(_module => {
    Picker = _module.default;
  });
}
import { AiFillPushpin, AiOutlineClose, AiOutlinePushpin, AiOutlineSend } from 'react-icons/ai'
import { BsChat } from 'react-icons/bs'
import { MdOutlineEmojiEmotions } from 'react-icons/md'
import { socket } from '../socket'

export default function Video({ navData, footerData, profileData, token, videoData, eventData }) {
  let router = useRouter()
  const [text, setText] = useState('')
  const [windowSize, setWindowSize] = useState(null)
  const [sideMenu, setSideMenu] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const [hideDrop, setHideDrop] = useState(null)
  const [showEmoji, setShowEmoji] = useState(false);
  const [pinMessage, setPinMessage] = useState('');
  const [blocked, setBlocked] = useState(false);
  const [roomUsers, setRoomUsers] = useState([]);
  const [emojiStatus, setEmojiStatus] = useState('unblock');
  const [currentUser, setCurrentUser] = useState({
    Name: profileData && profileData.username,
    Image: profileData && profileData.image?.url,
    Email: profileData.email,
    isAdmin: profileData && profileData.isAdmin
  });
  //Unique Room By URL path name
  const UniqueRoomId = '/' + router.query.eventSlug;
  // 
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
  useEffect(() => {
    socket.emit("loadAllComment", { OwnUnique: currentUser.Email, RoomId: UniqueRoomId })
    socket.emit("loadAllJoinedUser", { RoomId: UniqueRoomId })
  }, [])

  useEffect(() => {
    socket.on("loadData" + currentUser.Email, (data) => {
      var chatData = [];
      data.forEach(element => {
        chatData.push(element);
      });
      setChat(chatData);
      scrollChatMiddle();
    });
    //block code end 
    //pin message code end
    socket.on("rcvEmojiInVenue", (data) => {
      floatEmoji(data)
    });
    socket.on("loadAllJoin", (data) => {
      setRoomUsers(data)
    });
    socket.on("newUserResponse", (data) => {
      socket.emit("loadAllJoinedUser", { RoomId: UniqueRoomId })
    });
    socket.on("rcvOwnMsgInVenue", (data) => {
      setChat((chat) => [...chat, data]);
      scrollChatMiddle();
    });
    return function cleanup() {
      socket.off('loadData' + currentUser.Email);
      socket.off('rcvEmojiInVenue');
      socket.off('loadAllJoin');
      socket.off('newUserResponse');
      socket.off('rcvOwnMsgInVenue');
    }
  }, [])
  const scrollChatMiddle = () => {
    document.querySelector('.chat-content-div').scrollTop = document.querySelector('.chat-content-div').scrollHeight
  }
  const sendText = (data, e) => {
    // document.getElementById('messageBox').value = '';
    if (text.trim() !== '') {
      if (e.keyCode === 13 && !e.shiftKey) {
        if (data && data.trim() !== '') {
          socket.emit("sendMessage", {
            Name: currentUser.Name,
            Email: currentUser.Email,
            OwnPic: currentUser.Image,
            Message: data,
            RoomId: UniqueRoomId
          })
        }
        setText('')
        e.preventDefault();
      }
    } else {
      if (e.keyCode === 13)
        e.preventDefault();
    }

    scrollChatMiddle();
  }
  const handleBlock = (data) => {
    socket.emit("blockAnyUser", {
      OwnUnique: currentUser.Email,
      UserEmail: data.SenderID,
      RoomId: UniqueRoomId
    })
  }
  const handlePinMessage = (data) => {
    socket.emit("setPinMessage", {
      OwnUnique: currentUser.Email,
      PinMessage: data.Message,
      RoomId: UniqueRoomId
    })
  }

  const css = `
  .input-box{
    resize: none;
    border-radius: 5px;
    max-height: 50px;
    margin:0 5px;
    font-size:14px;
  }
  .react-button{
    color:white;
    margin:10px 0 5px 0;
    cursor:pointer;
  }
  .emoji-picker-react .emoji-categories{
    filter: invert(42%) sepia(93%) saturate(1352%) hue-rotate(87deg) brightness(119%) contrast(119%);
  }
  .emoji-picker-react .emoji-categories button{
    background-size:25px!important;
    }
    .emoji-picker-react .emoji-scroll-wrapper{
    background-color:rgba(0,0,0,1)

    }
  .emoji-picker-react .emoji-group:before{
    background-color:rgba(0,0,0,0.7)!important;
  }
  .emoji-picker-react input.emoji-search{
    background:transparent
  }
  .emoji-scroll-wrapper::-webkit-scrollbar {
    width: 5px;
    background-color: gainsboro;
  }
  .emoji-scroll-wrapper::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.8);
  }
  .show-emoji{
    color:#128b7e!Important;
  }
  
  `
  const emojiContainer = {
    position: 'absolute',
    marginTop: '-360px',
    marginLeft: '-20px',
    width: 'calc(100% - 10px)',
  }
  const floatEmoji = (data) => {
    let body = document.querySelector('.content-div');
    let myemoji = document.createElement('span');
    if (windowWidth > 768) {
      myemoji.style.top = 250 + Math.floor(Math.random() * 100) + 20 + 'px';
      myemoji.style.right = '360px';
    } else {
      myemoji.style.top = 150 + Math.floor(Math.random() * 100) + 20 + 'px';
      myemoji.style.right = '20px';
    }

    myemoji.classList.add('emoji-div');
    myemoji.innerHTML = data.Message + '<div class="d-block fs-6 fw-bold">' + data.Email + '</div>';
    let sizeEmoji = Math.random() + 1 * 50;
    myemoji.style.fontSize = sizeEmoji + 10 + 'px';
    body.appendChild(myemoji);

    setTimeout(() => {
      myemoji.remove();
    }, 4000);
  }
  const handleEmojiSelect = (e, emojiData) => {
    socket.emit("sendEmoji", {
      Name: currentUser.Name,
      Email: currentUser.Email,
      OwnPic: currentUser.Image,
      Message: `<img src='${getImageEmoji(emojiData)}' data-emoji='${emojiData.emoji}' />`,
      RoomId: UniqueRoomId
    })

  }


  return (
    <>
      <Head>
        <title>Truly Live | Video</title>
        <meta name="description" content="Truly Live - 100% Live by definition" />
        <style>{css}</style>
      </Head>
      <Navbar navData={navData} className={'position-relative'} />
      <div className="row m-0 venue-div">
        <div className={`content-div`}>
          {
            roomUsers.length > 0 ?
              roomUsers.map((item, k) => (
                <div className="user-container" key={k}>
                  <img src={item.ProfilePic} alt="users" />
                  <div className="user-name">{item.UserEmail}</div>
                </div>
              ))
              :
              <div className="col-12 p-4 text-center">
                <h5>No User On Event</h5>
              </div>
          }
        </div>
        <div className={`chat-content-div`}>
          {
            chat && chat.length > 0 && chat.map((item, key) => (
              <Comments chat={item} key={key} scrollChatMiddle={scrollChatMiddle} handleBlock={null} handlePinMessage={null} currentUser={currentUser} />
            ))
          }
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

  const eventSlug = query.eventSlug
  console.log("Event Slug=" + eventSlug)

  const eventRes = await fetch(
    baseUrl + '/events?populate[0]=eventTicket&filters[eventSlug][$eq]=' + eventSlug
  )

  var eventData = await eventRes.json()
  //console.log("Event Data is "+JSON.stringify(eventData)) //?.data[0]?.attributes
  eventData = eventData.data[0].attributes


  const res = await fetch(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()


  return {
    props: {
      navData: navData.data[0].attributes,
      footerData: footerData.data[0].attributes,
      token,
      eventData: eventData,
      profileData: data
    }
  }
}
function getImageEmoji(emoji) {
  var imgSrc = 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/' + emoji.unified + '.png';
  return imgSrc;
}
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}