import React, { useEffect, useState } from 'react'
import axios, { chatsUrl, cookies } from '../axios';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

export const ModalAceptContent = (props) => {

    const [addUser, setAddUser] = useState();
    const [room, setRoom] = useState({});

    const params = useParams();

    const room_id = props.roomId ? props.roomId : params.roomId;
    const cat_id = props.catId ? props.catId : Number.parseInt(params.id);

    console.log(room_id, cat_id);

    const navigate = useNavigate();

    const joinRoom = async () => {
        console.log(cookies.get('csrftoken'));
        try {
            const res = await axios.post(chatsUrl + cat_id + '/rooms/' + room_id + '/join_room/', {}, {
                headers: {
                    'X-CSRFToken': cookies.get('csrftoken')
                }
            })
            navigate(`/categories/${cat_id}/room/${room_id}`);
        } catch (error) {

        }
    }

    const getRoom = async () => {
        try {
            const res = await axios.get(chatsUrl + cat_id + '/rooms/' + room_id + '/');
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
