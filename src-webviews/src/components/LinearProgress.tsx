import React from 'react';
import { twMerge } from 'tailwind-merge';

interface LinearProgressProps {
    value: number;
    max: number;
    className?: string;
    color?: string;
}

const LinearProgress: React.FC<LinearProgressProps> = ({ value, max, className, color = 'bg-accent' }) => {
    const percent = (value / max) * 100;

    return (
        <div className={twMerge('w-full bg-accenthover rounded h-2', className)}>
            <div
                className={twMerge('h-full transition-all rounded duration-300 ease-in-out ', ` ${color}`)}
                style={{ width: percent + '%' }}
            ></div>
        </div>
    );
};

export default LinearProgress;
