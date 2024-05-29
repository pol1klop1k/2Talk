import React, { useContext, useEffect, useRef, useState } from 'react'
import { PageLogo } from '../../components/PageLogo/PageLogo'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios, { chatsUrl, cookies, userUrl } from '../../axios';
import { Message } from '../../components/Message/Message';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { RoomSidebar } from './RoomSidebar';
import { CATEGORIES_ROUTE } from '../../utils/consts';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Context } from '../../context';
import { CSS } from '../../utils/colors';
import { Colors } from '../../utils/colors';

export const RoomPage = (props) => {
    const params = useParams();
    const [chatLog, setChatLog] = useState('');
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState({});
    const [user, setUser] = useState({});
    // const [users, setUsers] = useState([]);
    const [bool, setBool] = useState(false);
    const [room, setRoom] = useState({});
    const chatSocketRef = useRef(null);
    const messageContainerRef = useRef(null);

    const { randomColor } = useContext(Context)

    const location = useLocation();
    const path = location.pathname;

    const navigate = useNavigate();

    const room_id = params.id

    const pathParts = path.split('/');
    const categoryIndex = pathParts.indexOf('categories');
    const category_id = pathParts[categoryIndex + 1];

    const getIdentify = async () => {
        try {
            const res = await axios.get(userUrl + 'identify/');
            setUser(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const getRoom = async () => {
        try {
            const res = await axios.get(chatsUrl + category_id + '/rooms/' + params.id + '/');
            setRoom(res.data);
            // setUsers(res.data.user);
        } catch (error) {
            console.error(error);
        }
    }

    const getAllMessage = async () => {
        try {
            const res = await axios.get(chatsUrl + category_id + '/rooms/' + params.id + '/messages/')
            setMessages(res.data);
        } catch (error) {

        }
    }

    const addMessage = async () => {
        try {

            const formData = new FormData();
            formData.append('text', messageInput);

            const res = await axios.post(chatsUrl + category_id + '/rooms/' + params.id + '/messages/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': cookies.get('csrftoken')
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    const leaveFromRoom = async () => {
        const res = await axios.get(chatsUrl + category_id + '/rooms/' + params.id + '/left_room/');
        navigate(CATEGORIES_ROUTE + '/' + category_id + '/rooms/');
    }

    useEffect(() => {
        getAllMessage();
        console.log(messages);
        getRoom();
        getIdentify();

        chatSocketRef.current = new WebSocket(
            'ws://localhost:8000/ws/chat/' + params.id + '/'
        );

        chatSocketRef.current.onopen = () => {
            console.log(chatSocketRef.current.readyState);
        };

        chatSocketRef.current.onmessage = function (e) {
            const data = JSON.parse(e.data);
            console.log(data);
            if (data.type == "message") {
                setMessages(prevMessages => [...prevMessages, data]);
            } else if (data.type == "join") {
                // setUsers(prevUsers => [...prevUsers, data]);
                setBool(prevBool => !prevBool);
            }
        };

        return () => {
            chatSocketRef.current.close();
        };
    }, [params.id]);

    const submit = () => {
        setMessageInput('');

        if (chatSocketRef.current && chatSocketRef.current.readyState === WebSocket.OPEN) {
            chatSocketRef.current.send(JSON.stringify({
                'message': messageInput
            }));
            addMessage()

            const lastMessage = [...messageContainerRef.current.querySelectorAll('.message')].pop();
            console.log(lastMessage);
            if (lastMessage) {
                lastMessage.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            console.error('WebSocket connection is not open.');
        }
    };

    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            submit();
        }
    };

    return (
        <>
            <div className="room_page page">
                <div className="wrapper">
                    <div className="page-container">
                        <Sidebar />
                        <div className="room_page-wrapper">
                            <div className="categories_page-head page-head">
                                <span>{room.name}</span>
                            </div>
                            <div className="messenger_container-content">
                                <div className="bubbles-container">
                                    <div className="bubbles-container">
                                        <div id="chat-log" ref={messageContainerRef} className="message-container">

                                            {messages?.map((message) => (
                                                <TransitionGroup className="bubbles-group">
                                                    <CSSTransition key={message.id || `${message.user.id}-${message.timestamp}`} timeout={500} classNames="message">
                                                        <Message userId={message.user.id} avatar={message.user.avatar} message={message.text} name={message.user.username} own={user.id === message.user.id} />
                                                    </CSSTransition>
                                                </TransitionGroup>
                                            ))}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="messenger_container-bot">
                                <div className="messenger_container-bot-input">
                                    <input id="chat-message-input"
                                        type="text"
                                        placeholder='Введите сообщение'
                                        onKeyUp={pressEnter}
                                        onInput={(e) => setMessageInput(e.target.value)}
                                        value={messageInput}
                                    />
                                    <button id="chat-message-submit" onClick={submit}
                                        onMouseEnter={e => e.target.style.background = randomColor}
                                        onMouseLeave={e => e.target.style.background = Colors.baseWhite}>
                                        <PageLogo />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <RoomSidebar bool={bool} category_id={category_id} room_id={room_id} onClick={leaveFromRoom} />
                    </div>
                </div>
            </div>
        </>
    )
};
