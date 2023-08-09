import { CtrlIcon, MouseLeftIcon, MouseRightIcon } from '../../../components/SVG';
import { translate } from '../../../config';

export const Instructions = () => {
    return (
        <div className="absolute bg-background right-0 bottom-[-50px] rounded px-[3px] py-[5px] flex justify-center items-center space-x-2 text-sm select-none">
            <div className="border border-accent rounded p-1">
                <MouseLeftIcon size={15} />
            </div>

            <div>x2 {translate('inventory', 'use_item')}</div>
            <div className="border border-accent rounded p-1">
                <MouseLeftIcon size={15} />
            </div>
            <div>{translate('inventory', 'drag_item')}</div>
            <div className="border border-accent rounded p-1">
                <MouseRightIcon size={15} />
            </div>
            <div>{translate('inventory', 'move')}</div>

            <div className="border border-accent rounded p-1 flex space-x-1">
                <CtrlIcon size={20} />
                <div>+</div>

                <MouseRightIcon size={15} />
            </div>
            <div>{translate('inventory', 'split_item')}</div>
            <div className="border border-accent rounded p-1 flex space-x-1">
                <CtrlIcon size={20} />
                <div>+</div>
                <MouseLeftIcon size={15} />
            </div>
            <div>{translate('inventory', 'stack_item')}</div>
        </div>
    );
};
