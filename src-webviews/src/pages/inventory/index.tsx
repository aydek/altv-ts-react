import { useEffect, useState } from 'react';
import { defaultEquipment, dummyItemConfig, dummyItems } from './dummyData';
import { Primary } from './components/Primary';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { Secondary } from './components/Secondary';
import { Equipment } from './components/Equipment';
import { InventoryEvents } from '../../../../src/core/shared/enums/events/webviewEvents';
import { QuickAccess } from './components/QuickAccess';

const Inventory = () => {
    const [active, setActive] = useState(!('alt' in window));
    const [items, setItems] = useState('alt' in window ? [] : dummyItems);
    const [secondaryItems, setSecondaryItems] = useState('alt' in window ? [] : dummyItems);
    const [itemsConfig, setItemsConfig] = useState('alt' in window ? [] : dummyItemConfig);
    const [equipment, setEquipment] = useState(defaultEquipment);
    const [drag, setDrag] = useState({ id: null, type: '' });
    const [capacity, setCapacity] = useState(40);
    const [duobleClick, setDuobleClick] = useState({ time: Date.now(), identifier: null });
    const [ctrlHold, setCtrlHold] = useState(false);
    const [secondaryTitle, setSecondaryTitle] = useState('Ground');
    const [secondaryCapacity, setSecondaryCapacity] = useState(0);

    useEffect(() => {
        if ('alt' in window) {
            alt.on(InventoryEvents.fetchConfig, fetchConfig);
            alt.on(InventoryEvents.fetchPrimary, fetchPrimary);
            alt.on(InventoryEvents.fetchSecondary, fetchSecondary);
            alt.on(InventoryEvents.show, showInventory);
            alt.on(InventoryEvents.hide, hideInventory);
        }
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            if ('alt' in window) {
                alt.off(InventoryEvents.fetchConfig, fetchConfig);
                alt.off(InventoryEvents.fetchPrimary, fetchPrimary);
                alt.off(InventoryEvents.fetchSecondary, fetchSecondary);
                alt.off(InventoryEvents.show, showInventory);
                alt.off(InventoryEvents.hide, hideInventory);
            }
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        if (secondaryItems.length < 48) {
            let array = [];
            for (let i = 0; i < 48 - secondaryItems.length; i++) {
                array.push({ id: -1, quantity: 0, description: '' });
            }
            setSecondaryItems([...secondaryItems, ...array]);
        }

        if (items.length < 48) {
            let array = [];
            for (let i = 0; i < 48 - items.length; i++) {
                array.push({ id: -1, quantity: 0, description: '' });
            }
            setItems([...items, ...array]);
        }
    }, [items, secondaryItems]);

    const fetchPrimary = (items: string, capacity: number, equipment: string, firstrun: boolean) => {
        setItems(JSON.parse(items));
        setCapacity(capacity);
        setEquipment(JSON.parse(equipment));
    };

    const fetchConfig = (data: string, secondary_type: string) => {
        setItemsConfig(JSON.parse(data));
        setSecondaryTitle(secondary_type);
    };

    useEffect(() => {
        if ('alt' in window) alt.emit(InventoryEvents.fetchAll);
    }, [itemsConfig]);

    useEffect(() => {
        if ('alt' in window) alt.emit(InventoryEvents.fetchSecondary);
    }, [items]);

    const fetchSecondary = (secondary_array: string, secondary_capacity: number) => {
        setSecondaryItems(JSON.parse(secondary_array));
        setSecondaryCapacity(secondary_capacity);
    };

    const showInventory = () => {
        setActive(true);
    };

    const hideInventory = () => {
        setActive(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Control') {
            if (ctrlHold) return;
            setCtrlHold(true);
        }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
        if (event.key === 'Control') {
            setCtrlHold(false);
        }
    };

    const handleDragStart = (event: DragStartEvent) => {
        const str = event.active.id as String;
        const id = str.slice(str.indexOf(':') + 1, str.length);
        if (str.includes('primary_item')) {
            setDrag({ id: parseInt(id), type: 'primary_item' });
            setDuobleClick({ time: Date.now() + 250, identifier: str });
        }
        if (str.includes('secondary_item')) {
            setDrag({ id: parseInt(id), type: 'secondary_item' });
        }
        if (duobleClick.identifier === str && duobleClick.time > Date.now()) {
            handleDoubleClick(duobleClick.identifier, parseInt(id));
            setDuobleClick({ time: Date.now(), identifier: null });
            return;
        }
    };

    const handleDoubleClick = (type: string, drag: number) => {
        if (drag === null) return;

        if (type.includes('primary_item')) {
            if ('alt' in window) {
                alt.emit(InventoryEvents.useItem, drag);
            }
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        if (!event.over) return;
        const target = event.over.id as String;
        if (target.includes('equipment')) {
            const cDrag = drag.id;
            if (cDrag === null) return;
            if (itemsConfig[items[cDrag].id].category !== 'equipment') return;
            if ('alt' in window) {
                alt.emit(InventoryEvents.useItem, cDrag);
            }
            return;
        }
        if (target.includes('destroy_item')) {
            const cDrag = drag.id;
            if (cDrag === null) return;
            const qty = 1;
            if ('alt' in window) {
                alt.emit(InventoryEvents.removeItem, cDrag, qty);
            }
            return;
        }
        if (
            drag.type === 'primary_item' &&
            !target.includes('secondary_item') &&
            drag.id === parseInt(target.slice(target.indexOf(':') + 1, target.length)) &&
            ctrlHold
        ) {
            if ('alt' in window) {
                const index = drag.id;
                alt.emit(InventoryEvents.itemDrop, index, JSON.stringify(secondaryItems), -1, false, true);
            }
            return;
        }
        if (
            drag.type === 'secondary_item' &&
            !target.includes('primary_item') &&
            drag.id === parseInt(target.slice(target.indexOf(':') + 1, target.length)) &&
            ctrlHold
        ) {
            if ('alt' in window) {
                const index = drag.id;
                alt.emit(InventoryEvents.itemPickup, index, JSON.stringify(secondaryItems), -1, false, true);
            }
            return;
        }
        if (target.includes('primary_item') && drag.type === 'secondary_item') {
            if ('alt' in window) {
                const index = drag.id;
                const targetIndex = parseInt(target.slice(target.indexOf(':') + 1, target.length));
                alt.emit(InventoryEvents.itemPickup, index, JSON.stringify(secondaryItems), targetIndex, ctrlHold);
            }
            return;
        }
        if (target.includes('secondary_item') && drag.type === 'primary_item') {
            if ('alt' in window) {
                const index = drag.id;
                const targetIndex = parseInt(target.slice(target.indexOf(':') + 1, target.length));
                alt.emit(InventoryEvents.itemDrop, index, JSON.stringify(secondaryItems), targetIndex, ctrlHold);
            }
            return;
        }
        if (drag.type === 'primary_item' && target.includes('primary_item')) {
            if ('alt' in window) {
                const index = drag.id;
                const targetIndex = parseInt(target.slice(target.indexOf(':') + 1, target.length));
                if (index == targetIndex) return;
                alt.emit(InventoryEvents.movePrimary, index, targetIndex, ctrlHold);
            }
            return;
        }
        if (drag.type === 'secondary_item' && target.includes('secondary_item')) {
            if ('alt' in window) {
                const index = drag.id;
                const targetIndex = parseInt(target.slice(target.indexOf(':') + 1, target.length));
                if (index == targetIndex) return;
                alt.emit(InventoryEvents.moveSecondary, index, JSON.stringify(secondaryItems), targetIndex, ctrlHold);
            }
            return;
        }
    };

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div
                className="transition-all"
                style={{
                    opacity: active ? 1 : 0,
                    pointerEvents: active ? 'auto' : 'none',
                    cursor: active ? 'auto' : 'default',
                }}
            >
                <Primary
                    capacity={capacity}
                    items={items}
                    itemsConfig={itemsConfig}
                    drag={drag}
                    secondaryItems={secondaryItems}
                    ctrlHold={ctrlHold}
                />
                <Equipment equipment={equipment} />
                <Secondary
                    secondaryCapacity={secondaryCapacity}
                    secondaryItems={secondaryItems}
                    itemsConfig={itemsConfig}
                    ctrlHold={ctrlHold}
                    secondaryTitle={secondaryTitle}
                    drag={drag}
                />
            </div>

            <QuickAccess items={items} itemsConfig={itemsConfig} />
        </DndContext>
    );
};

export default Inventory;
