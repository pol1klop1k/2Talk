import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios, { chatsUrl, cookies, userUrl } from '../axios';
import { CATEGORIES_ROUTE, ROOM_ROUTE } from '../utils/consts';
import { ReactComponent as ArrowLeft } from '../assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../assets/icons/arrow-right.svg';
import { Swiper, SwiperSlide } from 'swiper/react';

export const ModalCreateRoom = () => {

    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    const [categories, setCategories] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [description, setDescription] = useState('');
    const [decency, setDecency] = useState();
    const [error, setError] = useState('');
    const [icons, setIcons] = useState([]);

    const params = useParams();
    const navigate = useNavigate();
    // const location = useLocation();

    const getIcons = async () => {
        try {
            const res = await axios.get(userUrl + 'icons/');
            setIcons(res.data);
        } catch (error) {

        }
    }

    const createRoom = async () => {
        try {
            const formData = new FormData();
            formData.append('name', roomName);
            formData.append('required_decency', decency);
            formData.append('description', description);

            const res = await axios.post(chatsUrl + params.id + '/rooms/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': cookies.get('csrftoken')
                }
            });

            if (res.status === 200) {
                // window.location.reload;
            } else {
                setError(`Error creating room: ${res.status} ${res.statusText}`);
            }

            console.log(res.data);
            const updatedCategories = [...categories, res.data];
            setCategories(updatedCategories);

            console.log(roomName);
            navigate(CATEGORIES_ROUTE + '/' + params.id + '/room/' + res.data.id);
        } catch (error) {
            console.error(error);
        }
    };

    const addIcon = () => {

    }

    useEffect(() => {
        getIcons();
    }, [])

    return (
        <>
            <div className="create_modal">
                <span>Create a new room!</span>
                <form>
                    <input type="text"
                        className='base_input'
                        placeholder='Name'
                        onChange={e => setRoomName(e.target.value)}
                        value={roomName}
                    />
                    <input type="text"
                        className='base_input'
                        placeholder='Decency'
                        onChange={e => setDecency(e.target.value)}
                        value={decency}
                    />
                    <textarea
                        className='base_input'
                        placeholder='Description'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    />
                    <span className='choose_span'>Choose the icon for your room</span>
                </form>
                <button onClick={() => createRoom()}>Add</button>
            </div>
        </>
    )
}
