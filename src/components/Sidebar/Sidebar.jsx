import React, { useContext, useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../../assets/icons/light-blue-logo.svg';
import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Rooms } from '../../assets/icons/rooms.svg';
import { ReactComponent as Settings } from '../../assets/icons/settings.svg';
import { ReactComponent as Exit } from '../../assets/icons/exit.svg';
import { ReactComponent as Cross } from '../../assets/icons/cross-close.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { AUTH_ROUTE, CATEGORIES_ROUTE, ROOMS_ROUTE, ROOM_ROUTE, SCREEN_SM, SETTINGS_ROUTE, USER_ROUTE } from '../../utils/consts';
import axios, { cookies, userUrl } from '../../axios';
import { useResize } from '../../hooks/useRisize';

export const Sidebar = () => {

    const [openSidebar, setOpenSidebar] = useState(false);

    const toggleSidebar = () => {
        setOpenSidebar(!openSidebar);
    }
    // const size = useResize();

    // const [isMobile, setIsMobile] = useState(false);

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

    // useEffect(() => {
    //     setIsMobile(size.width <= 768);
    // }, [size.width]);

    // const sidebarClass = isMobile ? 'sidebar_overflow mobile' : 'sidebar_overflow';

    return (
        <>
            {/* <div className={sidebarClass}> */}
                <div className={openSidebar ? 'sidebar open' : 'sidebar'}>
                    <div className="sidebar_mobil-cross" onClick={toggleSidebar}>
                        <Cross width={50} height={50} />
                    </div>
                    <div className="sidebar_wrapper">
                        <Logo className="sidebar_logo" width={100} />
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
            {/* </div> */}
        </>
    )
}
