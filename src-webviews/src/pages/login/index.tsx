import React, { useState } from 'react';
import { Discord } from './discord';

import logo from './logo.png';
import Container from '../../components/Container';
import Divider from '../../components/Divider';
import { translate } from '../../config';

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        if ('alt' in window) alt.emit('Webview:Login:Begin');
    };

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none">
            <Container className="w-96 flex flex-col items-center">
                <img className="w-1/2" src={logo} />
                <Divider className="w-full" />
                <div className="px-0 py-8 text-center text-whitesmoke relative">{translate('login', 'header')}</div>
                <Divider className="w-full" />
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className={`mt-5 p-2.5 border border-discord text-whitesmoke font-bold cursor-pointer flex justify-center items-center transition-all hover:border-whitetext-whitesmoke rounded bg-discord hover:border-whitesmoke`}
                >
                    <Discord className={`${loading ? 'animate-spin' : 'mr-2.5'} h-5 w-5`} />
                    {loading ? '' : translate('login', 'loginWithDiscord')}
                </button>
            </Container>
        </div>
    );
};

export default Login;
