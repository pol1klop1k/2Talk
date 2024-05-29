import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { ReactComponent as Logo } from '../../assets/icons/light-blue-logo.svg';
import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Rooms } from '../../assets/icons/rooms.svg';
import { ReactComponent as Settings } from '../../assets/icons/settings.svg';
import { ReactComponent as Exit } from '../../assets/icons/exit.svg';
import { ReactComponent as ArrowUp } from '../../assets/icons/arrow-up.svg';
import { ReactComponent as ArrowDown } from '../../assets/icons/arrow-down.svg';
import { Link, NavLink } from 'react-router-dom';
import { CATEGORIES_ROUTE, ROOMS_ROUTE, ROOM_ROUTE, SETTINGS_ROUTE, USER_ROUTE } from '../../utils/consts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Colors } from '../../utils/colors';

export const Sidebar = () => {

    const swiperRef = useRef();

    return (
        <>

            <div className="sidebar">
                <div className="sidebar_wrapper">
                    <Logo className="sidebar_logo" fill={Colors.baseBlack} />
                    <ul className="sidebar_list">
                        <li className="sidebar_list-item">
                            <NavLink to={USER_ROUTE}><User /></NavLink>
                        </li>
                        <li className="sidebar_list-item">
                            <NavLink to={CATEGORIES_ROUTE}><Rooms /></NavLink>
                        </li>
                        {/* <div className="sidebar_swiper-wrap">
                            <button className='swiper-button sidebar-swiper-prev' onClick={() => swiperRef.current?.slidePrev()}><ArrowUp /></button>
                            <Swiper className='sidebar_swiper'
                                direction={'vertical'}
                                slidesPerView={4}
                                spaceBetween={10}
                                modules={[Navigation]}
                                onBeforeInit={(swiper) => {
                                    swiperRef.current = swiper;
                                }}
                            >
                                {slides.map(({ img, path }, index) => (
                                    <SwiperSlide className='sidebar_swiper-slide' key={index}>
                                        <div className="sidebar_swiper-slide-content">
                                            <Link to={path}>
                                                <img src={require(`../../assets/images/${img}`)} alt="" />
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <button className='swiper-button sidebar-swiper-next' onClick={() => swiperRef.current?.slideNext()}><ArrowDown /></button>
                        </div> */}
                        <li className="sidebar_list-item">
                            <NavLink to={SETTINGS_ROUTE}><Settings /></NavLink>
                        </li>
                        <button className='sidebar_list-item'><Exit /></button>
                    </ul>
                </div>
            </div>

        </>
    )
}
