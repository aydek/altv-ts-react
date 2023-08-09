import { twMerge } from 'tailwind-merge';

const Container = ({ children, ...props }) => {
    return (
        <div
            {...props}
            className={twMerge(
                `rounded-md p-3 text-whitesmoke border border-containerBorder bg-background`,
                props.className
            )}
        >
            {children}
        </div>
    );
};

export default Container;
