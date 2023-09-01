import { useEffect, useState } from 'react';
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
    uuid: number;
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
            return [...prev, { type, hide: Date.now() + hide, title, message, hidden: false, active: false, uuid: Date.now() }];
        });
    };

    const cancelNotification = (searchString: string) => {
        const updatedNotifications = notifications.map((notification) => {
            if (notification.message.includes(searchString)) {
                return {
                    ...notification,
                    hide: Date.now(),
                };
            }
            return notification;
        });

        setNotifications(updatedNotifications);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setNotifications((prev) => {
                return prev.map((n) => {
                    if (n.hide < Date.now()) {
                        if (!n.hidden) return { ...n, hidden: true, hide: Date.now() + 500 };
                        else return null;
                    }

                    if (!n.active) {
                        return { ...n, active: true };
                    }
                    return n;
                });
            });
            setNotifications((prev) => prev.filter((n) => n !== null));
        }, 10);

        if ('alt' in window) {
            alt.on(NotificationEvents.show, showNotification);
            alt.on(NotificationEvents.cancel, cancelNotification);
        }
        return () => {
            clearInterval(interval);
            if ('alt' in window) {
                alt.off(NotificationEvents.show, showNotification);
                alt.off(NotificationEvents.cancel, cancelNotification);
            }
        };
    }, []);

    const getProgress = (endTime: number, startTime: number) => {
        const currentTime = Date.now();

        // If the end time is in the past, return 0 (completed)
        if (endTime <= currentTime) {
            return 720;
        }
        const timeLeft = endTime - currentTime;
        const totalTime = endTime - startTime;
        const progressBarValue = (1 - timeLeft / totalTime) * 720;
        return progressBarValue;
    };

    const getStrokeColor = (type: string) => {
        const colors = {
            info: '#5598C3',
            bell: '#f4f4f4',
            success: '#3DBA39',
            warning: '#fdde2f',
            error: '#CC394F',
        };
        const color = colors[type];
        return color;
    };

    const handle = () => {
        showNotification('info', 5000, 'Title', 'Hello darkness my old friend!');
        setTimeout(() => {
            showNotification('bell', 10000, 'Title', 'Hello darkness my old friend! clear');
        }, 1000);
        setTimeout(() => {
            showNotification('success', 20000, 'Title', 'Hello darkness my old friend!');
        }, 2000);
        setTimeout(() => {
            showNotification('warning', 5000, 'Title', 'Hello darkness my old friend!');
        }, 3000);
        setTimeout(() => {
            showNotification('error', 5000, 'Title', 'Hello darkness my old friend!');
        }, 4000);
    };

    return (
        <>
            {!('alt' in window) && (
                <div className="absolute left-4 top-4 flex flex-col space-y-2">
                    <button className="bg-discord rounded p-2" onClick={handle}>
                        Get some notifications
                    </button>
                    <button className="bg-discord rounded p-2" onClick={() => cancelNotification('clear')}>
                        Clear notification
                    </button>
                </div>
            )}

            <div className="absolute right-5 top-5 space-y-1 overflow-hidden">
                {notifications.map((n, i) => (
                    <div key={n.uuid + i} className={twMerge('relative transition-all duration-300 opacity-0', `${n.hidden && 'translate-x-full'} ${n.active && 'opacity-100'}`)}>
                        <svg className="w-[300px] h-[80px]">
                            <rect x="5" y="5" rx="25" ry="25" strokeWidth="5" className="w-[290px] h-[70px] fill-background stroke-gray " />
                            <rect
                                x="5"
                                y="5"
                                rx="25"
                                ry="25"
                                strokeDasharray="720"
                                strokeLinecap="round"
                                strokeDashoffset={getProgress(n.hidden ? n.uuid : n.hide, n.uuid)}
                                strokeWidth="5"
                                stroke={getStrokeColor(n.type)}
                                className={twMerge('w-[290px] h-[70px] fill-transparent')}
                            />
                        </svg>

                        <div className="absolute flex items-center text-whitesmoke top-1/2 -translate-y-1/2 left-5">
                            <div className="rounded-full bg-background w-10 h-10 flex items-center justify-center mr-3">{icons[n.type]}</div>

                            <div className="w-[80%]">
                                <div className="font-semibold">{n.title}</div>

                                <div className="text-sm">{n.message}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Notifications;
