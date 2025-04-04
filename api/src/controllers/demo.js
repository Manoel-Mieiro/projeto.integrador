import { request, response } from 'express';
import demoService from '../services/demo.js';

const req = request
const res = response;

async function FindAllDemo(req, res) {
    try {
        const asw = await demoService.FindAllDemo();
        res.status(200).json(asw);
    } catch (error) {
        throw new Error('Error in GetDemo controller: ' + error.message);
    }
}

export default { FindAllDemo };