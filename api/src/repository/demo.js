import instance from '../db.js';

async function FindAllDemo() {
    try {
        const db = await instance.GetDb();
        const collection = db.collection(process.env.DB_COLLECTION);
        return await collection.find({}).toArray();
    } catch (error) {
        console.log('Error in FindAllDemo:', error);
        return;
    }
}

async function FindOneDemo(id) {
    try {
        const db = await instance.GetDb();
        const collection = db.collection(process.env.DB_COLLECTION);
        return await collection.findOne({ _id: id });
    } catch (error) {
        console.log('Error in FindOneDemo:', error);
        return;
    }
}

async function CreateDemo(data) {
    try {
        const db = await instance.GetDb();
        const collection = db.collection(process.env.DB_COLLECTION);
        console.log('Creating demo:', data);
        for (const item of data) {
            await collection.insertOne(item);
        }
    } catch (error) {
        console.log('Error in CreateDemo:', error);
        return;
    }
}

export default { FindAllDemo, FindOneDemo, CreateDemo }