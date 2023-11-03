import mongoose from "mongoose";

const model_ = mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        default: "FOR_SALE"
    },
    owner: {
        type: String,
        required: true,
    },
    descripton: {
        type: String,
        default: "상품 설명이 등록되지 않았습니다."
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

export const productModel = mongoose.model("product", model_);