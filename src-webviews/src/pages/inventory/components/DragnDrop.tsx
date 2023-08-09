import React from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { twMerge } from 'tailwind-merge';

interface IDraggable {
    id: string;
    children?: React.ReactNode;
    onContextMenu: React.MouseEventHandler<HTMLDivElement>;
}

export function Draggable({ id, children, onContextMenu }: IDraggable) {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: id,
    });
    const style = {
        width: '100%',
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} onContextMenu={onContextMenu} tabIndex={-1}>
            {children}
        </div>
    );
}

export function Droppable(props: { id: string; className: string; children?: React.ReactNode }) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });

    return (
        <div ref={setNodeRef} className={twMerge(props.className, isOver && 'border-accent')} tabIndex={-1}>
            {props.children}
        </div>
    );
}
