import mongoose from "mongoose";

const succulentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["Aloe", "Cactus", "Echeveria", "Jade", "Haworthia", "Paddle"],
  },
  lastWatered: {
    type: Date,
    default: null,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Succulent = mongoose.model("Succulent", succulentSchema);
export default Succulent;
