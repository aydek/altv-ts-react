import './utility/reconnect/ipc';
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
import './systems/vehicle/vehicle';
import './commands/general';
import './commands/dev';

import { utility } from './utility/utility';
import { connectLocalClient } from './utility/reconnect/reconnect';

connectLocalClient();

utility.log.system(`alt:V Server - Boilerplate Started`);
