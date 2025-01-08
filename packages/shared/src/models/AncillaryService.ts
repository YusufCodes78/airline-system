import { Schema, model } from 'mongoose';

const AncillaryServiceSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true }
});

export default model('AncillaryService', AncillaryServiceSchema);
