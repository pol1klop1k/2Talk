import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TalkCard } from '../../components/TalkCard/TalkCard';
import { PageLogo } from '../../components/PageLogo/PageLogo';
import { ReactComponent as Plus } from '../../assets/icons/plus.svg';
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/arrow-right.svg';
import axios, { chatsUrl } from '../../axios';
import { CATEGORIES_ROUTE, ROOMS_ROUTE, ROOM_ROUTE } from '../../utils/consts'
import { useLocation, useParams } from 'react-router-dom';
import { BottomModal } from '../../components/BottomModal/BottomModal';
import { ModalAceptContent } from '../../components/ModalAceptContent';
import { ModalCreateRoom } from '../../components/ModalCreateRoom';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Swiper, SwiperSlide } from 'swiper/react';

export const RoomsPage = () => {

    const sliderRef = useRef(null);

    const handlePrev = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }, []);

    const handleNext = useCallback(() => {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }, []);

    let [rooms, setRooms] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [component, setComponent] = useState('');
    const [categories, setCategories] = useState([]);

    const openModal = () => {
        setModalActive(!modalActive)
    }

    const params = useParams();

    console.log(params);

    const getCategories = async () => {
        try {
            const res = await axios.get(chatsUrl)
            console.log(res.data);
            setCategories(res.data);
        } catch (error) {

        }
    }

    const getRooms = async () => {
        try {

            const response = await axios.get(chatsUrl + params.id + '/rooms');
            setRooms(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const addRoom = (room) => {
        setRooms([...rooms, room]);
        console.log(setRooms);
    };

    useEffect(() => {
        getRooms();
        getCategories();
    }, []);

    return (
        <>
            <div className="rooms_page page">
                <div className="wrapper">
                    <div className="page-container">
                        <Sidebar />
                        <div className="rooms_page-wrapper">
                            <div className="rooms_page-head page-head">
                                <span>Rooms</span>
                                <button onClick={() => { openModal(); setComponent(<ModalCreateRoom />) }}><Plus /></button>
                            </div>
                            <div className="page-list-wrapper">
                                <div className="categories_swiper">
                                    <div className="prev-arrow" onClick={handlePrev}><ArrowLeft /></div>
                                    <Swiper ref={sliderRef} slidesPerView={'4'} spaceBetween={'25'}>
                                        {categories.map(category => (
                                            <SwiperSlide>
                                                <TalkCard path={`${CATEGORIES_ROUTE}/${category.id}${ROOMS_ROUTE}`}
                                                    name={category.title} icon={category.avatar}/>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <div className="next-arrow" onClick={handleNext}><ArrowRight /></div>
                                </div>

                                <div className="page-list">

                                    {
                                        rooms?.map((room, index) => (
                                            <TalkCard path={`${CATEGORIES_ROUTE}/${params.id}${ROOM_ROUTE}/${room.id}`}
                                                key={index}
                                                name={room.name}
                                                decency={`${room.required_decency}`}
                                                avatar={room.avatar}
                                                onClick={(e) => { e.preventDefault(); console.log('123'); setModalActive(true); setComponent(<ModalAceptContent roomId={room.id}/>) }}
                                            >
                                            </TalkCard>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomModal
                className={modalActive ? 'open' : ''}
                onClose={openModal}
                component={component}
            />
        </>
    );
};