import mongoose from "mongoose";

export const mongoConnect = () => {
    mongoose.connect("mongodb://localhost:27017")
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

