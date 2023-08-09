import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div
            className={`w-[50px] h-[50px] border-t border-r border-l border-whitesmoke rounded-full animate-spin`}
        ></div>
    );
};

export default LoadingSpinner;
