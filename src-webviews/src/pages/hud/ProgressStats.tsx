import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { twMerge } from 'tailwind-merge';

const ProgressStats = () => {
    const [path, setPath] = useState(40);

    const setHeight = () => {
        setPath((prev) => prev - 6);
    };
    useEffect(() => {
        console.log(path);
    }, [path]);
    return (
        <div className="transition-all">
            <div className="absolute bottom-2 left-2">
                <Button onClick={setHeight}>change</Button>
                <div className="w-[40px] h-[40px] relative ">
                    <div className="w-full h-full bg-darkred outline outline-darkgray rounded-md"></div>
                    <div className=" absolute  bottom-0 left-0 w-full bg-error  rounded-md transition-all" style={{ height: `${path}px` }}></div>
                </div>
            </div>
        </div>
    );
};

export default ProgressStats;
