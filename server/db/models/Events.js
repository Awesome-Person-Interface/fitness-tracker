import mongoose from 'mongoose';
const { Schema } = mongoose;

const EventSchema = new Schema({
  user_id: { type: String, ref: 'User', required: true },

  // vvvv Required for React-Big-Calendar vvvv
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  allDay: { type: Boolean, default: false },
  // ^^^^ Required for React-Big-Calendar ^^^^

  // Additional info to display when opening an event
  desc: { type: String, default: '' },
  category: { type: String, default: '' },
  /*
    Categories:
      - ... fill in later ...
  */

});

// Create the Meals using the schema
const Events = mongoose.model('Event', EventSchema);

export default Events;
