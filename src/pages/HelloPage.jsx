import React, { useState, useEffect, useContext } from 'react';
import { ReactComponent as Logo } from '../assets/icons/light-blue-logo.svg';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AUTH_ROUTE, USER_ROUTE } from '../utils/consts';
import { CSS } from '../utils/colors';
import { Colors } from '../utils/colors';
import axios, { userUrl } from '../axios';
import { Context } from '../context';


export const HelloPage = () => {
    const { randomColor } = useContext(Context)
    const location = useLocation();

    const navigate = useNavigate();

    const checkAuth = async () => {
        try {
            const res = await axios.get(userUrl + 'identify/')
                .then(res => {
                    if (res.status === 200) {
                        navigate(USER_ROUTE)
                    }
                })
        } catch (error) {
            if (error.response.status === 401) {
                navigate(AUTH_ROUTE)
            }
        }
    }

    useEffect(() => {
        console.log(location.pathname)
    }, [])

    return (
        <>
            <div className="hello_page">
                <div className="wrapper hello_page-wrapper">
                    <Logo fill={randomColor} />
                    <div className="hello_page-link">
                        <NavLink onClick={checkAuth} onMouseEnter={e => e.target.style.color = randomColor} onMouseLeave={e => e.target.style.color = Colors.baseBlack}>
                            Try to talk!
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}