import React, { ChangeEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
    label: string;
    value: string;
    type?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string;
    className?: string;
    autoFocus?: boolean;
}

const TextField: React.FC<Props> = ({
    label,
    value,
    onChange,
    error = false,
    helperText = '',
    className = '',
    type,
    autoFocus,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className={twMerge('w-auto relative my-10 select-none', className)}>
            <div
                className={`absolute top-0 pointer-events-none ${isFocused && 'text-accent'} ${
                    (isFocused || value.length > 0) && 'text-xs -translate-y-4 transition-all '
                }`}
            >
                {label}
            </div>
            <input
                type={type ? type : 'text'}
                value={value}
                onChange={onChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                autoFocus={autoFocus}
                className={`bg-transparent w-full border-b border-whitesmoke focus:border-accent focus:outline-none`}
            />
            {error && helperText && <div className="absolute text-sm font-semibold mt-1">{helperText}</div>}
        </div>
    );
};

export default TextField;
