import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model } = mongoose;

const authorSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // dateOfBirth: { type: Date, required: true },
    password: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['Admin', 'User'] },
    // avatar: {
    //   type: String,
    //   required: true,
    //   default: 'https://ui-avatars.com/api/?name=Unnamed+User',
    // },
  },
  { timestamps: true }
);

authorSchema.pre('save', async function (next) {
  const newAuthor = this;

  const plainPassword = newAuthor.password;
  if (newAuthor.isModified('password')) {
    newAuthor.password = await bcrypt.hash(plainPassword, 10);
  }
  next();
});

export default model('Author', authorSchema);
