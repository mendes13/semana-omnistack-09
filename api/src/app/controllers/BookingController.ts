import { Request, Response } from 'express';

import Booking from '../schemas/Booking';

class BookingController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.headers;
    const { spot_id, date } = req.body;

    const booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date,
    });

    await booking
      .populate('spot')
      .populate('user')
      .execPopulate();

    return res.json(booking);
  }
}

export default new BookingController();
