import React, { useContext } from 'react';
import { ReactComponent as Report } from '../../assets/icons/report.svg';
import { Context } from '../../context';
import axios, { chatsUrl, cookies } from '../../axios';

export const Message = (props) => {

    const { randomColor } = useContext(Context);

    const report = async() => {
        try {
            const res = await axios.post('api/v1/chats/reports/', {"text": props.message, "user": props.userId}, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': cookies.get('csrftoken')
                }
            });
            
        } catch (error) {
            
        }
    }

    return (
        <>
            <div className={`message_container ${props.className} ${props.own ? '' : 'another'}`}>
                <div className="message">
                    <div className="message_user-icon">
                        <img src={props.avatar} alt="" />
                    </div>
                    <div className="message_content">
                        <span className='message_name' style={{color: randomColor}}>{props.name}</span>
                        <span className='message_text'>{props.message}</span>
                        <button className="report" onClick={() => report()}>
                            <Report fill={randomColor}/>
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}
