import * as alt from 'alt-client';
import { NotificationEvents } from '../../../../shared/enums/events/webviewEvents';
import { cancelNotification, showNotification } from './functions';

alt.onServer(NotificationEvents.show, showNotification);
alt.onServer(NotificationEvents.cancel, cancelNotification);
