import { useEffect, useState, Fragment, useMemo } from 'react'
import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { baseUrl } from '../backend'
import cookie from 'cookie'
import 'bootstrap/dist/css/bootstrap.min.css';
import Comments from '../components/comments'
import { useRouter } from 'next/router';
import { AiOutlineClose, AiOutlineSend } from 'react-icons/ai'
import { BsChat } from 'react-icons/bs'
import { MdOutlineEmojiEmotions } from 'react-icons/md'
import io from 'socket.io-client';
let Picker;
if (typeof window !== 'undefined') {
  import('emoji-picker-react').then(_module => {
    Picker = _module.default;
  });
}
//Chat server URL
//const ChatEndPoint = "https://truly-live-chat-backend.vercel.app/";
const ChatEndPoint = "https://trulylivechatbackend.herokuapp.com/"
// 

export default function Home({ navData, footerData, videoData, profileData, token, eventData }) {

  let router = useRouter();
  const [text, setText] = useState('')
  const [windowSize, setWindowSize] = useState(null);
  const [sideMenu, setSideMenu] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [hideDrop, setHideDrop] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    Image: profileData && profileData.image.url,
    Email: profileData.email
  });

  //Unique Room By URL path name
  const UniqueRoomId = router.pathname;
  //
  //socket initial
  const socket = io(ChatEndPoint, { transports: ["websocket", "polling", "flashsocket"], forceNew: true });
  var selectedUserId = "";
  const [chat, setChat] = useState([]);

  //
  useEffect(() => {
    setWindowWidth([window.innerWidth])
    window.addEventListener("resize", changeWindowWidth);
  }, []);

  useEffect(() => {
    triggerSideBar();
  }, [windowWidth]);
  const changeWindowWidth = () => {
    setWindowWidth([window.innerWidth]);
  }

  const triggerSideBar = () => {
    if (windowWidth <= 992) {
      setSideMenu(false);
    } else {
      setSideMenu(true);
    }
  }
  const LoadData = () => {
    socket.emit("loadAllComment", { OwnUnique: currentUser.Email, RoomId: UniqueRoomId })
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
    socket.on("rcvOwnMsg", (data) => {
      console.log(data);
      setChat((chat) => [...chat, data]);
      scrollChatMiddle();
    });
    return function cleanup() {
      socket.off('rcvOwnMsg');
      socket.off('loadData' + currentUser.Email);
    }
  }, [])
  const scrollChatMiddle = () => {
    document.getElementById('usersComments').scrollTop = document.getElementById('usersComments').scrollHeight;
  }
  const sendText = (data, e) => {
    // document.getElementById('messageBox').value = '';
    if (text.trim() !== '') {
      if (e.keyCode === 13 && !e.shiftKey) {
        if (data && data.trim() !== '') {
          socket.emit("sendMessage", { Email: currentUser.Email, OwnPic: currentUser.Image, Message: data, RoomId: UniqueRoomId })
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
  // const hitEnter = (e) => {
  //   if (text.trim() !== '') {
  //     if (e.keyCode === 13 && !e.shiftKey) {
  //       document.getElementById('btnSend').click();
  //       e.preventDefault();
  //     }
  //   } else {
  //     if (e.keyCode === 13)
  //       e.preventDefault();
  //   }

  // }
  useEffect(() => {
    const addToDB = async () => {
      try {
        const res = await fetch(`${baseUrl}/visits`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ data: { username: profileData?.username, email: profileData?.email } })
        })
        const data = await res.json()
      } catch (error) {
        console.log(error)
        // alert(error.response.data.message[0].messages[0].message)
      }
    }
    addToDB();
  }, [profileData?.username, profileData?.email, token])

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize(window.innerWidth)
    })
    scrollChatMiddle();

  }, [windowSize])
  const handleComment = (text) => {
    console.log('enter', text);
    scrollChatMiddle();
  }
  const handleCommentMenu = () => {
    document.getElementById('usersComments').style.height = document.getElementById('streamingVideo').scrollHeight - 150 + 'px';
    scrollChatMiddle();
    setSideMenu(!sideMenu);
    hideDrop === null ? setHideDrop(false) : setHideDrop(!hideDrop);
    LoadData();
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
    background-color:rgba(0,0,0,0.7)
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
  
  `
  const emojiContainer = {
    position: 'absolute',
    marginTop: '-360px',
    marginLeft: '-20px',
    width: 'calc(100% - 10px)',
  }

  const handleEmojiSelect = (e, emojiData) => {

    let body = document.querySelector('.video-left-div');
    let myemoji = document.createElement('span');
    let x = e.screenX;
    let y = e.screenY;
    myemoji.style.top = 250 + Math.floor(Math.random() * 100) + 20 + 'px';
    myemoji.style.right = '360px';
    myemoji.classList.add('emoji-div');
    myemoji.innerHTML = `<img src='${getImageEmoji(emojiData)}' data-emoji='${emojiData.emoji}' />`;
    console.log();
    let sizeEmoji = Math.random() + 1 * 50;
    myemoji.style.fontSize = sizeEmoji + 10 + 'px';
    body.appendChild(myemoji);

    setTimeout(() => {
      myemoji.remove();
    }, 4000);
    // setShowEmoji(!showEmoji)
    // document.addEventListener('mousemove', (e) => {
    //   let body = document.querySelector('body');
    //   let myemoji = document.createElement('span');
    //   let x = e.offsetX;
    //   let y = e.offsetY;
    //   myemoji.style.top = 500 + 'px';
    //   myemoji.style.right = '400px';
    //   myemoji.classList.add('emoji-div');
    //   myemoji.innerText = emojiData.emoji;

    //   let sizeEmoji = Math.random() * 50;
    //   myemoji.style.fontSize = sizeEmoji + 10 + 'px';
    //   body.appendChild(myemoji);

    //   setTimeout(() => {
    //     myemoji.remove();
    //   }, 3000);
    // })
    // document.querySelector('.emoji-img').addEventListener('mousedown', (e) => {
    //   let body = document.querySelector('body');
    //   let myemoji = document.createElement('span');
    //   let x = e.offsetX;
    //   let y = e.offsetY;
    //   myemoji.style.top = 500 + 'px';
    //   myemoji.style.right = '400px';
    //   myemoji.classList.add('emoji-div');
    //   myemoji.innerText = emojiData.emoji;

    //   let sizeEmoji = Math.random() * 50;
    //   myemoji.style.fontSize = sizeEmoji + 10 + 'px';
    //   body.appendChild(myemoji);

    //   setTimeout(() => {
    //     myemoji.remove();
    //   }, 4000);
    // })
    // return function cleanup() {
    //   document.addEventListener('mousemove', (e) => { })
    //   document.addEventListener('mousedown', (e) => { })
    // }
  }

  return (
    <Fragment>
      <style>{css}</style>
      <Head>
        <title>Truly Live | Video</title>
        <meta name="description" content="Truly Live - 100% Live by definition" />
      </Head>
      <Navbar navData={navData} className={'position-relative'} />
      <div className="row" id='streamRow'>
        <div className={`video-left-div  ${!sideMenu && 'close'} ${hideDrop && 'hide'}`}>
          <video
            src={videoData?.videoURL}
            // src={"http://techslides.com/demos/sample-videos/small.mp4"}
            controls
            id='streamingVideo'
            name='streamingVideo'
            className="min-w-full"
            autoPlay
            poster={videoData?.videoThumbnail?.data?.attributes?.url}
          />
          <button className={`comment-button btn btn-primary ${!sideMenu && 'd-none'}`} onClick={handleCommentMenu}><BsChat size={24} /></button>
        </div>
        <div className={`comments-div ${sideMenu && 'close'}`}>
          <div className="comment-top">
            <div className="row">
              <div className="col-8">
                <span className='title'>Comments</span>
              </div>
              <div className="col-4 text-right">
                <a className='btn text-white pb-0' onClick={handleCommentMenu}>
                  <AiOutlineClose size={20} />
                </a>
              </div>
            </div>
            <hr />
          </div>
          <div className="comment-bottom">
            <div id='usersComments' className="users-comments">

              {
                chat && chat.length > 0 && chat.map((item, key) => (
                  <Comments chat={item} key={key} scrollChatMiddle={scrollChatMiddle} />
                ))
              }
            </div>
            <div className="comment-section">
              {showEmoji && (
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
                  <MdOutlineEmojiEmotions size={32} className='react-button' onClick={() => setShowEmoji(!showEmoji)} />
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
            </div>
          </div>
        </div>
      </div>
      <Footer footerData={footerData} />
    </Fragment>
  )
}

export const getServerSideProps = async ({ req }) => {
  const { token } = cookie.parse(req ? req.headers.cookie || '' : '')

  const videRes = await fetch(`${baseUrl}/homes?populate=*`)
  const videoData = await videRes.json()
  const navRes = await fetch(`${baseUrl}/nav-bars?populate=%2A`)
  const navData = await navRes.json()
  const footerRes = await fetch(`${baseUrl}/footers?populate=*`)
  const footerData = await footerRes.json()
  const eventRes = await fetch(`${baseUrl}/events?populate=*`)
  const eventData = await eventRes.json()
  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const res = await fetch(`${baseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()

  return {
    props: {
      navData: navData.data[0].attributes,
      videoData: videoData.data[0].attributes,
      footerData: footerData.data[0].attributes,
      eventData: eventData.data[0].attributes,
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