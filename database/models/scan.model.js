import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    chronicDiseases: {
        type: [String],
        enum: ["diabetes", "heart", "pressure", "anemia"],
        default: []
    },
});

const User = mongoose.model("User", userSchema);

export default User;
