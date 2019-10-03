import { Request, Response } from 'express';

import User from '../schemas/User';

class SessionController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.json({ userExists });
    }

    const user = await User.create({ email });

    return res.json({ user });
  }
}

export default new SessionController();
