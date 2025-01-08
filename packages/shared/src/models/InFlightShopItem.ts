import { Schema, model } from 'mongoose';

const InFlightShopItemSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true }
});

export default model('InFlightShopItem', InFlightShopItemSchema);
