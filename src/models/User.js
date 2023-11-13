import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const { Schema } = mongoose;

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

});

userSchema.pre('save', async function (next) {
   const user = this;

   if (!user.isModified('password')) return next();

   try {
      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(user.password, salt);
      next();
   } catch (error) {
      throw new Error("Falló el hash de la contraseña");
   }

});

userSchema.methods.comparePassword = async function (candidatePassword) {
   return await bcryptjs.compare(candidatePassword, this.password);
};

export default userSchema;