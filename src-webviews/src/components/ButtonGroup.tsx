import React from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
    onFirst: () => void;
    onSecond: () => void;
    firstText: string;
    secondText: string;
    firstIcon?: React.ReactNode;
    secondIcon?: React.ReactNode;
    className?: string;
}

const ButtonGroup: React.FC<Props> = ({
    onFirst,
    onSecond,
    firstText,
    secondText,
    firstIcon,
    secondIcon,
    className,
}) => {
    return (
        <div className={twMerge('flex mt-3', className)}>
            <div
                className={`flex items-center justify-center rounded-l-md cursor-pointer text-center text w-1/2 p-2 border bg-background hover:bg-backgroundhover`}
                onClick={onFirst}
            >
                {firstIcon}
                {firstText}
            </div>
            <div
                className={`flex items-center justify-center rounded-r-md cursor-pointer text-center text w-1/2 p-2 border bg-accent border-transparent hover:bg-accenthover`}
                onClick={onSecond}
            >
                {secondText}
                {secondIcon}
            </div>
        </div>
    );
};

export default ButtonGroup;
