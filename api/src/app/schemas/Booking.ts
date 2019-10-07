import { Schema, model } from 'mongoose';

const BookingSchema = new Schema({
  date: Date,
  approved: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  spot: {
    type: Schema.Types.ObjectId,
    ref: 'Spot',
  },
});

export default model('Booking', BookingSchema);
