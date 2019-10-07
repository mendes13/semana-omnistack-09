import { Request, Response } from 'express';

import Booking from '../schemas/Booking';

class ApprovalController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { booking_id } = req.params;

    const booking = await Booking.findById(booking_id).populate('spot');
    booking.approved = true;

    await booking.save();

    const bookingUserSocket = req.connectedUsers[booking.user];

    if (bookingUserSocket) {
      req.io.to(bookingUserSocket).emit('booking_request', booking);
    }

    return res.json(booking);
  }
}

export default new ApprovalController();
