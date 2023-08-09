import { useEffect, useState } from 'react';
import Container from '../../components/Container';
import LoadingSpinner from '../../components/Spinner';
import Divider from '../../components/Divider';
import Button from '../../components/Button';
import Alert from '../../components/Alerts';
import { AccountPlus, ArrowRight, Eye } from '../../components/SVG';

import './style.css';
import { translate } from '../../config';

const CharSelect = () => {
    const [loading, setLoading] = useState('alt' in window);
    const [characters, setCharacters] = useState<any[]>(
        'alt' in window
            ? []
            : [
                  { rpName: 'Jonas Valanciunas', cash: '299', job: 'someJob', updated_at: '2021:21:21' },
                  { rpName: 'Jonas Valanciunas', cash: '299', job: 'someJob', updated_at: '2021:21:21' },
              ]
    );
    const [charactersAllowed, setCharactersAllowed] = useState(20);
    const [error, setError] = useState(false);

    const viewChar = (id: string) => () => {
        if ('alt' in window) {
            alt.emit('Webview:Character:Selection:View', id);
        }
    };

    const playChar = (id: string) => () => {
        if ('alt' in window) {
            alt.emit('Webview:Character:Selection:Play', id);
        }
    };

    const createNew = () => {
        if (characters.length >= charactersAllowed) {
            setError(true);
            return;
        }
        if ('alt' in window) {
            alt.emit('Webview:Character:Selection:Create');
        }
    };

    const fetchData = (data: string, charactersAllowed: number) => {
        setCharacters(JSON.parse(data));
        setCharactersAllowed(charactersAllowed);
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

    return (
        <Container className="w-[350px] absolute top-1/2 left-8 transform -translate-y-1/2 select-none text-whitesmoke">
            <p className="font-marker text-2xl font-bold m-0 relative">{translate('charSelect', 'title')}</p>
            <Divider />
            <div className="max-h-[500px] overflow-y-scroll p-2 overflow-x-hidden">
                {loading ? (
                    <div className="flex justify-center m-8">
                        <LoadingSpinner />
                    </div>
                ) : characters.length < 1 ? (
                    <div className="m-5">{translate('charSelect', 'notFound')}</div>
                ) : (
                    characters.map((character: any, index: number) => (
                        <div key={index}>
                            <div className="flex">
                                <div className="w-[40%] ">
                                    <div className="w-full text-center font-bold">{character.rpName}</div>
                                    <div className="w-full flex justify-end relative mt-2">
                                        <Eye
                                            className="hover:fill-whitesmokehover cursor-pointer -left-[4px] -top-[5px] absolute"
                                            onClick={viewChar(character._id)}
                                            size={45}
                                        />
                                        <Button
                                            onClick={playChar(character._id)}
                                            className=" text-sm  p-1 pl-3 right-0 w-3/4"
                                        >
                                            <div className="translate-x-3 flex items-center">
                                                {translate('charSelect', 'play')}
                                                <ArrowRight className="translate-x-2" />
                                            </div>
                                        </Button>
                                    </div>
                                </div>

                                <div className="text-right text-sm flex flex-col justify-center ml-auto">
                                    <div>
                                        <span>{translate('charSelect', 'cash')}: </span>
                                        <span className="text-[#607d8b] font-bold">
                                            {character.cash} {'$'}
                                        </span>
                                    </div>
                                    <div>
                                        <span>{translate('charSelect', 'lastPlayed')}: </span>
                                        <span className="text-[#607d8b] font-bold">
                                            {character.updated_at.slice(0, character.updated_at.indexOf('T'))}
                                        </span>
                                    </div>
                                    <div>
                                        <span>{translate('charSelect', 'job')}: </span>
                                        <span className="text-[#607d8b] font-bold">{character.job}</span>
                                    </div>
                                </div>
                            </div>
                            {characters.length - 1 > index && <Divider />}
                        </div>
                    ))
                )}
            </div>
            <Divider />
            <Button className="flex items-center" onClick={createNew} disabled={loading}>
                <AccountPlus />
                <div>{translate('charSelect', 'createnew')}</div>
            </Button>
            {error && <Alert message={translate('charSelect', 'error_limit')} type="error" />}
        </Container>
    );
};

export default CharSelect;
