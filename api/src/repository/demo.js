import instance from '../db.js';
async function FindAllDemo() {
    try {
        const db = await instance.GetDb();
        const collection = db.collection('tracing');
        return collection.find({}).toArray();
    } catch (error) {
        console.log('Error in GetDemo:', error);
        return;
    }
}

export default { FindAllDemo }