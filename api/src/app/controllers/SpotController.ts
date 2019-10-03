import { Request, Response } from 'express';

import User from '../schemas/User';
import Spot from '../schemas/Spot';

class SpotController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { tech } = req.query;

    const spots = await Spot.find({ techs: tech });

    return res.json(spots);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      techs: techs.split(',').map(tech => tech.trim()),
      price,
    });

    return res.json(spot);
  }
}

export default new SpotController();
