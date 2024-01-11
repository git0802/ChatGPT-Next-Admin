import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
  },
  { timestamps: true },
);

const User =
  mongoose.models.tbl_admin_users || mongoose.model("tbl_admin_users", UserSchema);

export default User;
