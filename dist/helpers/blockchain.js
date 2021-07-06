"use strict";
/**
 * @file Steem blockchain helpers.
 * @author Johan Nordberg <code@johan-nordberg.com>
 * @license
 * Copyright (c) 2017 Johan Nordberg. All Rights Reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *  1. Redistribution of source code must retain the above copyright notice, this
 *     list of conditions and the following disclaimer.
 *
 *  2. Redistribution in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 *     and/or other materials provided with the distribution.
 *
 *  3. Neither the name of the copyright holder nor the names of its contributors
 *     may be used to endorse or promote products derived from this software without
 *     specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * You acknowledge that this software is not designed, licensed or intended for use
 * in the design, construction, operation or maintenance of any military facility.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var utils_1 = require("./../utils");
var BlockchainMode;
(function (BlockchainMode) {
    /**
     * Only get irreversible blocks.
     */
    BlockchainMode[BlockchainMode["Irreversible"] = 0] = "Irreversible";
    /**
     * Get all blocks.
     */
    BlockchainMode[BlockchainMode["Latest"] = 1] = "Latest";
})(BlockchainMode = exports.BlockchainMode || (exports.BlockchainMode = {}));
var Blockchain = /** @class */ (function () {
    function Blockchain(client) {
        this.client = client;
    }
    /**
     * Get latest block number.
     */
    Blockchain.prototype.getCurrentBlockNum = function (mode) {
        if (mode === void 0) { mode = BlockchainMode.Irreversible; }
        return __awaiter(this, void 0, void 0, function () {
            var props;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.database.getDynamicGlobalProperties()];
                    case 1:
                        props = _a.sent();
                        switch (mode) {
                            case BlockchainMode.Irreversible:
                                return [2 /*return*/, props.last_irreversible_block_num];
                            case BlockchainMode.Latest:
                                return [2 /*return*/, props.head_block_number];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get latest block header.
     */
    Blockchain.prototype.getCurrentBlockHeader = function (mode) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = this.client.database).getBlockHeader;
                        return [4 /*yield*/, this.getCurrentBlockNum(mode)];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    /**
     * Get latest block.
     */
    Blockchain.prototype.getCurrentBlock = function (mode) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = this.client.database).getBlock;
                        return [4 /*yield*/, this.getCurrentBlockNum(mode)];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    /**
     * Return a asynchronous block number iterator.
     * @param options Feed options, can also be a block number to start from.
     */
    Blockchain.prototype.getBlockNumbers = function (options) {
        return __asyncGenerator(this, arguments, function getBlockNumbers_1() {
            var interval, current, seen;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        interval = 3;
                        if (!options) {
                            options = {};
                        }
                        else if (typeof options === 'number') {
                            options = { from: options };
                        }
                        return [4 /*yield*/, __await(this.getCurrentBlockNum(options.mode))];
                    case 1:
                        current = _a.sent();
                        if (options.from !== undefined && options.from > current) {
                            throw new Error("From can't be larger than current block num (" + current + ")");
                        }
                        seen = options.from !== undefined ? options.from : current;
                        _a.label = 2;
                    case 2:
                        if (!true) return [3 /*break*/, 11];
                        _a.label = 3;
                    case 3:
                        if (!(current > seen)) return [3 /*break*/, 8];
                        return [4 /*yield*/, __await(seen++)];
                    case 4: return [4 /*yield*/, _a.sent()];
                    case 5:
                        _a.sent();
                        if (!(options.to !== undefined && seen > options.to)) return [3 /*break*/, 7];
                        return [4 /*yield*/, __await(void 0)];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7: return [3 /*break*/, 3];
                    case 8: return [4 /*yield*/, __await(utils_1.sleep(interval * 1000))];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, __await(this.getCurrentBlockNum(options.mode))];
                    case 10:
                        current = _a.sent();
                        return [3 /*break*/, 2];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Return a stream of block numbers, accepts same parameters as {@link getBlockNumbers}.
     */
    Blockchain.prototype.getBlockNumberStream = function (options) {
        return utils_1.iteratorStream(this.getBlockNumbers(options));
    };
    /**
     * Return a asynchronous block iterator, accepts same parameters as {@link getBlockNumbers}.
     */
    Blockchain.prototype.getBlocks = function (options) {
        return __asyncGenerator(this, arguments, function getBlocks_1() {
            var e_1, _a, _b, _c, num, e_1_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 8, 9, 14]);
                        _b = __asyncValues(this.getBlockNumbers(options));
                        _d.label = 1;
                    case 1: return [4 /*yield*/, __await(_b.next())];
                    case 2:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 7];
                        num = _c.value;
                        return [4 /*yield*/, __await(this.client.database.getBlock(num))];
                    case 3: return [4 /*yield*/, __await.apply(void 0, [_d.sent()])];
                    case 4: return [4 /*yield*/, _d.sent()];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6: return [3 /*break*/, 1];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_1_1 = _d.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _d.trys.push([9, , 12, 13]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 11];
                        return [4 /*yield*/, __await(_a.call(_b))];
                    case 10:
                        _d.sent();
                        _d.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Return a stream of blocks, accepts same parameters as {@link getBlockNumbers}.
     */
    Blockchain.prototype.getBlockStream = function (options) {
        return utils_1.iteratorStream(this.getBlocks(options));
    };
    /**
     * Return a asynchronous operation iterator, accepts same parameters as {@link getBlockNumbers}.
     */
    Blockchain.prototype.getOperations = function (options) {
        return __asyncGenerator(this, arguments, function getOperations_1() {
            var e_2, _a, _b, _c, num, operations, _i, operations_1, operation, e_2_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 10, 11, 16]);
                        _b = __asyncValues(this.getBlockNumbers(options));
                        _d.label = 1;
                    case 1: return [4 /*yield*/, __await(_b.next())];
                    case 2:
                        if (!(_c = _d.sent(), !_c.done)) return [3 /*break*/, 9];
                        num = _c.value;
                        return [4 /*yield*/, __await(this.client.database.getOperations(num))];
                    case 3:
                        operations = _d.sent();
                        _i = 0, operations_1 = operations;
                        _d.label = 4;
                    case 4:
                        if (!(_i < operations_1.length)) return [3 /*break*/, 8];
                        operation = operations_1[_i];
                        return [4 /*yield*/, __await(operation)];
                    case 5: return [4 /*yield*/, _d.sent()];
                    case 6:
                        _d.sent();
                        _d.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 4];
                    case 8: return [3 /*break*/, 1];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _d.trys.push([11, , 14, 15]);
                        if (!(_c && !_c.done && (_a = _b["return"]))) return [3 /*break*/, 13];
                        return [4 /*yield*/, __await(_a.call(_b))];
                    case 12:
                        _d.sent();
                        _d.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_2) throw e_2.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Return a stream of operations, accepts same parameters as {@link getBlockNumbers}.
     */
    Blockchain.prototype.getOperationsStream = function (options) {
        return utils_1.iteratorStream(this.getOperations(options));
    };
    return Blockchain;
}());
exports.Blockchain = Blockchain;
