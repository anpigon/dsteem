"use strict";
exports.__esModule = true;
var asset_1 = require("./asset");
/**
 * Buffer wrapper that serializes to a hex-encoded string.
 */
var HexBuffer = /** @class */ (function () {
    function HexBuffer(buffer) {
        this.buffer = buffer;
    }
    /**
     * Convenience to create a new HexBuffer, does not copy data if value passed is already a buffer.
     */
    HexBuffer.from = function (value) {
        if (value instanceof HexBuffer) {
            return value;
        }
        else if (value instanceof Buffer) {
            return new HexBuffer(value);
        }
        else if (typeof value === 'string') {
            return new HexBuffer(Buffer.from(value, 'hex'));
        }
        else {
            return new HexBuffer(Buffer.from(value));
        }
    };
    HexBuffer.prototype.toString = function (encoding) {
        if (encoding === void 0) { encoding = 'hex'; }
        return this.buffer.toString(encoding);
    };
    HexBuffer.prototype.toJSON = function () {
        return this.toString();
    };
    return HexBuffer;
}());
exports.HexBuffer = HexBuffer;
/**
 * Return the vesting share price.
 */
function getVestingSharePrice(props) {
    var totalVestingFund = asset_1.Asset.from(props.total_vesting_fund_steem);
    var totalVestingShares = asset_1.Asset.from(props.total_vesting_shares);
    if (totalVestingFund.amount === 0 || totalVestingShares.amount === 0) {
        return new asset_1.Price(new asset_1.Asset(1, 'VESTS'), new asset_1.Asset(1, 'STEEM'));
    }
    return new asset_1.Price(totalVestingShares, totalVestingFund);
}
exports.getVestingSharePrice = getVestingSharePrice;
/**
 * Returns the vests of specified account. Default: Subtract delegated & add received
 */
function getVests(account, subtract_delegated, add_received) {
    if (subtract_delegated === void 0) { subtract_delegated = true; }
    if (add_received === void 0) { add_received = true; }
    var vests = asset_1.Asset.from(account.vesting_shares);
    var vests_delegated = asset_1.Asset.from(account.delegated_vesting_shares);
    var vests_received = asset_1.Asset.from(account.received_vesting_shares);
    var withdraw_rate = asset_1.Asset.from(account.vesting_withdraw_rate);
    var already_withdrawn = (Number(account.to_withdraw) - Number(account.withdrawn)) / 1000000;
    var withdraw_vests = Math.min(withdraw_rate.amount, already_withdrawn);
    vests = vests.subtract(withdraw_vests);
    if (subtract_delegated) {
        vests = vests.subtract(vests_delegated);
    }
    if (add_received) {
        vests = vests.add(vests_received);
    }
    return vests.amount;
}
exports.getVests = getVests;
