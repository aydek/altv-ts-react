import React from 'react';

interface Props {
    min: number;
    max: number;
    step: number;
    value: number;
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Slider: React.FC<Props> = ({ min, max, step, className, onChange, value }) => {
    return (
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            step={step}
            onChange={onChange}
            className={`appearance-none h-[2px] w-full bg-accent ${className}`}
        />
    );
};

export default Slider;
