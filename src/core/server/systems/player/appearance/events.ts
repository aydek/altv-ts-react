import * as alt from 'alt-server';
import { AppearanceEvents } from '../../../../shared/enums/events/appieranceEvents';
import { systems } from '../../systems';
import { DefaultEvents } from '../../../../shared/enums/events/defaultEvents';
import { inventoryID, inventoryItems } from '../../inventory/config';
import { NotificationIcons } from '../../../../shared/enums/icons';
import { InventoryEvents } from '../../../../shared/enums/events/webviewEvents';

alt.onClient(AppearanceEvents.model, handleModelChange);
alt.onClient(AppearanceEvents.setTop, handleSetTop);
alt.on(DefaultEvents.playerUseItem, handleUseItem);

function handleModelChange(player: alt.Player, model: string) {
    player.model = model;
}

function handleSetTop(player: alt.Player, top: number, texture: number, undershirt: number, undertexture: number) {
    systems.player.appearance.setTop(player, top, texture, undershirt, undertexture);
}

function handleUseItem(player: alt.Player, index: number, quantity: number = 1, update: boolean = true) {
    const item = player.inventory[index];
    const equip = player.equipment;
    const itemid = typeof item.id === 'string' ? parseInt(item.id) : item.id;
    const itemConfig = inventoryItems[itemid];

    if (!item || item.id === -1 || !itemConfig) {
        return;
    }

    if (itemid === inventoryID.top) {
        if (equip.tops && equip.tops[0] !== -1) {
            if (!systems.inventory.addItem(player, itemid, equip.tops[4], 1, equip.tops[0], equip.tops[1], equip.tops[2], equip.tops[3])) {
                systems.notifications.show(player, NotificationIcons.error, 5000, 'Error', systems.translate('INV_CLEAN_YOUR_INV'));
                return;
            }
        }
        player.equipment.tops = [item.p1, item.p2, item.p3, item.p4, item.description];
        systems.player.appearance.updateClothes(player, player.dna.sex);
        systems.inventory.removeItem(player, index, quantity, true);
        if (update) {
            systems.inventory.fetchPrimary(player);
        }
        return;
    }

    if (itemid >= inventoryID.shoes && itemid <= inventoryID.armour) {
        let timeout = 0;
        if (itemid === inventoryID.armour) {
            // alt.emitClient(player, InventoryEvents.usedItem, item.id, quantity, systems.translate('INV_USING'), true);
            // timeout = 5000;
        }
        alt.setTimeout(() => {
            if (item !== player.inventory[index]) {
                return;
            }

            const key = itemConfig.img as keyof IEquipment;

            if (equip[key] && equip[key][0] !== -1) {
                if (!systems.inventory.addItem(player, itemid, equip[key][2] as string, 1, equip[key][0], equip[key][1])) {
                    systems.notifications.show(player, NotificationIcons.error, 5000, 'Error', systems.translate('INV_CLEAN_YOUR_INV'));
                    return;
                }
            }

            player.equipment[key][0] = item.p1;
            player.equipment[key][1] = item.p2;
            player.equipment[key][2] = item.description;
            systems.player.appearance.updateClothes(player, player.dna.sex);
            systems.inventory.removeItem(player, index, quantity, true);
            if (update) {
                systems.inventory.fetchPrimary(player);
            }
        }, timeout);
        return;
    }
}
