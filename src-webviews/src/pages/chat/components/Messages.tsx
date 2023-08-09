import { useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Messages = ({ messages, chatActive }) => {
    const autoScrollRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (autoScrollRef && autoScrollRef.current) {
            autoScrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!scrollRef.current) return;

            const scrollStep = 200;
            const isPageUp = event.key === 'PageUp';
            const isPageDown = event.key === 'PageDown';

            if (isPageUp) {
                scrollRef.current.scrollTop -= scrollStep;
                event.preventDefault();
            } else if (isPageDown) {
                scrollRef.current.scrollTop += scrollStep;
                event.preventDefault();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    return (
        <div
            ref={scrollRef}
            className={twMerge(
                'w-full max-h-[98%] overflow-auto absolute bottom-0 left-0 p-2 break-all tracking-wide ]',
                !chatActive && 'overflow-hidden'
            )}
            style={{
                textShadow:
                    '#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px,#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px',
            }}
        >
            {messages.map((message: JSX.Element, index: number) => (
                <div key={`${message} ${index}`} className="select-text">
                    {message}
                </div>
            ))}
            <div ref={autoScrollRef}></div>
        </div>
    );
};

export default Messages;
