import React, { useState, useEffect } from 'react';

interface AlertProps {
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
}

const Alert: React.FC<AlertProps> = ({ message, type }: AlertProps) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        setVisible(true);
        if (visible) {
            timer = setTimeout(() => {
                setVisible(false);
            }, 5000);
        }

        return () => clearTimeout(timer);
    }, [visible]);

    return visible ? (
        <div className={`font-bold w-full text-center my-3 ${type === 'error' && 'text-red-900'}`}>{message}</div>
    ) : null;
};

export default Alert;
