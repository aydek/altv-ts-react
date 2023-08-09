import React from 'react';
import ReactDOM from 'react-dom';
import Container from './Container';
import { IconClose } from './SVG';

import { twMerge } from 'tailwind-merge';

// Interface for the props
interface DialogProps {
    title?: string;
    isOpen: boolean;
    onClose: () => void;
    onEnter: () => void;
    children?: React.ReactNode;
    className?: string;
}

const Dialog: React.FC<DialogProps> = ({ title, isOpen, onClose, onEnter, children, className }) => {
    const handleClose = () => {
        onClose();
    };

    return isOpen ? (
        <>
            {ReactDOM.createPortal(
                <div className="absolute w-screen h-screen bg-backgroundhover top-0 left-0" onClick={handleClose} />,
                document.querySelector('#root')!
            )}
            {ReactDOM.createPortal(
                <Container
                    className={twMerge(
                        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[300px] p-2',
                        className
                    )}
                >
                    <IconClose
                        className="hover:fill-whitesmokehover absolute right-2 top-2 cursor-pointer"
                        onClick={handleClose}
                    />
                    <div className="font-semibold text-2xl mb-3 mr-10">{title}</div>

                    {children}
                </Container>,
                document.querySelector('#root')!
            )}
        </>
    ) : null;
};

export default Dialog;
