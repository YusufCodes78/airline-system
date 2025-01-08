// src/models/Passenger.ts
import { Schema, model, Model, Document }  from 'mongoose';
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "staff";
  tokens: { token: string }[];
  generateAuthToken: () => Promise<string>;
}

export interface UserModel extends Model<UserDocument> {
  findByCredentials(email: string, password: string): Promise<UserDocument>; // Static method
}

const UserSchema = new Schema<UserDocument, UserModel>({
  name: { type: String, required: true, trim: true, },
  email: { type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value:any) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    }, },
  password: { type: String, required: true , trim: true,
    minlength: 7,},
  role: { type: String, required: true, enum: ["admin", "staff"] },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// To send only specific values of the user
UserSchema.methods.toJSON = function () {
  const user = this;
  const userJson = user.toObject();
  delete userJson.password;
  delete userJson.tokens;
  return userJson;
};

// To generate authentication token everytime user signs up or logs in
UserSchema.methods.generateAuthToken = async function ():Promise<string> {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET || "");
  console.log("generated token " + token);
  
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// This function runs everytime a user is saved, and works as a middleware
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// This function runs everytime for a request to get user or anything related to it
UserSchema.statics.findByCredentials = async (email:string, password:string):Promise<UserDocument> => {
  const user = await model("User", UserSchema).findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }
  return user;
};

export default model<UserDocument, UserModel>('User', UserSchema);;




