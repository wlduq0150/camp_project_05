import mongoose from "mongoose";

export const mongoConnect = () => {
    mongoose.connect(`mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PW}@cluster0.lzwxq3s.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log("몽고디비 연결 성공");
    })
    .catch(() => {
        console.log("몽고디비 연결 실패");
    });

    mongoose.connection.on("error", err => {
        console.log("mongoDB 연결 에러\n", err);
    });
    
    mongoose.connection.on("disconnected", mongoConnect);
}

