import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
// This code defines a Mongoose schema for a user model in a MongoDB database. The schema includes fields for the user's name, email address, and password. It also includes an optional field for storing data related to the user's shopping cart.
// The `minimize: false` option is used to ensure that empty objects are not removed from the document, which can be useful for maintaining the structure of the cart data even when it is empty.
// The `userModel` is then created from the schema and exported for use in other parts of the application, such as for user registration, authentication, and managing user data in the database.
