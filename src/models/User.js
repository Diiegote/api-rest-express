import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
   name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
   },
   lastname: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
      validate: {
         validator: function (value) {
            return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
         },
         message: 'The provided email is not valid.',
      },
      trim: true,
      lowercase: true,
      index: { unique: true },
   },
   password: {
      type: String,
      require: true,
   },

})

export const User = model('User', userSchema);