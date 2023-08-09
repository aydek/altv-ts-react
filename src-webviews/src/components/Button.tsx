import React, { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    // You can add any additional props specific to your button here
    // For example, onClick?: () => void; or custom styles
    styles?: string;
}

const Button: React.FC<CustomButtonProps> = ({ children, ...props }) => {
    return (
        <button
            {...props}
            className={twMerge(
                'rounded-md text-whitesmoke border border-accent p-2 text-base font-semibold font-family  bg-accent cursor-pointer transition hover:bg-accenthover',
                props.className
            )}
        >
            {children}
        </button>
    );
};

export default Button;
