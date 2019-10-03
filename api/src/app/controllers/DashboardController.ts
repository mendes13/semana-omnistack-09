import { Request, Response } from 'express';

import Spot from '../schemas/Spot';

class DashboardController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { user_id: userId } = req.headers;

    const spots = await Spot.find({ user: userId });

    return res.json(spots);
  }
}

export default new DashboardController();
