"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const golobalErrorHandler_1 = __importDefault(require("./app/middlewares/golobalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
exports.port = 5000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Appliction routs
app.use('/api/v1', routes_1.default);
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!');
// });
app.use(golobalErrorHandler_1.default);
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: ' Not Found',
        errorMessage: [
            {
                path: req.originalUrl,
                errorMessage: ' API Not Found',
            },
        ],
    });
    next();
});
exports.default = app;
