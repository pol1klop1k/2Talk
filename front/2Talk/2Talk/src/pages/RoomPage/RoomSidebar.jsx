import React, { useEffect, useState } from 'react';
import { ReactComponent as Cross } from '../../assets/icons/cross-close.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios, { chatsUrl } from '../../axios';
import { NavLink } from 'react-router-dom';
import { USER_ROUTE } from '../../utils/consts';

export const RoomSidebar = (props) => {

    const [room, setRoom] = useState({});

    const getUsers = async () => {
        try {
            const res = await axios.get(chatsUrl + props.category_id + '/rooms/' + props.room_id + '/');

            setRoom(res.data);
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>

            <div className="room_sidebar">
                <button className="room_sidebar-cross" onClick={props.onClick}>
                    <Cross />
                </button>
                <div className="room_sidebar-slider">
                    <Swiper direction='vertical'
                        slidesPerView={6}
                        spaceBetween={'20'}
                    >
                        {room.user?.map(user => (
                            <SwiperSlide>
                                <NavLink to={`${USER_ROUTE}${user.id}`}>
                                    <img src={`${user?.avatar}`} alt="" />
                                </NavLink>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

        </>
    )
}
