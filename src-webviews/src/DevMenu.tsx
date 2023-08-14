import React, { useEffect, useState } from 'react';
import { Pages } from './pages/pages';
import Container from './components/Container';
import Button from './components/Button';

interface PageEntry {
    name: string;
    component: React.FC;
}

const DevMenu: React.FC = () => {
    const [selectedPages, setSelectedPages] = useState<PageEntry[]>([]);
    const [menuOpen, setMenuOpen] = useState<boolean>(true);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.shiftKey && event.key === 'F') {
                setMenuOpen((prevMenuOpen) => !prevMenuOpen);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const togglePage = (page: PageEntry) => {
        setSelectedPages((prevSelected) =>
            prevSelected.some((p) => p.name === page.name)
                ? prevSelected.filter((p) => p.name !== page.name)
                : [...prevSelected, page]
        );
    };

    return (
        <div>
            {menuOpen && (
                <Container className="absolute bottom-4 left-4 space-x-2 z-50 ">
                    {Pages.map((page) => (
                        <Button
                            className={selectedPages.includes(page) ? 'bg-success' : ''}
                            key={page.name}
                            onClick={() => togglePage(page)}
                        >
                            {page.name}
                        </Button>
                    ))}
                </Container>
            )}
            <div>
                {selectedPages.map((page) => (
                    <div key={page.name}>
                        <page.component />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DevMenu;
