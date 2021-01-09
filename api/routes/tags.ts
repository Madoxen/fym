import express, {Request, Response} from 'express'
import db from '../db';


var router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try
    {
        let result = await db.query("SELECT * FROM tags", []);
        return res.status(200).json(result.rows);
    }
    catch(e)
    {
        return res.status(500).json(e)
    }
})

export default router;
