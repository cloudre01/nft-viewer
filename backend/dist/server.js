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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("./utils");
const app = (0, express_1.default)();
const port = 3001;
app.use(express_1.default.json());
app.get("/api/nfts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address } = req.query;
    if (!address || !(0, utils_1.isValidAddress)(address)) {
        return res.status(400).json({
            error: "Missing required parameter 'address'",
        });
    }
    try {
        const nfts = yield fetchNFTData(address);
        res.json(nfts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to fetch NFT data",
        });
    }
}));
function fetchNFTData(address) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.opensea.io/api/v2/chain/ethereum/account/${address}/nfts`;
        const { data } = yield (0, axios_1.default)(url, {
            headers: { "X-API-KEY": process.env.OPENSEA_API_KEY },
        });
        return data.nfts.filter((asset) => {
            var _a;
            return asset.contract.toLowerCase() ===
                ((_a = process.env.PUDGY_PENGUINS_CONTRACT_ADDRESS) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase());
        });
    });
}
app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});
