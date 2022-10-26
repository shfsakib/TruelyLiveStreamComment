import { Fragment, useEffect, useState,useRef } from 'react'
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

export default function Video({ navData, footerData, profileData, token, videoData }) {
  let router = useRouter()
  const [text, setText] = useState('')
  const [windowSize, setWindowSize] = useState(null)
  const [sideMenu, setSideMenu] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const [hideDrop, setHideDrop] = useState(null)
  const [showEmoji, setShowEmoji] = useState(false);
  const [pinMessage, setPinMessage] = useState('');
  const [blocked, setBlocked] = useState(false);
  const [emojiStatus, setEmojiStatus] = useState('unblock');
  const [currentUser, setCurrentUser] = useState({
    Name: profileData && profileData.username,
    Image: profileData && profileData.image.url,
    Email: profileData.email,
    isAdmin: profileData && profileData.isAdmin
  });
  //Unique Room By URL path name
  const UniqueRoomId = router.asPath
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
  const LoadData = () => {
    socket.emit("loadAllComment", { OwnUnique: currentUser.Email, RoomId: UniqueRoomId })
    socket.emit("loadPinMessage", { OwnUnique: currentUser.Email, RoomId: UniqueRoomId })
    socket.emit("loadEmojiBlock", { OwnUnique: currentUser.Email, RoomId: UniqueRoomId })
  }

  useEffect(() => {
    socket.on("loadData" + currentUser.Email, (data) => {
      var chatData = [];
      data.forEach(element => {
        chatData.push(element);
      });
      setChat(chatData);
      scrollChatMiddle();
    });
    socket.on("pinLoad" + currentUser.Email, (data) => {
      setPinMessage(data.PinMessage);
    });
    //block code
    socket.on("blockResult" + currentUser.Email, (data) => {
      if (data === 'Yes') {
        setBlocked(true);
      } else {
        setBlocked(false);
      }
    });
    socket.on("blockSuccess" + currentUser.Email, (data) => {
      toast.success('User has been blocked successfully');
      LoadData();
    });
    socket.on("blockedByAdmin" + currentUser.Email, (data) => {
      if (data === 'Yes') {
        setBlocked(true);
        LoadData();
      } else {
        setBlocked(false);
      }
    });
    //block code end
    // pin message code
    socket.on("pinSuccess" + currentUser.Email, (data) => {
      toast.success('Message has been pinned successfully');
      // LoadData();
    });
    socket.on("loadEmojiStatus" + currentUser.Email, (data) => {
      if (data.RoomId === UniqueRoomId) {
        setEmojiStatus(data.Status)
      }
    });
    socket.on("EmojiStatus", (data) => {
      if (data.RoomId === UniqueRoomId) {
        setEmojiStatus(data.Status)
      }
    });
    socket.on("newPinShow", (data) => {
      if (data.RoomId === UniqueRoomId) {
        setPinMessage(data.PinMessage)
      }
    });
    //pin message code end
    socket.on("rcvEmoji", (data) => {
      floatEmoji(data.Message)
    });
    //
    socket.on("deletePin", (data) => {
      if (data.RoomId === UniqueRoomId) {
        setPinMessage('')
      }
    });
    //
    socket.on("rcvOwnMsg", (data) => {
      setChat((chat) => [...chat, data]);
      scrollChatMiddle();
    });
    return function cleanup() {
      socket.off('rcvOwnMsg');
      socket.off('loadData' + currentUser.Email);
      socket.off('pinLoad' + currentUser.Email);
      socket.off('blockResult' + currentUser.Email);
      socket.off('blockSuccess' + currentUser.Email);
      socket.off('blockedByAdmin' + currentUser.Email);
      socket.off('pinSuccess' + currentUser.Email);
      socket.off('newPinShow' + currentUser.Email);
      socket.off('EmojiStatus');
      socket.off('loadEmojiStatus' + currentUser.Email);
      socket.off('rcvEmoji');
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
  const floatEmoji = (emoji) => {
    let body = document.querySelector('.video-left-div');
    let myemoji = document.createElement('span');
    if (windowWidth > 768) {
      myemoji.style.top = 250 + Math.floor(Math.random() * 100) + 20 + 'px';
      myemoji.style.right = '360px';
    } else {
      myemoji.style.top = 150 + Math.floor(Math.random() * 100) + 20 + 'px';
      myemoji.style.right = '20px';
    }

    myemoji.classList.add('emoji-div');
    myemoji.innerHTML = emoji;
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

  const handleComment = (text) => {
    scrollChatMiddle()
  }

  return (
    <>
      <Head>
        <title>Truly Live | Video</title>
        <meta name="description" content="Truly Live - 100% Live by definition" />
        <style>{css}</style>
      </Head>
      <Navbar navData={navData} className={'position-relative'} />
      <div className="row" id="streamRow">
        <div className={`video-left-div  ${!sideMenu && 'close'} ${hideDrop && 'hide'}`}>
          {/* <button className={`comment-button btn btn-primary ${!sideMenu && 'd-none'}`} onClick={handleCommentMenu}><i className="fas fa-comment fa-lg"></i></button> */}
          <button className={`comment-button btn btn-primary ${!sideMenu && 'd-none'}`} onClick={handleCommentMenu}><BsChat size={24} /></button>
        </div>
        <div className={`comments-div ${sideMenu && 'close'}`}>
          <div className="comment-top">
            <div className="row">
              <div className="col-8">
                <span className='title'>Comments</span>
              </div>
              <div className="col-4 text-right pe-0">
                <a className='btn text-white pb-0' onClick={handleCommentMenu}>
                  <AiOutlineClose size={20} />
                </a>
              </div>
            </div>
            <hr />
          </div>
          <div className="comment-bottom">
            {
              pinMessage !== '' &&
              <div className='pin-message-row'>
                <div className="comment-row">
                  <div className="comment-right">
                    <div className='col-12'>
                      {
                        currentUser.isAdmin === true &&
                        <AiFillPushpin size={20} className={'cursor-pointer'} title={'Unpin Message'} onClick={handleRemovePin} />
                      }
                    </div>
                    <p className="comments">{pinMessage && pinMessage}
                    </p>
                  </div>
                </div>
              </div>
            }

            <div id='usersComments' className={`users-comments ${pinMessage && 'pinned'}`}>

              {
                chat && chat.length > 0 && chat.map((item, key) => (
                  <Comments chat={item} key={key} scrollChatMiddle={scrollChatMiddle} handleBlock={handleBlock} handlePinMessage={handlePinMessage} currentUser={currentUser} />
                ))
              }
            </div>
            <div className="comment-section">
              {
                blocked === true ?
                  <div className='col-12 text-center'>
                    <h5 className='text-warning'>Sorry! You've been blocked.</h5>
                  </div>
                  :
                  <Fragment>
                    {
                      showEmoji && (
                        <div style={emojiContainer}>
                          <Fragment>
                            <Picker
                              pickerStyle={{ width: '100%', height: '350px', backgroundColor: 'rgba(0,0,0,1)' }}
                              searchPlaceholder='Search Emoji'
                              disableSkinTonePicker={true}
                              onEmojiClick={(e, emoji) => handleEmojiSelect(e, emoji)} />
                          </Fragment>
                        </div>
                      )}
                    <div className="col-11">
                      <div className='d-flex'>
                        {
                          currentUser.isAdmin === true &&
                          <Fragment>
                            {
                              emojiStatus === 'unblock' ?
                                <img src='/images/emoji-block.png' className='cursor-pointer' title='Block Emoji' style={{ width: "30px", height: '30px', position: 'relative', top: '10px' }}
                                  onClick={() => {
                                    socket.emit("blockEmoji", {
                                      Status: 'block',
                                      RoomId: UniqueRoomId
                                    })
                                  }}
                                />
                                :
                                <img src='/images/emoji-check.png' className='cursor-pointer' title='Block Emoji' style={{ width: "30px", height: '30px', position: 'relative', top: '10px' }}
                                  onClick={() => {
                                    socket.emit("blockEmoji", {
                                      Status: 'unblock',
                                      RoomId: UniqueRoomId
                                    })
                                  }}
                                />
                            }


                          </Fragment>
                        }
                        {
                          emojiStatus === 'unblock' &&
                          <MdOutlineEmojiEmotions size={32} className={`react-button ${showEmoji ? 'show-emoji' : ''}`} onClick={() => setShowEmoji(!showEmoji)} />
                        }
                        <textarea
                          value={text}
                          className={'form-control input-box'}
                          onChange={(e) => setText(e.target.value)}
                          placeholder="Type a message"
                          onKeyDown={(e) => sendText(text, e)}
                        />
                      </div>
                    </div>
                    <div className="col-1 text-left">
                      <button className='btn ps-0 text-primary mt-2' onClick={() => sendText(text)}><AiOutlineSend size={30} style={{ position: 'relative', top: '-4px', color: 'white' }} /></button>
                    </div>
                  </Fragment>
              }
            </div>
          </div>
        </div>
      </div>
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