"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const PORT = process.env.PORT || 5000;
const isPrime = (n) => __awaiter(void 0, void 0, void 0, function* () {
    if (n <= 2)
        return n === 2;
    if (n % 2 === 0)
        return false;
    const limit = Math.sqrt(n);
    for (let i = 3; i <= limit; i += 2) {
        if (n % i === 0)
            return false;
    }
    return true;
});
const getNextPrime = (currentPrime) => __awaiter(void 0, void 0, void 0, function* () {
    let nextNum = currentPrime + 1;
    while (true) {
        if (yield isPrime(nextNum))
            return nextNum;
        nextNum++;
    }
});
let currentPrime = 3487961;
app.get('/next_prime', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nextPrimeNumber = yield getNextPrime(currentPrime);
    if (nextPrimeNumber > 10000000) {
        currentPrime = 2;
    }
    else {
        currentPrime = nextPrimeNumber;
    }
    res.status(200).json({ next_prime: nextPrimeNumber });
})));
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
});
