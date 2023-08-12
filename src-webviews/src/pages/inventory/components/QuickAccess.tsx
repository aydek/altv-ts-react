import { useEffect, useState } from 'react';
import Container from '../../../components/Container';
import { InventoryEvents } from '@events';

interface IProps {
    items: Array<{ id: number; quantity: number; description: string }>;
    itemsConfig: Array<{ id: number; category: string; img: string; name: string; weight: number }>;
}

export const QuickAccess = ({ items, itemsConfig }: IProps) => {
    const [show, setShow] = useState(!('alt' in window));
    const [usedData, setUsedData] = useState<
        { id: number; qty: number; time: number; text: string; visible: boolean }[]
    >([
        { id: -1, qty: 1, time: Date.now(), text: 'Used...', visible: false },
        { id: -1, qty: 1, time: Date.now(), text: 'Used...', visible: false },
        { id: -1, qty: 1, time: Date.now(), text: 'Used...', visible: false },
    ]);

    useEffect(() => {
        if ('alt' in window) {
            alt.on(InventoryEvents.showShortcuts, showShortcuts);
            alt.on(InventoryEvents.hideShortcuts, hideShortcuts);
            alt.on(InventoryEvents.usedItem, usedItem);
        }
        return () => {
            if ('alt' in window) {
                alt.off(InventoryEvents.showShortcuts, showShortcuts);
                alt.off(InventoryEvents.hideShortcuts, hideShortcuts);
                alt.off(InventoryEvents.usedItem, usedItem);
            }
        };
    }, []);

    const usedItem = (id: number, quantity: number, text: string) => {
        const copy = usedData;
        let index = 0;
        for (let i = 0; i < usedData.length; i++) {
            if (copy[i].id == -1) {
                index = i;
                break;
            }
        }

        if (index === 0) {
            copy.shift();
            copy.push({ id: id, qty: quantity, time: Date.now() + 5000, text: text, visible: true });
        } else {
            copy[index].id = id;
            copy[index].qty = quantity;
            copy[index].time = Date.now() + 5000;
            copy[index].text = text;
            copy[index].visible = true;
        }
        setUsedData([...copy]);
    };

    const showShortcuts = () => {
        setShow(true);
    };

    const hideShortcuts = () => {
        setShow(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const copy = usedData;
            for (let i = 0; i < usedData.length; i++) {
                if (copy[i] === undefined) return;
                if (copy[i].time - Date.now() >= 0 && copy[i].time - Date.now() <= 1000) {
                    copy[i].visible = false;
                }
                if (copy[i].id != -1 && copy[i].time < Date.now()) {
                    copy[i].id = -1;
                    copy[i].qty = 0;
                    copy[i].time = Date.now();
                    copy[i].text = 'Used...';
                    copy[i].visible = false;
                }
                setUsedData([...copy]);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="select-none">
            <div
                className="absolute w-full bottom-[10px] flex justify-center transition-all "
                style={{ opacity: show ? 1 : 0 }}
            >
                {[...Array(4)].map((item, i) => (
                    <div key={i}>
                        {items[i] && items[i].id !== -1 && itemsConfig.length > 0 ? (
                            <Container className="m-1 w-[100px] h-[100px] flex justify-center relative transition-all">
                                <img
                                    className="w-10 h-10 object-contain mt-[15px]"
                                    src={new URL(`../images/${itemsConfig[items[i].id].img}.png`, import.meta.url).href}
                                />
                                <div className="absolute bottom-0 bg-background w-full text-center text-sm rounded-b">
                                    {itemsConfig[items[i].id].name}
                                </div>
                                <div className="absolute top-[10px] left-[5px] text-xs">x {items[i].quantity}</div>
                                <div className="absolute px-[2px] rounded top-[3px] right-[3px] text-sm text-accent border border-accent ">
                                    {i + 1}
                                </div>
                            </Container>
                        ) : (
                            <Container className="m-1 w-[100px] h-[100px] flex justify-center relative transition-all">
                                <div className="absolute px-[2px] rounded top-[3px] right-[3px] text-sm text-accent border border-accent">
                                    {i + 1}
                                </div>
                            </Container>
                        )}
                    </div>
                ))}
            </div>
            <div
                className="absolute w-full bottom-[10px] flex justify-center transition-all"
                style={{ display: show ? 'none' : '', height: '112px' }}
            >
                {usedData.map((item, i) => (
                    <Container
                        key={i}
                        className="m-1 w-[100px] h-[100px] flex justify-center relative transition-all"
                        style={{
                            opacity: item.visible ? 1 : 0,
                            position: item.id == -1 ? 'absolute' : 'relative',
                            top: 0,
                            left: 0,
                        }}
                    >
                        {itemsConfig.length > 0 && item.id != -1 ? (
                            <>
                                <div
                                    className="absolute -top-[17px] left-0 text-sm "
                                    style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}
                                >
                                    {item.text}
                                </div>

                                <img
                                    className="w-10 h-10 object-contain mt-[15px]"
                                    src={new URL(`../images/${itemsConfig[item.id].img}.png`, import.meta.url).href}
                                />

                                <div className="absolute bottom-0 bg-background w-full text-center text-sm rounded-b">
                                    {itemsConfig[item.id].name}
                                </div>

                                <div className="absolute top-[5px] right-[5px] text-xs">x {item.qty}</div>
                            </>
                        ) : null}
                    </Container>
                ))}
            </div>
        </div>
    );
};
