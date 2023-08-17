import { useEffect, useState } from 'react';
import Container from '../../components/Container';
import { twMerge } from 'tailwind-merge';
import { BellIcon, ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '../../components/SVG';
import { NotificationEvents } from '@events';

interface IState {
    type: string;
    hide: number;
    title: string;
    message: string;
    hidden: boolean;
    active: boolean;
}

const icons = {
    info: <InfoIcon className="fill-[#5598C3] w-6 h-6" />,

    bell: <BellIcon className=" w-6 h-6" />,

    success: <SuccessIcon className="fill-[#3DBA39] w-6 h-6" />,

    warning: <WarningIcon className="fill-[#fdde2f] w-6 h-6" />,

    error: <ErrorIcon className="fill-[#CC394F] w-6 h-6" />,
};

const Notifications = () => {
    const [notifications, setNotifications] = useState<Array<IState>>([]);

    const showNotification = (type: string, hide: number, title: string, message: string) => {
        setNotifications((prev) => {
            if (prev.length > 5) prev[0].hidden = true;
            return [...prev, { type, hide: Date.now() + hide, title, message, hidden: false, active: false }];
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setNotifications((prev) => prev.filter((n) => n.hidden === false));
            setNotifications((prev) => {
                return prev.map((n) => {
                    if (n.hide < Date.now()) {
                        return { ...n, hidden: true };
                    }

                    if (!n.active) {
                        return { ...n, active: true };
                    }
                    return n;
                });
            });
        }, 500);

        if ('alt' in window) {
            alt.on(NotificationEvents.show, showNotification);
        }
        return () => {
            clearInterval(interval);
            if ('alt' in window) {
                alt.off(NotificationEvents.show, showNotification);
            }
        };
    }, []);

    const handle = () => {
        showNotification('info', 5000, 'Title', 'Hello darkness my old friend!');
        setTimeout(() => {
            showNotification('bell', 5000, 'Title', 'Hello darkness my old friend!');
        }, 1000);
        setTimeout(() => {
            showNotification('success', 5000, 'Title', 'Hello darkness my old friend!');
        }, 2000);
        setTimeout(() => {
            showNotification('warning', 5000, 'Title', 'Hello darkness my old friend!');
        }, 3000);
        setTimeout(() => {
            showNotification('error', 5000, 'Title', 'Hello darkness my old friend!');
        }, 4000);
    };

    return (
        <div className="">
            {!('alt' in window) && (
                <button className="absolute left-4 top-4" onClick={handle}>
                    Get some notifications
                </button>
            )}

            <div className="absolute right-5 top-5 space-y-1 overflow-hidden">
                {notifications.map((n, i) => (
                    <Container
                        key={n.hide}
                        className={twMerge(
                            'w-72 transition-all duration-300 opacity-0 flex items-center rounded-3xl',
                            `${n.hidden && 'translate-x-full'} ${n.active && 'opacity-100'}`
                        )}
                    >
                        <div className="rounded-full bg-background w-10 h-10 flex items-center justify-center mr-3">
                            {icons[n.type]}
                        </div>

                        <div className="w-[80%]">
                            <div className="font-semibold">{n.title}</div>

                            <div className="text-sm">{n.message}</div>
                        </div>
                    </Container>
                ))}
            </div>
        </div>
    );
};

export default Notifications;
