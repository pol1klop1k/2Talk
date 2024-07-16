import React from 'react';
import { ReactComponent as Cross } from '../../assets/icons/cross-close.svg'

export const BottomModal = ({ className, onClose, component }) => {


    return (
        <>
            <div className={`modal_overflow ${className}`}>
                <div className="modal">
                    <div className="modal_wrapper">
                        <div className="modal_head">
                            <button onClick={onClose}><Cross width={50} height={50}/></button>
                        </div>
                        {component}
                    </div>
                </div >
            </div>
        </>
    );
};
