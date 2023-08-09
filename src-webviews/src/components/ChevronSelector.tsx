import React from 'react';
import { ChevronLeft, ChevronRight } from './SVG';
import Container from './Container';
import { twMerge } from 'tailwind-merge';

interface Props {
    text: string;
    onBack: () => void;
    onForward: () => void;
    className?: string;
    width?: string;
    disabled?: boolean;
}

const ChevronSelector: React.FC<Props> = ({ text, onBack, onForward, className, width = 'w-32', disabled = false }) => {
    return (
        <div className={twMerge(`flex items-center `, className)}>
            <ChevronLeft
                className={`fill-accent rounded-full hover:bg-accenthover cursor-pointer ${
                    disabled && 'fill-gray hover:bg-transparent cursor-auto'
                }`}
                onClick={onBack}
            />
            <Container
                className={twMerge(
                    `p-1 flex items-center justify-center mx-2 border-accent ${
                        disabled && 'text-gray border-gray cursor-auto'
                    }`,
                    width
                )}
            >
                {text}
            </Container>
            <ChevronRight
                className={`fill-accent rounded-full hover:bg-accenthover cursor-pointer ${
                    disabled && 'fill-gray hover:bg-transparent cursor-auto'
                }`}
                onClick={onForward}
            />
        </div>
    );
};

export default ChevronSelector;
