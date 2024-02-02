import express from 'express';
import datacontroller from '../controller/Datacontroller.js';

const router = express.Router();

router.get('/', datacontroller.autosave,datacontroller.getData)
router.get('/data',  datacontroller.getDataholdInfo)

export default router