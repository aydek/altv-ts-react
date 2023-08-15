import React, { useRef, useState, useEffect } from 'react';
import Container from '../../components/Container';
import { ResizeIcon } from '../../components/SVG';
import { twMerge } from 'tailwind-merge';
import { ChatEvents } from '@events';

const SIZE_CONFIG = {
    x: 600,
    y: 400,
    min_x: 300,
    min_y: 100,
    max_x: 900,
    max_y: 700,
};

interface ResizableBoxProps {
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    children: React.ReactNode;
    className?: string;
    chatActive: boolean;
    onResize?: (width: number, height: number) => void; // Add onResize prop
}

const ResizableBox: React.FC<ResizableBoxProps> = ({
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    children,
    onResize,
    className,
    chatActive,
}) => {
    const [width, setWidth] = useState(SIZE_CONFIG.x);
    const [height, setHeight] = useState(SIZE_CONFIG.y);
    const isResizing = useRef(false);
    const resizeHandleRef = useRef<HTMLDivElement>(null);
    const prevClientX = useRef<number>(0);
    const prevClientY = useRef<number>(0);

    const handleMouseDown = (event: React.MouseEvent) => {
        isResizing.current = true;
        prevClientX.current = event.clientX;
        prevClientY.current = event.clientY;
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (isResizing.current) {
            const deltaWidth = event.clientX - prevClientX.current;
            const deltaHeight = event.clientY - prevClientY.current;

            const newWidth = Math.max(
                minWidth || SIZE_CONFIG.min_x,
                Math.min(width + deltaWidth, maxWidth || SIZE_CONFIG.max_x)
            );

            const newHeight = Math.max(
                minHeight || SIZE_CONFIG.min_y,
                Math.min(height + deltaHeight, maxHeight || SIZE_CONFIG.max_y)
            );

            setWidth(newWidth);
            setHeight(newHeight);

            // Call the onResize callback with the new width and height
            if (onResize) {
                onResize(newWidth, newHeight);
            }

            prevClientX.current = event.clientX;
            prevClientY.current = event.clientY;
        }
    };

    const handleMouseUp = () => {
        isResizing.current = false;
        if ('alt' in window) {
            alt.emit(ChatEvents.updateSize, width, height);
        }
    };

    const handleSetSize = (width: number, height: number) => {
        setWidth(width);
        setHeight(height);
    };

    useEffect(() => {
        if ('alt' in window) {
            alt.on(ChatEvents.setSize, handleSetSize);
        }
        return () => {
            if ('alt' in window) {
                alt.off(ChatEvents.setSize, handleSetSize);
            }
        };
    }, []);

    useEffect(() => {
        const handleWindowMouseUp = () => {
            if (isResizing.current) {
                handleMouseUp();
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleWindowMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleWindowMouseUp);
        };
    }, [width, height, minWidth, maxWidth, minHeight, maxHeight, onResize]);

    return (
        <Container
            className={twMerge(`absolute select-none left-1 top-1 `, className)}
            style={{
                width: `${width}px`,
                height: `${height}px`,
            }}
        >
            {/* Additional elements inside the ResizableBox */}
            {children}

            {/* Resizing handle */}
            <div onMouseDown={handleMouseDown} ref={resizeHandleRef}>
                <ResizeIcon
                    className={twMerge(
                        'absolute right-0 bottom-0 cursor-nw-resize hover:fill-accent',
                        !chatActive && 'opacity-0'
                    )}
                />
            </div>
        </Container>
    );
};

export default ResizableBox;
