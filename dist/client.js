"use strict";
/**
 * @file Steem RPC client implementation.
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
var verror_1 = require("verror");
var version_1 = require("./version");
var blockchain_1 = require("./helpers/blockchain");
var broadcast_1 = require("./helpers/broadcast");
var database_1 = require("./helpers/database");
var rc_1 = require("./helpers/rc");
var utils_1 = require("./utils");
/**
 * Library version.
 */
exports.VERSION = version_1["default"];
/**
 * Main steem network chain id.
 */
exports.DEFAULT_CHAIN_ID = Buffer.from('0000000000000000000000000000000000000000000000000000000000000000', 'hex');
/**
 * Main steem network address prefix.
 */
exports.DEFAULT_ADDRESS_PREFIX = 'STM';
/**
 * RPC Client
 * ----------
 * Can be used in both node.js and the browser. Also see {@link ClientOptions}.
 */
var Client = /** @class */ (function () {
    /**
     * @param address The address to the Steem RPC server, e.g. `https://api.steemit.com`.
     * @param options Client options.
     */
    function Client(address, options) {
        if (options === void 0) { options = {}; }
        this.address = address;
        this.options = options;
        this.chainId = options.chainId ? Buffer.from(options.chainId, 'hex') : exports.DEFAULT_CHAIN_ID;
        assert.equal(this.chainId.length, 32, 'invalid chain id');
        this.addressPrefix = options.addressPrefix || exports.DEFAULT_ADDRESS_PREFIX;
        this.timeout = options.timeout || 60 * 1000;
        this.backoff = options.backoff || defaultBackoff;
        this.database = new database_1.DatabaseAPI(this);
        this.broadcast = new broadcast_1.BroadcastAPI(this);
        this.blockchain = new blockchain_1.Blockchain(this);
        this.rc = new rc_1.RCAPI(this);
    }
    /**
     * Create a new client instance configured for the testnet.
     */
    Client.testnet = function (options) {
        var opts = {};
        if (options) {
            opts = utils_1.copy(options);
            opts.agent = options.agent;
        }
        opts.addressPrefix = 'STX';
        opts.chainId = '79276aea5d4877d9a25892eaa01b0adf019d3e5cb12a97478df3298ccdd01673';
        return new Client('https://testnet.steem.vc', opts);
    };
    /**
     * Make a RPC call to the server.
     *
     * @param api     The API to call, e.g. `database_api`.
     * @param method  The API method, e.g. `get_dynamic_global_properties`.
     * @param params  Array of parameters to pass to the method, optional.
     *
     */
    Client.prototype.call = function (api, method, params) {
        if (params === void 0) { params = []; }
        return __awaiter(this, void 0, void 0, function () {
            var request, body, opts, fetchTimeout, response, formatValue_1, data, message, top_1, topData_1, unformattedData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = {
                            id: '0',
                            jsonrpc: '2.0',
                            method: 'call',
                            params: [api, method, params]
                        };
                        body = JSON.stringify(request, function (key, value) {
                            // encode Buffers as hex strings instead of an array of bytes
                            if (typeof value === 'object' && value.type === 'Buffer') {
                                return Buffer.from(value.data).toString('hex');
                            }
                            return value;
                        });
                        opts = {
                            body: body,
                            cache: 'no-cache',
                            method: 'POST',
                            mode: 'cors'
                        };
                        if (this.options.agent) {
                            opts.agent = this.options.agent || "dsteem/" + version_1["default"];
                        }
                        if (api !== 'network_broadcast_api' && method.substring(0, 21) !== 'broadcast_transaction') {
                            // bit of a hack to work around some nodes high error rates
                            // only effective in node.js (until timeout spec lands in browsers)
                            fetchTimeout = function (tries) { return (tries + 1) * 500; };
                        }
                        return [4 /*yield*/, utils_1.retryingFetch(this.address, opts, this.timeout, this.backoff, fetchTimeout)
                            // resolve FC error messages into something more readable
                        ];
                    case 1:
                        response = _a.sent();
                        // resolve FC error messages into something more readable
                        if (response.error) {
                            formatValue_1 = function (value) {
                                switch (typeof value) {
                                    case 'object':
                                        return JSON.stringify(value);
                                    default:
                                        return String(value);
                                }
                            };
                            data = response.error.data;
                            message = response.error.message;
                            if (data && data.stack && data.stack.length > 0) {
                                top_1 = data.stack[0];
                                topData_1 = utils_1.copy(top_1.data);
                                message = top_1.format.replace(/\$\{([a-z_]+)\}/gi, function (match, key) {
                                    var rv = match;
                                    if (topData_1[key]) {
                                        rv = formatValue_1(topData_1[key]);
                                        delete topData_1[key];
                                    }
                                    return rv;
                                });
                                unformattedData = Object.keys(topData_1)
                                    .map(function (key) { return ({ key: key, value: formatValue_1(topData_1[key]) }); })
                                    .map(function (item) { return item.key + "=" + item.value; });
                                if (unformattedData.length > 0) {
                                    message += ' ' + unformattedData.join(' ');
                                }
                            }
                            throw new verror_1.VError({ info: data, name: 'RPCError' }, message);
                        }
                        assert.equal(response.id, request.id, 'got invalid response id');
                        return [2 /*return*/, response.result];
                }
            });
        });
    };
    return Client;
}());
exports.Client = Client;
/**
 * Default backoff function.
 * ```min(tries*10^2, 10 seconds)```
 */
var defaultBackoff = function (tries) {
    return Math.min(Math.pow(tries * 10, 2), 10 * 1000);
};
