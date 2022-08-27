import { Fragment, useEffect } from "react"
import { AiOutlinePushpin } from "react-icons/ai";
import { MdOutlineBlock } from 'react-icons/md'

const Comments = ({ chat, scrollChatMiddle, handleBlock, handlePinMessage, currentUser }) => {
    useEffect(() => {
        scrollChatMiddle();
    }, [chat])
    return (
        <Fragment>
            <div className="comment-row">
                <div className="comment-left">
                    <img src={chat && chat.SenderPic ? chat.SenderPic : "/images/audience.png"} alt="audience" />

                </div>
                <div className="comment-right">
                    <h6 className="d-flex">{chat && chat.SenderName}
                        {
                            currentUser.isAdmin === true &&
                            <MdOutlineBlock className={`ms-2 text-danger cursor-pointer`} title={'Block'} size={20} onClick={() => handleBlock(chat)} />
                        }
                    </h6>
                    <div className="col-12 text-right">
                        {
                            currentUser.isAdmin === true &&
                            <AiOutlinePushpin className={`cursor-pointer`} title={'Pin Message'} size={20} onClick={() => handlePinMessage(chat)} />
                        }
                    </div>
                    <p className="comments">{chat && chat.Message}
                    </p>
                    <div className="comment-time">{chat && chat.DateTime}</div>
                </div>
            </div>
        </Fragment>
    )
}

export default Comments