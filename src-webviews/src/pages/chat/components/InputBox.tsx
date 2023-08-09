import React from 'react';
import { twMerge } from 'tailwind-merge';
import { PencilBoxIcon } from '../../../components/SVG';
import { translate } from '../../../config';

export const ALLOWED_CHARS = 128;

const InputBox = ({ handleMessageInput, input, handleInputChange }) => {
    return (
        <div className={twMerge('absolute left-0 bottom-0 translate-y-16 w-full flex items-center ')}>
            <form className="w-full" onSubmit={handleMessageInput}>
                <input
                    className="w-full outline-none border bg-background text-whitesmoke border-containerBorder rounded-md p-3 pr-28"
                    autoFocus
                    name="chatcommand"
                    autoComplete="off"
                    value={input}
                    onChange={handleInputChange}
                    placeholder={translate('chat', 'placeholder')}
                />
            </form>
            <div className="flex items-center absolute right-0">
                <div>
                    {input.length}/{ALLOWED_CHARS}
                </div>
                <PencilBoxIcon size={50} />
            </div>
        </div>
    );
};

export default InputBox;
