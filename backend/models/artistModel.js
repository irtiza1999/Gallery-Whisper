import mongoose from "mongoose";


const artistSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    nationality: {
        type: String,
    },
    info:{
        type: String,
        required: true
    },
    exhibitions:{
        type: String,
    }
}
,{
    timestamps: true
});

const Artist = mongoose.model("Artist", artistSchema);

export default Artist;