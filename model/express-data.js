const _ = require("lodash");
class ExpressData {
    constructor (req) {
        this.params = _.merge(req.params, req.query);
        this.props = _.merge(req.body);
    }
}
module.exports = ExpressData;
