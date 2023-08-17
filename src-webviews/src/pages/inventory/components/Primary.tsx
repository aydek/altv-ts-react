import { DragOverlay } from '@dnd-kit/core';
import { translate } from '../../../config';
import { Draggable, Droppable } from './DragnDrop';
import { Instructions } from './Instructions';
import Divider from '../../../components/Divider';
import LinearProgress from '../../../components/LinearProgress';
import Container from '../../../components/Container';
import { InventoryEvents } from '@events';

interface IProps {
    capacity: number;
    items: Array<{ id: number; quantity: number; description: string }>;
    itemsConfig: Array<{ id: number; category: string; img: string; name: string; weight: number }>;
    drag: { id: any; type: string };
    secondaryItems: Array<{ id: number; quantity: number; description: string }>;
    ctrlHold: boolean;
}

export const Primary = ({ capacity, items, itemsConfig, drag, secondaryItems, ctrlHold }: IProps) => {
    const getItemsWeight = () => {
        if (capacity > 0 && itemsConfig.length > 0) {
            let count = 0;
            items.map((item) => {
                if (item.id !== -1) count = count + itemsConfig[item.id].weight * item.quantity;
            });

            if ((100 / capacity) * count > 100) return 100;
            return Math.floor((100 / capacity) * count);
        } else return 100;
    };

    const handleRightClick = (index: number) => () => {
        if ('alt' in window) {
            if (ctrlHold) alt.emit(InventoryEvents.splitPrimary, index);
            else alt.emit(InventoryEvents.dropPrimary, index, undefined);
        }
    };

    return (
        <div>
            <div className="font-marker text-3xl font-semibold m-0 text-whitesmoke">{translate('inventory', 'player')}</div>

            <Container className="select-none h-[80%]">
                <div className="grid grid-cols-4 gap-1 h-[93%]  overflow-y-scroll overflow-x-hidden px-1 my-1 max-invmd:grid-cols-3" tabIndex={-1}>
                    {items.map((item, i) => (
                        <div key={i}>
                            {itemsConfig.length > 0 && item.id !== -1 ? (
                                <Draggable id={`primary_item:${i}`} onContextMenu={handleRightClick(i)}>
                                    <Droppable id={`primary_item:${i}`} className="p-1 w-40 h-16 bg-backgroundhover border rounded-sm border-containerBorder flex items-center relative select-none">
                                        {i < 4 ? <div className="absolute px-[3px] text-center rounded top-1 right-1 text-sm text-accent border border-accent">{i + 1}</div> : null}
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
                                    <Droppable id={`primary_item:${i}`} className="p-1 w-40 h-16 bg-backgroundhover border rounded-sm border-containerBorder flex items-center relative select-none">
                                        {i < 4 ? <div className="absolute px-[3px] text-center rounded top-1 right-1 text-sm text-accent border border-accent">{i + 1}</div> : null}
                                    </Droppable>
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
                    {drag.id !== null && drag.type === 'primary_item' && items[drag.id!].id !== -1 && itemsConfig.length > 0 ? (
                        <div className={'p-1 w-40 h-16 bg-backgroundhover border rounded-sm border-containerBorder flex items-center relative select-none'}>
                            <img className="w-10 h-10 object-contain" src={new URL(`../images/${itemsConfig[items[drag.id!].id].img}.png`, import.meta.url).href} draggable={false} />
                            <div className="absolute left-[30%] top-[10px] text-sm">{itemsConfig[items[drag.id!].id].name}</div>
                            <div className="absolute left-[30%] top-[25px] text-xs text-gray">{items[drag.id!].description}</div>
                            <div className="absolute bottom-[1px] right-[2px] text-[0.8rem]">
                                {items[drag.id!].quantity} ( {(itemsConfig[items[drag.id!].id].weight * items[drag.id!].quantity).toFixed(1)} )
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
