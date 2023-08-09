import { twMerge } from 'tailwind-merge';
import { translate } from '../../../config';
import { defaultEquipment } from '../dummyData';
import { Droppable } from './DragnDrop';
import { TrashCanIcon } from '../../../components/SVG';
import { InventoryEvents } from '../../../../../src/core/shared/enums/events/webviewEvents';

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
        <Droppable
            id="equipment"
            className="bg-background absolute border border-containerBorder flex flex-col p-1 select-none rounded left-[2vw] top-[17vh] text-whitesmoke "
        >
            <div className="font-marker text-3xl font-semibold m-0 absolute top-0 left-0 -translate-y-10">
                {translate('inventory', 'clothing')}
            </div>

            <div className="inline-grid grid-cols-2 gap-1" tabIndex={-1}>
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
                        <img
                            className="w-20 h-20"
                            src={new URL(`../images/${key}.png`, import.meta.url).href}
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
            <div className="absolute w-full left-0 bottom-[-55px] rounded bg-background">
                <Droppable
                    id={`destroy_item`}
                    className="relative w-full border border-containerBorder rounded px-[10px] py-1 flex justify-center items-center"
                >
                    <TrashCanIcon className="mr-4" />
                    <div>{translate('inventory', 'destroy_item')}</div>
                </Droppable>
            </div>
        </Droppable>
    );
};
