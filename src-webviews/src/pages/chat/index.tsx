import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ResizableBox from './ResizableBox';
import Messages from './components/Messages';
import InputBox, { ALLOWED_CHARS } from './components/InputBox';
import Suggestions from './components/Suggestions';
import { highlightWords } from './utils';
import { DummyMessages } from './dummyData';
import { ChatEvents } from '@events';

const BUFFER_SIZE = 64;
const LAST_MESSAGE_BUFFER_SIZE = 10;

function Chat() {
    const [chatActive, setChatActive] = useState(!('alt' in window));
    const [messageBuffer, setMessageBuffer] = useState<Array<string>>([]);
    const [bufferIndex, setBufferIndex] = useState(0);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState('alt' in window ? [] : DummyMessages);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > ALLOWED_CHARS) return;
        setInput(event.target.value);
    };

    const handleMessageInput = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (input.length > 0) {
            const buffer = messageBuffer;
            buffer.push(input);
            if (buffer.length > LAST_MESSAGE_BUFFER_SIZE) buffer.shift();
            setMessageBuffer(buffer);
            setBufferIndex(0);
        }
        if ('alt' in window) alt.emit(ChatEvents.input, input);
        setInput('');
        setChatActive(false);
        if ('alt' in window) alt.emit(ChatEvents.toggle, false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'ArrowUp') {
            if (!messageBuffer.length) return;
            event.preventDefault();
            let index = bufferIndex;
            index -= 1;
            if (index < 0) index = messageBuffer.length - 1;
            setInput(messageBuffer[index]);
            setBufferIndex(index);
        }
    };

    const handlePushLine = (text: string, icon?: string) => {
        const messagesCopy = messages;
        messagesCopy.push(
            <div className="flex items-center">
                {icon && <img src={new URL(`./icons/${icon}.png`, import.meta.url).href} className="w-6 h-6 mr-3" />}
                {highlightWords(text)}
            </div>
        );
        if (messagesCopy.length >= BUFFER_SIZE) messagesCopy.shift();
        setMessages([...messagesCopy]);
    };

    const handleToggle = (toggle: boolean) => {
        setChatActive(toggle);
    };

    useEffect(() => {
        if ('alt' in window) {
            alt.on(ChatEvents.pushLine, handlePushLine);
            alt.on(ChatEvents.toggle, handleToggle);
        }
        return () => {
            if ('alt' in window) {
                alt.off(ChatEvents.pushLine, handlePushLine);
                alt.off(ChatEvents.toggle, handleToggle);
            }
        };
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [bufferIndex]);

    return (
        <ResizableBox className={`${!chatActive && 'border-transparent bg-transparent'} `} chatActive={chatActive}>
            <Messages messages={messages} chatActive={chatActive} />

            {chatActive && (
                <InputBox input={input} handleInputChange={handleInputChange} handleMessageInput={handleMessageInput} />
            )}

            <div style={{ opacity: chatActive ? '1' : '0' }}>
                <Suggestions input={input} setInput={setInput} />
            </div>
        </ResizableBox>
    );
}

export default Chat;
