import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { DummySuggestions } from '../dummyData';
import { ChatEvents } from '@events';

const Suggestions = ({
    input,
    setInput,
}: {
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const [allSuggestions, setAllSuggestions] = useState<Array<{ command: string; description: string }>>(
        'alt' in window ? [] : DummySuggestions
    );

    const [suggestions, setSuggestions] = useState<Array<{ command: string; description: string }>>([]);
    const [preventChanges, setPreventChanges] = useState(false);
    const [suggestionIndex, setSuggestionIndex] = useState(0);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowDown') {
            setPreventChanges(true);
            let index = suggestionIndex;
            if (suggestions.length > 0) {
                setInput(suggestions[index].command);
            }
            index++;
            if (index >= suggestions.length) index = 0;

            setSuggestionIndex(index);
        } else {
            setPreventChanges(false);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [suggestions, setInput, suggestionIndex]);

    useEffect(() => {
        if ('alt' in window && allSuggestions.length < 1) {
        }
        if (preventChanges) return;
        if (input[0] === '/') {
            setSuggestions(
                allSuggestions.filter((suggestion) => suggestion.command.includes(input.substring(1))).slice(0, 5)
            );
            setSuggestionIndex(0);
        } else {
            setSuggestions([]);
        }
    }, [input]);

    const handleFetchCommands = (commands: string) => {
        setAllSuggestions(JSON.parse(commands));
    };

    useEffect(() => {
        if ('alt' in window) {
            alt.on(ChatEvents.fetchCommands, handleFetchCommands);
            alt.emit(ChatEvents.fetchCommands);
        }
        return () => {
            if ('alt' in window) alt.off(ChatEvents.fetchCommands, handleFetchCommands);
        };
    }, []);

    return (
        <div
            className={twMerge(
                `text-gray bg-background p-2 absolute bottom-0 left-0  w-full`,
                suggestions.length === 0 && 'p-0'
            )}
            style={{ transform: 'translateY(calc(100% + 65px))' }}
        >
            {suggestions.map((suggest, index) => (
                <div key={`${suggest}${index}`}>
                    {suggest.command} - {suggest.description}
                </div>
            ))}
        </div>
    );
};

export default Suggestions;
