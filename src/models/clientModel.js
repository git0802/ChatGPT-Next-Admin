const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema(
  {
    userEmail: { type: String, required: true },
    amount: { type: Number },
    status: { type: String },
  },
  { timestamps: true },
);
const Client =
  mongoose.models.tbl_users || mongoose.model("tbl_users", ClientSchema);

export default Client;
