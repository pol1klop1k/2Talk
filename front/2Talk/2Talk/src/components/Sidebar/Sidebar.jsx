import React, { useContext, useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../../assets/icons/light-blue-logo.svg';
import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Rooms } from '../../assets/icons/rooms.svg';
import { ReactComponent as Settings } from '../../assets/icons/settings.svg';
import { ReactComponent as Exit } from '../../assets/icons/exit.svg';
import { ReactComponent as ArrowUp } from '../../assets/icons/arrow-up.svg';
import { ReactComponent as ArrowDown } from '../../assets/icons/arrow-down.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { AUTH_ROUTE, CATEGORIES_ROUTE, ROOMS_ROUTE, ROOM_ROUTE, SETTINGS_ROUTE, USER_ROUTE } from '../../utils/consts';
import { Navigation } from 'swiper/modules';
import { Colors } from '../../utils/colors';
import axios, { cookies, userUrl } from '../../axios';

export const Sidebar = () => {

    const navigate = useNavigate();

    const logOut = async () => {
        try {
            const res = await axios.post(userUrl + 'auth/logout/', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': cookies.get('csrftoken')
                }
            })
            navigate(AUTH_ROUTE);
        } catch (error) {

        }
    }

    return (
        <>

            <div className="sidebar">
                <div className="sidebar_wrapper">
                    <Logo className="sidebar_logo" />
                    <ul className="sidebar_list">
                        <li className="sidebar_list-item">
                            <NavLink to={USER_ROUTE}><User /></NavLink>
                        </li>
                        <li className="sidebar_list-item">
                            <NavLink to={CATEGORIES_ROUTE}><Rooms /></NavLink>
                        </li>
                        <li className="sidebar_list-item">
                            <NavLink to={SETTINGS_ROUTE}><Settings /></NavLink>
                        </li>
                        <button className='sidebar_list-item' onClick={logOut}><Exit /></button>
                    </ul>
                </div>
            </div>

        </>
    )
}
