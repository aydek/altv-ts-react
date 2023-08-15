import * as alt from 'alt-server';

alt.onClient('Server:Nitro:On', (player, vehicle) => {
    if (!vehicle) return;

    vehicle.setStreamSyncedMeta('nitroMode', true);
});

alt.onClient('Server:Nitro:Off', (player, vehicle) => {
    if (!vehicle) return;

    vehicle.deleteStreamSyncedMeta('nitroMode');
});
