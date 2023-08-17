import { DragOverlay } from '@dnd-kit/core';
import { translate } from '../../../config';
import { Draggable, Droppable } from './DragnDrop';
import LinearProgress from '../../../components/LinearProgress';
import { locales } from '../../../locales';
import Container from '../../../components/Container';
import { InventoryEvents } from '@events';
import Divider from '../../../components/Divider';

interface IProps {
    secondaryCapacity: number;
    secondaryItems: Array<{ id: number; quantity: number; description: string }>;
    itemsConfig: Array<{ id: number; category: string; img: string; name: string; weight: number }>;
    ctrlHold: boolean;
    secondaryTitle: string;
    drag: { id: any; type: string };
}
export const Secondary = ({ secondaryCapacity, secondaryItems, itemsConfig, ctrlHold, secondaryTitle, drag }: IProps) => {
    const handleRightClick = (index: number) => () => {
        if ('alt' in window) {
            if (ctrlHold) alt.emit(InventoryEvents.splitSecondary, index, undefined, JSON.stringify(secondaryItems));
            else alt.emit(InventoryEvents.dropSecondary, index, undefined, JSON.stringify(secondaryItems));
        }
    };

    const getItemsWeight = () => {
        if (secondaryCapacity > 0 && itemsConfig.length > 0) {
            let count = 0;
            secondaryItems.map((item) => {
                if (item.id !== -1) count = count + itemsConfig[item.id].weight * item.quantity;
            });

            if ((100 / secondaryCapacity) * count > 100) return 100;
            return Math.floor((100 / secondaryCapacity) * count);
        } else return 100;
    };

    const getTitle = () => {
        let text = '';
        if (secondaryTitle.includes(' (')) {
            const title = secondaryTitle.slice(secondaryTitle.indexOf(' ('), secondaryTitle.length);
            text = translate('inventory', title as keyof (typeof locales)['inventory']) + secondaryTitle.slice(0, secondaryTitle.indexOf('(') - 1);
        } else {
            text = translate('inventory', secondaryTitle as keyof (typeof locales)['inventory']);
        }
        return text;
    };

    return (
        <div>
            <div className="font-marker text-3xl font-semibold m-0 text-whitesmoke">{getTitle()}</div>

            <Container className="select-none h-[80%]">
                <div className="grid grid-cols-4 gap-1 col-span-full h-[93%] overflow-y-scroll overflow-x-hidden px-1 my-1 max-inv2xl:grid-cols-3 max-invxl:grid-cols-2" tabIndex={-1}>
                    {secondaryItems.map((item, i) => (
                        <div key={i} className="h-16">
                            {itemsConfig.length > 0 && item.id !== -1 ? (
                                <Draggable id={`secondary_item:${i}`} onContextMenu={handleRightClick(i)}>
                                    <Droppable id={`secondary_item:${i}`} className="p-1 w-40 h-16 bg-backgroundhover border rounded-sm border-containerBorder flex items-center relative select-none">
                                        <img className="w-10 h-10 object-contain" src={new URL(`../images/${itemsConfig[item.id].img}.png`, import.meta.url).href} draggable={false} />
                                        <div className="absolute left-[30%] top-[10px] text-sm">{itemsConfig[item.id].name}</div>
                                        <div className="absolute left-[30%] top-[25px] text-xs text-gray">{item.description}</div>
                                        <div className="absolute bottom-[1px] right-[2px] text-[0.8rem]">
                                            {item.quantity} ( {(itemsConfig[item.id].weight * item.quantity).toFixed(1)} )
                                        </div>
                                    </Droppable>
                                </Draggable>
                            ) : (
                                <div>
                                    <Droppable
                                        id={`secondary_item:${i}`}
                                        className="p-1 w-40 h-16 bg-backgroundhover border rounded-sm border-containerBorder flex items-center relative select-none"
                                    ></Droppable>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <DragOverlay
                    dropAnimation={{
                        duration: 0,
                        easing: '',
                    }}
                >
                    {secondaryItems.length > 0 && itemsConfig.length > 0 && drag.id !== null && drag.type == 'secondary_item' && secondaryItems[drag.id] && secondaryItems[drag.id].id != -1 ? (
                        <div className="p-1 w-40 h-16 bg-backgroundhover border rounded-sm border-containerBorder flex items-center relative select-none">
                            <img className="w-10 h-10 object-contain" src={new URL(`../images/${itemsConfig[secondaryItems[drag.id].id].img}.png`, import.meta.url).href} draggable={false} />
                            <div className="absolute left-[30%] top-[10px] text-sm">{itemsConfig[secondaryItems[drag.id].id].name}</div>
                            <div className="absolute left-[30%] top-[25px] text-xs text-gray">{secondaryItems[drag.id].description}</div>
                            <div className="absolute bottom-[1px] right-[2px] text-[0.8rem]">
                                {secondaryItems[drag.id].quantity} ( {(itemsConfig[secondaryItems[drag.id].id].weight * secondaryItems[drag.id].quantity).toFixed(1)} )
                            </div>
                        </div>
                    ) : null}
                </DragOverlay>
                <Divider />
                <div className="flex items-center">
                    <div className="mr-2">{translate('inventory', 'capacity')}:</div>
                    <LinearProgress color={getItemsWeight() > 80 ? 'bg-error' : getItemsWeight() > 45 ? 'bg-warning' : 'bg-success'} value={100 - getItemsWeight()} max={100} />
                </div>
            </Container>
        </div>
    );
};
