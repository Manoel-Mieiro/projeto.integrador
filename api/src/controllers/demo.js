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

async function FindOneDemo(req, res) {
    try {
        const asw = await demoService.FindOneDemo(req.params.id);
        if (!asw) {
            return res.status(404).json({ message: 'Demo not found' });
        }
        res.status(200).json(asw);
    } catch (error) {
        throw new Error('Error in GetDemo controller: ' + error.message);
    }
}

async function CreateDemo(req, res) {
    try {
        const data = req.body;
        console.log('Creating demo:', data);
        await demoService.CreateDemo(data);
        res.status(201).json({ message: 'Demo created successfully' });
    } catch (error) {
        throw new Error('Error in CreateDemo controller: ' + error.message);
    }
}

export default { FindAllDemo, FindOneDemo, CreateDemo };
