import React, { useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChevronDown } from './SVG';

interface AccordionProps {
    title: string;
    index: number;
    openIndex: number;
    setOpenIndex: (index: number) => void;
    children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, index, openIndex, setOpenIndex, children }) => {
    const isExpanded = index === openIndex;
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState('0');

    const toggleAccordion = () => {
        setOpenIndex(isExpanded ? -1 : index);
    };

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(isExpanded ? `${contentRef.current.scrollHeight}px` : '0');
        }
    }, [isExpanded]);

    return (
        <div className="border-b">
            <div
                className={twMerge(
                    'p-4 cursor-pointer flex justify-between items-center',
                    isExpanded && 'rounded-t-lg'
                )}
                onClick={toggleAccordion}
            >
                <span className="text-md">{title}</span>
                <span className={`transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                    <ChevronDown />
                </span>
            </div>
            <div
                ref={contentRef}
                className="overflow-hidden transition-height"
                style={{ height: contentHeight, transition: 'height 0.3s ease-in-out' }}
            >
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};

export default Accordion;
