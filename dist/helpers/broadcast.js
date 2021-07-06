"use strict";
/**
 * @file Broadcast API helpers.
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
var assert = require("assert");
var crypto_1 = require("./../crypto");
var account_1 = require("./../steem/account");
var asset_1 = require("./../steem/asset");
var BroadcastAPI = /** @class */ (function () {
    function BroadcastAPI(client) {
        this.client = client;
        /**
         * How many milliseconds in the future to set the expiry time to when
         * broadcasting a transaction, defaults to 1 minute.
         */
        this.expireTime = 60 * 1000;
    }
    /**
     * Broadcast a comment, also used to create a new top level post.
     * @param comment The comment/post.
     * @param key Private posting key of comment author.
     */
    BroadcastAPI.prototype.comment = function (comment, key) {
        return __awaiter(this, void 0, void 0, function () {
            var op;
            return __generator(this, function (_a) {
                op = ['comment', comment];
                return [2 /*return*/, this.sendOperations([op], key)];
            });
        });
    };
    /**
     * Broadcast a comment and set the options.
     * @param comment The comment/post.
     * @param options The comment/post options.
     * @param key Private posting key of comment author.
     */
    BroadcastAPI.prototype.commentWithOptions = function (comment, options, key) {
        return __awaiter(this, void 0, void 0, function () {
            var ops;
            return __generator(this, function (_a) {
                ops = [
                    ['comment', comment],
                    ['comment_options', options],
                ];
                return [2 /*return*/, this.sendOperations(ops, key)];
            });
        });
    };
    /**
     * Broadcast a vote.
     * @param vote The vote to send.
     * @param key Private posting key of the voter.
     */
    BroadcastAPI.prototype.vote = function (vote, key) {
        return __awaiter(this, void 0, void 0, function () {
            var op;
            return __generator(this, function (_a) {
                op = ['vote', vote];
                return [2 /*return*/, this.sendOperations([op], key)];
            });
        });
    };
    /**
     * Broadcast a transfer.
     * @param data The transfer operation payload.
     * @param key Private active key of sender.
     */
    BroadcastAPI.prototype.transfer = function (data, key) {
        return __awaiter(this, void 0, void 0, function () {
            var op;
            return __generator(this, function (_a) {
                op = ['transfer', data];
                return [2 /*return*/, this.sendOperations([op], key)];
            });
        });
    };
    /**
     * Broadcast custom JSON.
     * @param data The custom_json operation payload.
     * @param key Private posting or active key.
     */
    BroadcastAPI.prototype.json = function (data, key) {
        return __awaiter(this, void 0, void 0, function () {
            var op;
            return __generator(this, function (_a) {
                op = ['custom_json', data];
                return [2 /*return*/, this.sendOperations([op], key)];
            });
        });
    };
    /**
     * Create a new account on testnet.
     * @param options New account options.
     * @param key Private active key of account creator.
     */
    BroadcastAPI.prototype.createTestAccount = function (options, key) {
        return __awaiter(this, void 0, void 0, function () {
            var username, metadata, creator, prefix, owner, active, posting, memo_key, ownerKey, activeKey, postingKey, fee, delegation, chainProps, creationFee, claim_op, create_op, ops, delegate_op;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assert(global.hasOwnProperty('it'), 'helper to be used only for mocha tests');
                        username = options.username, metadata = options.metadata, creator = options.creator;
                        prefix = this.client.addressPrefix;
                        if (options.password) {
                            ownerKey = crypto_1.PrivateKey.fromLogin(username, options.password, 'owner').createPublic(prefix);
                            owner = account_1.Authority.from(ownerKey);
                            activeKey = crypto_1.PrivateKey.fromLogin(username, options.password, 'active').createPublic(prefix);
                            active = account_1.Authority.from(activeKey);
                            postingKey = crypto_1.PrivateKey.fromLogin(username, options.password, 'posting').createPublic(prefix);
                            posting = account_1.Authority.from(postingKey);
                            memo_key = crypto_1.PrivateKey.fromLogin(username, options.password, 'memo').createPublic(prefix);
                        }
                        else if (options.auths) {
                            owner = account_1.Authority.from(options.auths.owner);
                            active = account_1.Authority.from(options.auths.active);
                            posting = account_1.Authority.from(options.auths.posting);
                            memo_key = crypto_1.PublicKey.from(options.auths.memoKey);
                        }
                        else {
                            throw new Error('Must specify either password or auths');
                        }
                        fee = options.fee, delegation = options.delegation;
                        delegation = asset_1.Asset.from(delegation || 0, 'VESTS');
                        fee = asset_1.Asset.from(fee || 0, 'TESTS');
                        if (!(fee.amount > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.client.database.getChainProperties()];
                    case 1:
                        chainProps = _a.sent();
                        creationFee = asset_1.Asset.from(chainProps.account_creation_fee);
                        if (fee.amount !== creationFee.amount) {
                            throw new Error('Fee must be exactly ' + creationFee.toString());
                        }
                        _a.label = 2;
                    case 2:
                        claim_op = [
                            'claim_account',
                            {
                                creator: creator,
                                extensions: [],
                                fee: fee
                            }
                        ];
                        create_op = [
                            'create_claimed_account',
                            {
                                active: active,
                                creator: creator,
                                extensions: [],
                                json_metadata: metadata ? JSON.stringify(metadata) : '',
                                memo_key: memo_key,
                                new_account_name: username,
                                owner: owner, posting: posting
                            }
                        ];
                        ops = [claim_op, create_op];
                        if (delegation.amount > 0) {
                            delegate_op = [
                                'delegate_vesting_shares',
                                {
                                    delegatee: username,
                                    delegator: creator,
                                    vesting_shares: delegation
                                }
                            ];
                            ops.push(delegate_op);
                        }
                        return [2 /*return*/, this.sendOperations(ops, key)];
                }
            });
        });
    };
    /**
     * Update account.
     * @param data The account_update payload.
     * @param key The private key of the account affected, should be the corresponding
     *            key level or higher for updating account authorities.
     */
    BroadcastAPI.prototype.updateAccount = function (data, key) {
        return __awaiter(this, void 0, void 0, function () {
            var op;
            return __generator(this, function (_a) {
                op = ['account_update', data];
                return [2 /*return*/, this.sendOperations([op], key)];
            });
        });
    };
    /**
     * Delegate vesting shares from one account to the other. The vesting shares are still owned
     * by the original account, but content voting rights and bandwidth allocation are transferred
     * to the receiving account. This sets the delegation to `vesting_shares`, increasing it or
     * decreasing it as needed. (i.e. a delegation of 0 removes the delegation)
     *
     * When a delegation is removed the shares are placed in limbo for a week to prevent a satoshi
     * of VESTS from voting on the same content twice.
     *
     * @param options Delegation options.
     * @param key Private active key of the delegator.
     */
    BroadcastAPI.prototype.delegateVestingShares = function (options, key) {
        return __awaiter(this, void 0, void 0, function () {
            var op;
            return __generator(this, function (_a) {
                op = ['delegate_vesting_shares', options];
                return [2 /*return*/, this.sendOperations([op], key)];
            });
        });
    };
    /**
     * Sign and broadcast transaction with operations to the network. Throws if the transaction expires.
     * @param operations List of operations to send.
     * @param key Private key(s) used to sign transaction.
     */
    BroadcastAPI.prototype.sendOperations = function (operations, key) {
        return __awaiter(this, void 0, void 0, function () {
            var props, ref_block_num, ref_block_prefix, expiration, extensions, tx, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.database.getDynamicGlobalProperties()];
                    case 1:
                        props = _a.sent();
                        ref_block_num = props.head_block_number & 0xFFFF;
                        ref_block_prefix = Buffer.from(props.head_block_id, 'hex').readUInt32LE(4);
                        expiration = new Date(new Date(props.time + 'Z').getTime() + this.expireTime).toISOString().slice(0, -5);
                        extensions = [];
                        tx = {
                            expiration: expiration,
                            extensions: extensions,
                            operations: operations,
                            ref_block_num: ref_block_num,
                            ref_block_prefix: ref_block_prefix
                        };
                        return [4 /*yield*/, this.send(this.sign(tx, key))];
                    case 2:
                        result = _a.sent();
                        assert(result.expired === false, 'transaction expired');
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Sign a transaction with key(s).
     */
    BroadcastAPI.prototype.sign = function (transaction, key) {
        return crypto_1.cryptoUtils.signTransaction(transaction, key, this.client.chainId);
    };
    /**
     * Broadcast a signed transaction to the network.
     */
    BroadcastAPI.prototype.send = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.call('broadcast_transaction_synchronous', [transaction])];
            });
        });
    };
    /**
     * Convenience for calling `condenser_api`.
     */
    BroadcastAPI.prototype.call = function (method, params) {
        return this.client.call('condenser_api', method, params);
    };
    return BroadcastAPI;
}());
exports.BroadcastAPI = BroadcastAPI;
