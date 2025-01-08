import mongoose from 'mongoose';
const { Schema } = mongoose;

const EventSchema = new Schema({
  user_id: { type: String, ref: 'User' },
  
})

// Create the Meals using the schema
const Events = mongoose.model('Event', EventSchema);

export default Events;
