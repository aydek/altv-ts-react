import { twMerge } from 'tailwind-merge';
import { translate } from '../../../config';
import { defaultEquipment } from '../dummyData';
import { Droppable } from './DragnDrop';
import { TrashCanIcon } from '../../../components/SVG';
import { InventoryEvents } from '@events';
import { Fragment } from 'react';

interface IProps {
    equipment: typeof defaultEquipment;
}

export const Equipment = ({ equipment }: IProps) => {
    const unequip = (key: string) => () => {
        if (equipment[key][0] === -1) return;
        if ('alt' in window) {
            alt.emit(InventoryEvents.removeEquipment, key);
        }
    };

    return (
        <div>
            <div className="font-marker text-3xl font-semibold m-0 text-whitesmoke">{translate('inventory', 'clothing')}</div>
            <Droppable id="equipment" className="bg-background border border-containerBorder p-1 select-none rounded relative text-whitesmoke w-auto h-[510px] ">
                <div className="grid grid-cols-2 gap-1" tabIndex={-1}>
                    {Object.entries(equipment).map(([key, value]) => (
                        <div
                            key={key}
                            className={twMerge(
                                'w-20 h-20 border border-containerBorder rounded transition duration-200 ease-in-out grid place-items-center  hover:border-accent cursor-pointer',
                                value[0] === -1 && 'opacity-30 cursor-auto hover:border-containerBorder'
                            )}
                            onClick={unequip(key)}
                            onContextMenu={unequip(key)}
                        >
                            <img className="w-20 h-20" src={new URL(`../images/${key}.png`, import.meta.url).href} draggable={false} />
                        </div>
                    ))}
                </div>
                <div className="w-full rounded bg-background absolute left-0 bottom-[-50px]">
                    <Droppable id={`destroy_item`} className="relative w-full border border-containerBorder rounded px-[10px] py-1 flex justify-center items-center">
                        <TrashCanIcon className="mr-4" />
                        <div>{translate('inventory', 'destroy_item')}</div>
                    </Droppable>
                </div>
            </Droppable>
        </div>
    );
};
