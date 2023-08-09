import './utility/ipc'; // Used to reconnect, do not remove.

import { connectLocalClient } from './utility/reconnect';
import { utility } from './utility/utility';

utility.log.system(`alt:V Server - Boilerplate Started`);

connectLocalClient();

import './database/init';
import './systems/timeweather/interval';
import './systems/player/appearance/events';
import './systems/chat/events';
import './systems/inventory/events';
import './events/utilityEvents';
import './events/defaultEvents';
import './events/screen/login';
import './events/screen/charSelect';
import './events/screen/charCreator';
import './commands/general';
import './commands/dev';