import React, { useContext, useEffect, useState } from 'react';
import axios, { userUrl } from '../../axios';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { TalkCard } from '../../components/TalkCard/TalkCard';
import { AUTH_ROUTE, CATEGORIES_ROUTE, ROOM_ROUTE } from '../../utils/consts';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../context';
import { BottomModal } from '../../components/BottomModal/BottomModal';
import { ModalAceptContent } from '../../components/ModalAceptContent';

export const UserPage = () => {

  const { randomColor } = useContext(Context);
  const [user, setUser] = useState({});
  const [modalActive, setModalActive] = useState(false);
  const [component, setComponent] = useState('');

  const openModal = () => {
    setModalActive(!modalActive)
  }

  const navigate = useNavigate();

  const location = useLocation();
  const path = location.pathname;

  const pathParts = path.split('/');
  const userId = pathParts[2];
  console.log(userId);

  const checkAuth = async () => {
    try {
      const res = await axios.get(userUrl + 'identify/')
        .then(res => {
          if (res.status === 200) {
            console.log('auth', res.data);
          }
        })
    } catch (error) {
      if (error.response.status === 401) {
        navigate(AUTH_ROUTE)
      }
    }
  }

  const getOneUser = async () => {
    try {
      let link = userId === '' ? 'identify/' : userId + '/';
      const res = await axios.get(userUrl + link);
      console.log(res.data);
      setUser(res.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate(AUTH_ROUTE)
      }
    }
  }

  // getOneUser()

  useEffect(() => {
    checkAuth();
    getOneUser();
  }, [])

  return (
    <>

      <div className="user_page page">
        <div className="wrapper">
          <div className="page-container">
            <div className="page-scroll-container">
              {/* <Sidebar /> */}
              <div className="user_page-wrapper page-wrapper">
                <div className="user_page-half page-half" style={{ background: randomColor }}>
                  <div className="user_page-head page-head">
                    <span>User</span>
                  </div>
                  <div className="user_page-card page-card">
                    <div className="user_page-profile">
                      <div className="user_page-profile-icon">
                        <img src={`${user.avatar}`} alt="" />
                      </div>
                      <h1 className="user_page-profile-name">
                        {user.username}
                      </h1>
                      <span className='user_page-profile-email'>
                        {user.email}
                      </span>
                      <span className="user_page-profile-description">
                        {user.description}
                      </span>
                      <span className="user_page-profile-decency">
                        {user.user_decency?.current ? `Текущая порядочность: ${user.user_decency.current}` : 'Loading...'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="user_page-half">
                  <div className="user_page-head page-head">
                    <span>User’s room</span>
                  </div>
                  <div className="user_page-card">
                    <div className="user_page-list">
                      <div className="user_page-list-scroll">
                        {user.user_rooms?.map((room, index) => (
                          <TalkCard avatar={`${room.avatar}`}
                            key={index}
                            name={room.name}
                            decency={room.required_decency}
                            catId={room.cat.id}
                            path={`${CATEGORIES_ROUTE}/${room.cat.id}${ROOM_ROUTE}/${room.id}`}
                            onClick={(e) => { e.preventDefault(); setModalActive(true); setComponent(<ModalAceptContent roomId={room.id} catId={room.cat.id}/>) }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomModal className={modalActive ? 'open' : ''}
        onClose={openModal}
        component={component}></BottomModal>

    </>
  )
}
