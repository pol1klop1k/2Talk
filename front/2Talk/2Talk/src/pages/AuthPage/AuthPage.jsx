import React, { useEffect, useState } from 'react';
import axios, { cookies, userUrl } from '../../axios';
import { ReactComponent as Logo } from '../../assets/icons/light-blue-logo.svg';
import { CSS, Colors } from '../../utils/colors';
import { useNavigate } from 'react-router-dom';
import { USER_ROUTE } from '../../utils/consts';

export const AuthPage = ({ isLogin, toggleLogin }) => {

    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isAuth, setIsAuth] = useState(true);
    const [logoColor, setLogoColor] = useState(CSS.lightBlue);
    const [isRegFormVisible, setIsRegFormVisible] = useState(true);
    const [isLogFormVisible, setIsLogFormVisible] = useState(false);
    const [transitionStage, setTransitionStage] = useState("fadeIn");

    const changeAuth = () => {
        setTransitionStage("fadeOut");
        setTimeout(() => {
            setIsRegFormVisible(!isRegFormVisible);
            setIsLogFormVisible(!isLogFormVisible);
            setTransitionStage("fadeIn");
        }, 500);
    };

    const navigate = useNavigate();

    const getUsers = async () => {
        try {
            const response = await axios.get(userUrl);
            setUsers(response.data)
        } catch (error) {
            console.error('oshibka');
        }
    }

    const login = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            const response = await axios.post(userUrl + 'auth/login/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': cookies.get('csrftoken')
                }
            }).then(res => {
                if (res.status === 200) {
                    navigate(USER_ROUTE);
                }
            })

        } catch (error) {
            console.error('Ошибка при входе:', error);
        }
    }

    const reg = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            formData.append('email', email);

            const response = await axios.post(userUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': cookies.get('csrftoken')
                }
            }).then(res => console.log(res)).catch(error => console.log(error))

            const updateUsers = [...users, response.data]
            setUsers(updateUsers);
        } catch (error) {

        }
    }

    useEffect(() => {
        // getUsers();
        console.log(users);
        const randomColor = CSS[Object.keys(CSS)[Math.floor(Math.random() * Object.keys(CSS).length)]];
        setLogoColor(randomColor);
    }, [])

    return (
        <>
            <div className="auth">
                <div className="auth_wrapper wrapper">
                    <div
                        className={`auth_wrapper content_wrapper ${transitionStage}`}
                        onAnimationEnd={() => {
                            if (transitionStage === "fadeOut") {
                                setTransitionStage("fadeIn");
                            }
                        }}
                    >
                        {isRegFormVisible &&
                            <div className="auth_reg-form">
                                <div className="auth_header">
                                    <Logo fill={logoColor} width={250} />
                                    <span>Ready to talk?</span>
                                </div>
                                <form onSubmit={reg}>
                                    <input type="text"
                                        className='base_input'
                                        placeholder='Username'
                                        onChange={(e) => setUsername(e.target.value)}
                                        value={username}
                                        onMouseEnter={e => e.target.style.borderColor = logoColor}
                                        onMouseLeave={e => e.target.style.borderColor = Colors.baseBlack}
                                    />
                                    <input type="text"
                                        className='base_input'
                                        placeholder='Email'
                                        onChange={e => setEmail(e.target.value)}
                                        value={email}
                                        onMouseEnter={e => e.target.style.borderColor = logoColor}
                                        onMouseLeave={e => e.target.style.borderColor = Colors.baseBlack}
                                    />
                                    <input type="password"
                                        className='base_input'
                                        placeholder='Password'
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                        onMouseEnter={e => e.target.style.borderColor = logoColor}
                                        onMouseLeave={e => e.target.style.borderColor = Colors.baseBlack}
                                    />
                                    <button className='auth_submit' type="submit" onClick={changeAuth}>Registration</button>
                                </form>
                            </div>

                        }
                        {isLogFormVisible &&
                            <div className="auth_log-form">
                                <div className="auth_header">
                                    <Logo fill={logoColor} width={270} />
                                    <span>Ready to talk?</span>
                                </div>
                                <form onSubmit={login}>
                                    <input type="text"
                                        className='base_input'
                                        placeholder='Username'
                                        onChange={(e) => setUsername(e.target.value)}
                                        value={username}
                                        onMouseEnter={e => e.target.style.borderColor = logoColor}
                                        onMouseLeave={e => e.target.style.borderColor = Colors.baseBlack}
                                    />
                                    <input type="password"
                                        className='base_input'
                                        placeholder='Password'
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                        onMouseEnter={e => e.target.style.borderColor = logoColor}
                                        onMouseLeave={e => e.target.style.borderColor = Colors.baseBlack}
                                    />
                                    <button className='auth_submit' type="submit">Login</ button>
                                </form>
                            </div>
                        }
                        <button className='change_form' onClick={changeAuth}>
                            {isRegFormVisible ? 'Not a newcomer? Keep up to talk!' : 'Newcomer? Register here!'}
                        </button>
                    </div>
                </div >
            </div >
        </>
    )
}
