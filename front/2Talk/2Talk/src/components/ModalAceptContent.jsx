import React, { useEffect, useState } from 'react'
import axios, { chatsUrl, cookies } from '../axios';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

export const ModalAceptContent = (roomId) => {

    const [addUser, setAddUser] = useState();
    const [room, setRoom] = useState({});

    const params = useParams();

    const navigate = useNavigate();

    console.log(roomId, params.id);

    const joinRoom = async () => {
        console.log(cookies.get('csrftoken'));
        try {
            const res = await axios.post(chatsUrl + params.id + '/rooms/' + roomId.roomId + '/join_room/', {}, {
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': cookies.get('csrftoken')
                }
            })
            navigate(`/categories/${params.id}/room/${roomId.roomId}`);
        } catch (error) {

        }
    }

    const getRoom = async () => {
        try {
            const res = await axios.get(chatsUrl + params.id + '/rooms/' + roomId.roomId + '/');
            // console.log(res.data);
            setRoom(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getRoom()
    }, [])

    return (
        <div>
            <div className="acept_modal">
                <div className="acept_modal-wrapper">
                    <span className='room_name'>{room.name}</span>
                    <span className='room_description'>{room.description}</span>
                    <span className='room_decency'>{`Decency: ${room.required_decency}`}</span>
                    <button onClick={() => { joinRoom(); }}>Try to talk</button>
                </div>
            </div>
        </div>
    )
}
