"use strict";
/**
 * @file Database API helpers.
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
exports.__esModule = true;
var asset_1 = require("./../steem/asset");
var DatabaseAPI = /** @class */ (function () {
    function DatabaseAPI(client) {
        this.client = client;
    }
    /**
     * Convenience for calling `database_api`.
     */
    DatabaseAPI.prototype.call = function (method, params) {
        return this.client.call('condenser_api', method, params);
    };
    /**
     * Return state of server.
     */
    DatabaseAPI.prototype.getDynamicGlobalProperties = function () {
        return this.call('get_dynamic_global_properties');
    };
    /**
     * Return median chain properties decided by witness.
     */
    DatabaseAPI.prototype.getChainProperties = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.call('get_chain_properties')];
            });
        });
    };
    /**
     * Return all of the state required for a particular url path.
     * @param path Path component of url conforming to condenser's scheme
     *             e.g. `@almost-digital` or `trending/travel`
     */
    DatabaseAPI.prototype.getState = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.call('get_state', [path])];
            });
        });
    };
    /**
     * Return median price in SBD for 1 STEEM as reported by the witnesses.
     */
    DatabaseAPI.prototype.getCurrentMedianHistoryPrice = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = asset_1.Price).from;
                        return [4 /*yield*/, this.call('get_current_median_history_price')];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    /**
     * Get list of delegations made by account.
     * @param account Account delegating
     * @param from Delegatee start offset, used for paging.
     * @param limit Number of results, max 1000.
     */
    DatabaseAPI.prototype.getVestingDelegations = function (account, from, limit) {
        if (from === void 0) { from = ''; }
        if (limit === void 0) { limit = 1000; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.call('get_vesting_delegations', [account, from, limit])];
            });
        });
    };
    /**
     * Return server config. See:
     * https://github.com/steemit/steem/blob/master/libraries/protocol/include/steemit/protocol/config.hpp
     */
    DatabaseAPI.prototype.getConfig = function () {
        return this.call('get_config');
    };
    /**
     * Return header for *blockNum*.
     */
    DatabaseAPI.prototype.getBlockHeader = function (blockNum) {
        return this.call('get_block_header', [blockNum]);
    };
    /**
     * Return block *blockNum*.
     */
    DatabaseAPI.prototype.getBlock = function (blockNum) {
        return this.call('get_block', [blockNum]);
    };
    /**
     * Return all applied operations in *blockNum*.
     */
    DatabaseAPI.prototype.getOperations = function (blockNum, onlyVirtual) {
        if (onlyVirtual === void 0) { onlyVirtual = false; }
        return this.call('get_ops_in_block', [blockNum, onlyVirtual]);
    };
    /**
     * Return array of discussions (a.k.a. posts).
     * @param by The type of sorting for the discussions, valid options are:
     *           `active` `blog` `cashout` `children` `comments` `created`
     *           `feed` `hot` `promoted` `trending` `votes`. Note that
     *           for `blog` and `feed` the tag is set to a username.
     */
    DatabaseAPI.prototype.getDiscussions = function (by, query) {
        return this.call("get_discussions_by_" + by, [query]);
    };
    /**
     * Return array of account info objects for the usernames passed.
     * @param usernames The accounts to fetch.
     */
    DatabaseAPI.prototype.getAccounts = function (usernames) {
        return this.call('get_accounts', [usernames]);
    };
    /**
     * Convenience to fetch a block and return a specific transaction.
     */
    DatabaseAPI.prototype.getTransaction = function (txc) {
        return __awaiter(this, void 0, void 0, function () {
            var block, idx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.database.getBlock(txc.block_num)];
                    case 1:
                        block = _a.sent();
                        idx = block.transaction_ids.indexOf(txc.id);
                        if (idx === -1) {
                            throw new Error("Unable to find transaction " + txc.id + " in block " + txc.block_num);
                        }
                        return [2 /*return*/, block.transactions[idx]];
                }
            });
        });
    };
    /**
     * Verify signed transaction.
     */
    DatabaseAPI.prototype.verifyAuthority = function (stx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.call('verify_authority', [stx])];
            });
        });
    };
    return DatabaseAPI;
}());
exports.DatabaseAPI = DatabaseAPI;
