import mongoose from 'mongoose';
import { utility } from '../utility/utility';

const url = 'mongodb+srv://aydek:blWY84sV7A62P54P@altv.k1puf.mongodb.net/altv?retryWrites=true&w=majority';

mongoose.set('strictQuery', true);

async function connect() {
    try {
        const connected = await mongoose.connect(url);
        if (!connected) {
            utility.log.error(`Did not connect to the database.`);
            return;
        }
        utility.log.system(`Database connected: ${connected.connection.host}`);
    } catch (error) {
        utility.log.error(error);
    }
}

connect();
