import * as alt from 'alt-client';
import { NotificationEvents } from '../../../../shared/enums/events/webviewEvents';
import { showNotification } from './functions';

alt.onServer(NotificationEvents.show, showNotification);
