import express, { Request, Response } from 'express';
import Form from '../models/Form';
import { resolve } from 'path';
import { rejects } from 'assert';

const router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
    try {
        const form = new Form(req.body);
        await form.save();
        res.status(201).json(form);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
});

router.get('/:id', (req: Request, res: Response) => {
    return new Promise<any>(async (resolve, rejects) => {
        try {
            const form = await Form.findById(req.params.id);
            if (!form) return res.status(404).json({ error: 'Form not found' });
            res.status(200).json(form);
        } catch (err) {
            res.status(500).json({ error: (err as Error).message });
        }
    })
});

router.post('/:id/response', (req: Request, res: Response) => {
    return new Promise<any>(async (resolve, rejects) => {
        try {
            const form = await Form.findById(req.params.id);
            if (!form) return res.status(404).json({ error: 'Form not found' });
            form.responses.push(req.body);
            await form.save();
            res.status(201).json({ message: 'Response saved successfully' });
        } catch (err) {
            res.status(400).json({ error: (err as Error).message });
        }
    })
});

export default router;
