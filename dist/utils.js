"use strict";
/**
 * @file Misc utility functions.
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var stream_1 = require("stream");
var fetch = global['fetch']; // tslint:disable-line:no-string-literal
/**
 * Return a promise that will resove when a specific event is emitted.
 */
function waitForEvent(emitter, eventName) {
    return new Promise(function (resolve, reject) {
        emitter.once(eventName, resolve);
    });
}
exports.waitForEvent = waitForEvent;
/**
 * Sleep for N milliseconds.
 */
function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
exports.sleep = sleep;
/**
 * Return a stream that emits iterator values.
 */
function iteratorStream(iterator) {
    var _this = this;
    var stream = new stream_1.PassThrough({ objectMode: true });
    var iterate = function () { return __awaiter(_this, void 0, void 0, function () {
        var e_1, _a, iterator_1, iterator_1_1, item, e_1_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, 7, 12]);
                    iterator_1 = __asyncValues(iterator);
                    _b.label = 1;
                case 1: return [4 /*yield*/, iterator_1.next()];
                case 2:
                    if (!(iterator_1_1 = _b.sent(), !iterator_1_1.done)) return [3 /*break*/, 5];
                    item = iterator_1_1.value;
                    if (!!stream.write(item)) return [3 /*break*/, 4];
                    return [4 /*yield*/, waitForEvent(stream, 'drain')];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(iterator_1_1 && !iterator_1_1.done && (_a = iterator_1["return"]))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(iterator_1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    }); };
    iterate().then(function () {
        stream.end();
    })["catch"](function (error) {
        stream.emit('error', error);
        stream.end();
    });
    return stream;
}
exports.iteratorStream = iteratorStream;
/**
 * Return a deep copy of a JSON-serializable object.
 */
function copy(object) {
    return JSON.parse(JSON.stringify(object));
}
exports.copy = copy;
/**
 * Fetch API wrapper that retries until timeout is reached.
 */
function retryingFetch(url, opts, timeout, backoff, fetchTimeout) {
    return __awaiter(this, void 0, void 0, function () {
        var start, tries, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = Date.now();
                    tries = 0;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 6]);
                    if (fetchTimeout) {
                        opts.timeout = fetchTimeout(tries);
                    }
                    return [4 /*yield*/, fetch(url, opts)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP " + response.status + ": " + response.statusText);
                    }
                    return [4 /*yield*/, response.json()];
                case 3: return [2 /*return*/, _a.sent()];
                case 4:
                    error_1 = _a.sent();
                    if (timeout !== 0 && Date.now() - start > timeout) {
                        throw error_1;
                    }
                    return [4 /*yield*/, sleep(backoff(tries++))];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 6:
                    if (true) return [3 /*break*/, 1];
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.retryingFetch = retryingFetch;
// Hack to be able to generate a valid witness_set_properties op
// Can hopefully be removed when steemd's JSON representation is fixed
var ByteBuffer = require("bytebuffer");
var serializer_1 = require("./steem/serializer");
function serialize(serializer, data) {
    var buffer = new ByteBuffer(ByteBuffer.DEFAULT_CAPACITY, ByteBuffer.LITTLE_ENDIAN);
    serializer(buffer, data);
    buffer.flip();
    return Buffer.from(buffer.toBuffer());
}
function buildWitnessUpdateOp(owner, props) {
    var data = {
        extensions: [], owner: owner, props: []
    };
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
        var key = _a[_i];
        var type = void 0;
        switch (key) {
            case 'key':
            case 'new_signing_key':
                type = serializer_1.Types.PublicKey;
                break;
            case 'account_subsidy_budget':
            case 'account_subsidy_decay':
            case 'maximum_block_size':
                type = serializer_1.Types.UInt32;
                break;
            case 'sbd_interest_rate':
                type = serializer_1.Types.UInt16;
                break;
            case 'url':
                type = serializer_1.Types.String;
                break;
            case 'sbd_exchange_rate':
                type = serializer_1.Types.Price;
                break;
            case 'account_creation_fee':
                type = serializer_1.Types.Asset;
                break;
            default:
                throw new Error("Unknown witness prop: " + key);
        }
        data.props.push([key, serialize(type, props[key])]);
    }
    data.props.sort(function (a, b) { return a[0].localeCompare(b[0]); });
    return ['witness_set_properties', data];
}
exports.buildWitnessUpdateOp = buildWitnessUpdateOp;
