import { Schema, model } from 'mongoose';

const BookingSchema = new Schema({
  date: Date,
  approved: Boolean,
});

export default model('Booking', BookingSchema);
