import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/arrow-right.svg';
import { TalkCard } from '../TalkCard/TalkCard';

export const CardSwiper = (props) => {

    const slides = [
        {
            img: 'sobaka1.png',
            title: 'комната',
            id: 1
        },
        {
            img: 'sobaka1.png',
            title: 'комната',
            id: 2
        },
        {
            img: 'sobaka1.png',
            title: 'комната',
            id: 3
        },
        {
            img: 'sobaka1.png',
            title: 'комната',
            id: 4
        },
        {
            img: 'sobaka1.png',
            title: 'комната',
            id: 5
        },
        {
            img: 'sobaka1.png',
            title: 'комната',
            id: 6
        },
        {
            img: 'sobaka1.png',
            title: 'комната',
            id: 1
        },
    ]

    const swiperRef = useRef();


    return (
        <>

            <div className="card_swiper-container">
                <button className={`${props.leftClass} swiper-button`} onClick={() => swiperRef.current?.slidePrev()}><ArrowLeft /></button>
                <Swiper className={`${props.className} card-swiper`} slidesPerView={props.slidesPerView}
                    modules={[Navigation]}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                >
                    {slides.map(({ title, id, img }) => (
                        <SwiperSlide>
                            <TalkCard name={title} img={img} id={id} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button className={`${props.rightClass} swiper-button`} onClick={() => swiperRef.current?.slideNext()}><ArrowRight /></button>
            </div>

        </>
    )
}
