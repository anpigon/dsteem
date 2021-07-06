"use strict";
/* tslint:disable:no-string-literal */
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
var misc_1 = require("./../steem/misc");
var RCAPI = /** @class */ (function () {
    function RCAPI(client) {
        this.client = client;
    }
    /**
     * Convenience for calling `rc_api`.
     */
    RCAPI.prototype.call = function (method, params) {
        return this.client.call('rc_api', method, params);
    };
    /**
     * Returns RC data for array of usernames
     */
    RCAPI.prototype.findRCAccounts = function (usernames) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.call('find_rc_accounts', { accounts: usernames })];
                    case 1: return [2 /*return*/, (_a.sent())['rc_accounts']];
                }
            });
        });
    };
    /**
     * Returns the global resource params
     */
    RCAPI.prototype.getResourceParams = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.call('get_resource_params', {})];
                    case 1: return [2 /*return*/, (_a.sent())['resource_params']];
                }
            });
        });
    };
    /**
     * Returns the global resource pool
     */
    RCAPI.prototype.getResourcePool = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.call('get_resource_pool', {})];
                    case 1: return [2 /*return*/, (_a.sent())['resource_pool']];
                }
            });
        });
    };
    /**
     * Makes a API call and returns the RC mana-data for a specified username
     */
    RCAPI.prototype.getRCMana = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var rc_account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findRCAccounts([username])];
                    case 1:
                        rc_account = (_a.sent())[0];
                        return [2 /*return*/, this.calculateRCMana(rc_account)];
                }
            });
        });
    };
    /**
     * Makes a API call and returns the VP mana-data for a specified username
     */
    RCAPI.prototype.getVPMana = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.call("condenser_api", 'get_accounts', [[username]])];
                    case 1:
                        account = (_a.sent())[0];
                        return [2 /*return*/, this.calculateVPMana(account)];
                }
            });
        });
    };
    /**
     * Calculates the RC mana-data based on an RCAccount - findRCAccounts()
     */
    RCAPI.prototype.calculateRCMana = function (rc_account) {
        return this._calculateManabar(Number(rc_account.max_rc), rc_account.rc_manabar);
    };
    /**
     * Calculates the RC mana-data based on an Account - getAccounts()
     */
    RCAPI.prototype.calculateVPMana = function (account) {
        var max_mana = misc_1.getVests(account) * Math.pow(10, 6);
        return this._calculateManabar(max_mana, account.voting_manabar);
    };
    /**
     * Internal convenience method to reduce redundant code
     */
    RCAPI.prototype._calculateManabar = function (max_mana, _a) {
        var current_mana = _a.current_mana, last_update_time = _a.last_update_time;
        var delta = Date.now() / 1000 - last_update_time;
        current_mana = Number(current_mana) + (delta * max_mana / 432000);
        var percentage = Math.round(current_mana / max_mana * 10000);
        if (!isFinite(percentage) || percentage < 0) {
            percentage = 0;
        }
        else if (percentage > 10000) {
            percentage = 10000;
        }
        return { current_mana: current_mana, max_mana: max_mana, percentage: percentage };
    };
    return RCAPI;
}());
exports.RCAPI = RCAPI;
