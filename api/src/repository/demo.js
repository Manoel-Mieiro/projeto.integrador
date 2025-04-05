import instance from '../db.js';


async function FindAllDemo() {
    try {
        const db = await instance.GetDb();
        const collection = db.collection('tracing');

        return await collection.find({}).toArray();
    } catch (error) {
        console.log('Error in GetDemo:', error);
        return;
    }
}

async function CreateDemo(data) {
    try {
        const db = await instance.GetDb();
        const collection = db.collection('tracing');

        console.log('Creating demo:', data);
        await collection.insertOne(data)
    } catch (error) {
        console.log('Error in CreateDemo:', error);
        return;
    }
}

export default { FindAllDemo, CreateDemo }