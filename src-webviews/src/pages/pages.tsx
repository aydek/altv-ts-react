import React from 'react';
import Chat from './chat';
import Inventory from './inventory';
import Login from './login';
import CharSelect from './charSelect';
import CharCreator from './charCreator';
import Notifications from './notifications/Notifications';
import Speedometer from './speedometer/Speedometer';

interface Page {
    name: string;
    component: React.FC;
}

export const Pages: Page[] = [
    { name: 'chat', component: Chat },
    { name: 'inventory', component: Inventory },
    { name: 'login', component: Login },
    { name: 'charSelect', component: CharSelect },
    { name: 'charCreator', component: CharCreator },
    { name: 'notifications', component: Notifications },
    { name: 'speedometer', component: Speedometer },
];
