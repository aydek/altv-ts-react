import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import { Account, AccountPlus, ArrowRight, Eye, TrashCanIcon } from '../../components/SVG';
import { translate } from '../../config';
import { twMerge } from 'tailwind-merge';

import './style.css';

const CharSelect = () => {
    const [loading, setLoading] = useState('alt' in window);
    const [index, setIndex] = useState(0);
    const [hover, setHover] = useState([false, false, false, false, false, false]);
    const [characters, setCharacters] = useState(
        'alt' in window
            ? []
            : [
                  { _id: '232323', rpName: 'Jonas Valanciunas', cash: '299', job: 'someJob', updated_at: '2021:21:21' },
                  { _id: '3223', rpName: 'Jonas Valanciunas', cash: '299', job: 'someJob', updated_at: '2021:21:21' },
              ]
    );

    const viewCharacter = (i: number) => {
        if (i === index) return;
        setIndex(i);
        if ('alt' in window) {
            alt.emit('Webview:Character:Selection:View', characters[i]._id);
        }
    };

    const playCharacter = (i: number) => {
        if ('alt' in window) {
            alt.emit('Webview:Character:Selection:Play', characters[i]._id);
        }
    };

    const deleteCharacter = (i: number) => {
        if ('alt' in window) alt.emit('char-select-delete', characters[i]._id);
    };

    const createNewCharacter = () => {
        if (characters.length >= 6) return;
        if ('alt' in window) {
            alt.emit('Webview:Character:Selection:Create');
        }
    };

    const toggleHover = (i: number, state: boolean) => {
        setHover((prev) => {
            prev[i] = state;
            return [...prev];
        });
    };

    const fetchData = (data: string) => {
        setCharacters(JSON.parse(data));
        setLoading(false);
    };

    useEffect(() => {
        if ('alt' in window) {
            if (characters.length > 0) {
                alt.emit('Webview:Character:Selection:View', characters[0]._id);
            }
        }
    }, [characters]);

    useEffect(() => {
        if ('alt' in window) {
            alt.on('Webview:Character:Selection:Fetch', fetchData);
        }
        return () => {
            if ('alt' in window) alt.off('Webview:Character:Selection:Fetch', fetchData);
        };
    }, []);

    return !loading ? (
        <div className="w-[50%] h-screen bg-gradient-to-r from-black text-whitesmoke flex  justify-center flex-col select-none">
            <div className="w-64 flex flex-col ml-[10%]">
                <div className="text-3xl font-bold mb-12 text-whitesmoke">{translate('charSelect', 'title')}</div>
                {characters.length > 0 ? (
                    <>
                        <div className="flex flex-col text-xl font-bold">
                            <div>{characters[index].rpName.split(' ')[0]}</div>
                            <div>{characters[index].rpName.split(' ')[1]}</div>
                            <div className="flex mt-1">
                                <div className="text-gray text-sm ">{translate('charSelect', 'cash')}:</div>
                                <div className="text-sm text-accent ml-1">{characters[index].cash} $</div>
                            </div>
                            <div className="flex mt-1">
                                <div className="text-gray text-sm ">{translate('charSelect', 'job')}:</div>
                                <div className="text-sm text-accent ml-1">{characters[index].job}</div>
                            </div>
                            <div className="flex mt-1">
                                <div className="text-gray text-sm ">{translate('charSelect', 'lastPlayed')}:</div>
                                <div className="text-sm text-accent ml-1">{characters[index].updated_at.slice(0, 10)}</div>
                            </div>
                        </div>
                        <div className="mt-10 w-full flex flex-col space-y-2">
                            <Button onClick={() => playCharacter(index)}>
                                <div className="flex justify-center space-x-2">
                                    <div>{translate('charSelect', 'play')}</div>
                                    <ArrowRight />
                                </div>
                            </Button>
                            <Button onClick={() => deleteCharacter(index)} className="bg-background border-gray hover:bg-backgroundhover">
                                <div className="flex justify-center space-x-2">
                                    <TrashCanIcon />
                                    <div>{translate('charSelect', 'delete')}</div>
                                </div>
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="text-xl font-bold">{translate('charSelect', 'notFound')}</div>
                )}
                <div className="mt-20 grid grid-cols-3 gap-2">
                    {[...Array(6)].map((item, i) => (
                        <div key={i} className={twMerge(' w-20 h-20  border rounded-lg', index === i && characters.length > 0 && 'bg-accent')}>
                            {characters[i] ? (
                                <div
                                    className="h-full cursor-pointer grid place-items-center"
                                    onClick={() => viewCharacter(i)}
                                    onMouseEnter={() => toggleHover(i, true)}
                                    onMouseLeave={() => toggleHover(i, false)}
                                >
                                    {hover[i] ? <Eye className="w-12 h-12" /> : <Account className=" w-12 h-12" />}
                                </div>
                            ) : (
                                <div className="h-full  grid place-items-center">
                                    <AccountPlus className="w-12 h-12 fill-gray " />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {characters.length < 6 && (
                    <Button className="mt-4 bg-darkgray" onClick={createNewCharacter}>
                        {translate('charSelect', 'createnew')}
                    </Button>
                )}
            </div>
        </div>
    ) : (
        <></>
    );
};

export default CharSelect;
