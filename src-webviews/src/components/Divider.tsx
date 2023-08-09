import { twMerge } from 'tailwind-merge';

const Divider = ({ className = '' }: { className?: string }) => {
    return <div className={twMerge('h-px w-auto bg-whitesmoke my-2', className)}></div>;
};

export default Divider;
