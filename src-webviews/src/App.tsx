import React, { useEffect, useState } from 'react';
import { Pages } from './pages/pages';
import DevMenu from './DevMenu';

const App: React.FC = () => {
    const [selectedPages, setSelectedPages] = useState<string[]>([]);

    useEffect(() => {
        const diplayPage = (name: string) => {
            if (!Pages.some((page) => page.name.toLocaleLowerCase() === name.toLocaleLowerCase())) {
                console.error('Trying to load invalid page');
                return;
            }
            setSelectedPages((prev) => [...prev, name]);
        };

        const hidePage = (name: string) => {
            if (!Pages.some((page) => page.name.toLocaleLowerCase() === name.toLocaleLowerCase())) {
                console.error('Trying to load invalid page');
                return;
            }
            setSelectedPages((prev) => prev.filter((page) => page !== name));
        };

        if ('alt' in window) {
            alt.on('WebView:Display:Page', diplayPage);
            alt.on('Webview:Hide:Page', hidePage);
        }

        return () => {
            if ('alt' in window) {
                alt.off('WebView:Display:Page', diplayPage);
                alt.off('Webview:Hide:Page', hidePage);
            }
        };
    }, []);

    return (
        <div className="font-sans overflow-hidden">
            {Pages.map(
                (page) =>
                    selectedPages.includes(page.name) && (
                        <div key={page.name}>
                            <page.component />
                        </div>
                    )
            )}

            {!('alt' in window) && <DevMenu />}
        </div>
    );
};

export default App;
