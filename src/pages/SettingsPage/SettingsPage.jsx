import React, { useContext, useEffect, useState } from 'react'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import axios, { cookies, userUrl } from '../../axios';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import { Context } from '../../context';
import { Colors } from '../../utils/colors';

export const SettingsPage = () => {

    const { randomColor, dataAttribute, setDataAttribute } = useContext(Context);

    const [user, setUser] = useState({});
    const [isProfileVisible, setIsProfileVisible] = useState(true);
    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    const [transitionStage, setTransitionStage] = useState("fadeIn");
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState(null);

    const changeOpenSettings = () => {
        setTransitionStage("fadeOut");
        setTimeout(() => {
            setIsProfileVisible(!isProfileVisible);
            setIsSettingsVisible(!isSettingsVisible);
            setTransitionStage("fadeIn");
        }, 500); // Задержка в миллисекундах, соответствующая времени анимации
    };

    const changeTheme = () => {
        setDataAttribute(!dataAttribute)
    }

    const getUser = async () => {
        try {
            const res = await axios.get(userUrl + 'identify/')
                .then(res => {
                    setUser(res.data);
                    setUsername(res.data.username);
                    setEmail(res.data.email);
                    setDescription(res.data.description);
                })
        } catch (error) {
            console.error(error);
        }
    }

    const changeInfo = async () => {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('email', email);
            formData.append('description', description);
            if (icon != null) {
                formData.append("avatar", icon);
            }
            const res = await axios.patch(userUrl + user.id + '/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': cookies.get('csrftoken')
                }
            });
            setUser(res.data);

        } catch (error) {
            console.error(error);
        }
    }

    const choosePicture = event => {
        setIcon(event.target.files[0]);
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>

            <div className="settings_page page">
                <div className="wrapper">
                    <div className="page-container">
                        {/* <Sidebar /> */}
                        <div className="settings_page-wrapper page-wrapper">
                            <div className="settings_page-half page-half">
                                <div className="settings_page-head page-head">
                                    <span>User</span>
                                </div>
                                <div className="settings_page-card page-card" style={{ borderColor: randomColor }}>

                                    <div className={`settings_page-profile ${transitionStage}`}
                                        onAnimationEnd={() => {
                                            if (transitionStage === "fadeOut") {
                                                setTransitionStage("fadeIn");
                                            }
                                        }}
                                    >
                                        {isProfileVisible &&
                                            <>
                                                <button className="settings_button" onClick={changeOpenSettings}>
                                                    <Edit stroke={Colors.baseBlack}
                                                        onMouseEnter={e => e.target.style.stroke = randomColor}
                                                        onMouseLeave={e => e.target.style.stroke = Colors.baseBlack}
                                                    />
                                                </button>
                                                <div className="settings_page-profile-icon">
                                                    <img src={`${user.avatar}`} alt="" />
                                                </div>
                                                <h1 className="settings_page-profile-name">
                                                    {user.username}
                                                </h1>
                                                <span className='settings_page-profile-email'>
                                                    {user.email}
                                                </span>
                                                <span className="settings_page-profile-description">
                                                    {user.description}
                                                </span>
                                            </>
                                        }
                                        {isSettingsVisible &&
                                            <>
                                                <div className="settings_page-profile-icon">
                                                    <img src={`${user.avatar}`} alt="" />
                                                </div>
                                                <div className="change_icon">
                                                    <input type="file"
                                                        id="change_picture"
                                                        onInput={e => {
                                                            choosePicture(e)
                                                        }}
                                                        accept="image/jpeg,image/png,image/gif"
                                                    />
                                                    <span>Change picture</span>
                                                </div>
                                                <input type="text"
                                                    className='base_input'
                                                    placeholder="username"
                                                    onInput={e => setUsername(e.target.value)}
                                                    defaultValue={user.username}
                                                    // value={username}
                                                    onMouseEnter={e => e.target.style.borderColor = randomColor}
                                                    onMouseLeave={e => e.target.style.borderColor = Colors.baseBlack}
                                                />
                                                <input type="text"
                                                    className='base_input'
                                                    placeholder='Email'
                                                    onInput={e => setEmail(e.target.value)}
                                                    defaultValue={user.email}
                                                    onMouseEnter={e => e.target.style.borderColor = randomColor}
                                                    onMouseLeave={e => e.target.style.borderColor = Colors.baseBlack}
                                                />
                                                <textarea className='base_input'
                                                    placeholder='Profile description'
                                                    onInput={e => setDescription(e.target.value)}
                                                    defaultValue={user.description}
                                                    onMouseEnter={e => e.target.style.borderColor = randomColor}
                                                    onMouseLeave={e => e.target.style.borderColor = Colors.baseBlack}
                                                ></textarea>
                                                <button className='save_change'
                                                    onClick={() => { changeInfo(); changeOpenSettings(); }}
                                                    onMouseEnter={e => e.target.style.color = randomColor}
                                                    onMouseLeave={e => e.target.style.color = Colors.baseBlack}
                                                >Save all</button>
                                            </>

                                        }
                                    </div>

                                </div>
                            </div>
                            <div className="settings_page-half page-half">
                                <div className="settings_page-head page-head">
                                    <span>Theme</span>
                                </div>
                                <div className="settings_page-card page-card theme_card">
                                    <div className="settings_page-head page-head">
                                        <span>Theme</span>
                                    </div>
                                    <div className="settings_page-theme-buttons">
                                        <div className="light_theme">
                                            <span>Light theme</span>
                                            <button className="settings_page-theme-button"
                                                onClick={changeTheme}
                                                onMouseEnter={e => e.target.style.borderColor = randomColor}
                                                onMouseLeave={e => e.target.style.borderColor = Colors.baseBlack}
                                            >
                                                <img src={require('../../assets/images/light-theme.jpg')} />
                                            </button>
                                        </div>
                                        <div className="dark_theme">
                                            <span>Dark theme</span>
                                            <button className="settings_page-theme-button"
                                                onClick={changeTheme}
                                                onMouseEnter={e => e.target.style.borderColor = randomColor}
                                                onMouseLeave={e => e.target.style.borderColor = Colors.baseBlack}
                                            >
                                                <img src={require('../../assets/images/dark-theme.jpg')} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
