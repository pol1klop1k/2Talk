import React from 'react'
import { NavLink } from 'react-router-dom'

export const TalkCard = (props) => {

    // console.log(props.catId); // выводит нужное значение

    return (
        <>

            <NavLink className='talk_card-link' to={{ pathname: props.path, state: {category: props.catId} }} state={props.catId} onClick={props.onClick}>
                <div className="talk_card">
                    <div className="talk_card-wrapper">
                        {props.icon && <img className='card_bg' src={`${props.icon}`} alt="" />}
                        <div className="talk_card-img-wrapper">
                            {props.avatar && <img src={`${props.avatar}`} alt="" />}
                        </div>
                        <div className="talk_card-info">
                            <p>{props?.name}</p>
                            {props.decency && <p className='room_card-decency'>{`Требуемая порядочность: ${props?.decency}`}</p>}
                        </div>
                    </div>
                </div>
            </NavLink>

        </>
    )
}
