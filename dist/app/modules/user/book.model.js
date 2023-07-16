"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userEmail: { type: String },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    publicationDate: { type: String, required: true },
    reviews: { type: [String], default: [] },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
// 3. Create a Model.
exports.Book = (0, mongoose_1.model)('Book', userSchema);
