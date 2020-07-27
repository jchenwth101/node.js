const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const ExpressData = require('./model/express-data.js');

const app = express();
const port = 8115

app.use(express.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));

const hbs = handlebars.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        'objToList': function (context) {
            return Object.entries(context);
        },
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function requestHander(req, res){
    let params = new ExpressData(req).params;
    let props = new ExpressData(req).props
    params = !isEmpty(params) ? params : null;
    props = !isEmpty(props) ? props : null;
    res.render('response', {requestType: req.method, requestParams: params, requestBody: props});
}

app.get('/', requestHander);
app.post('/', requestHander);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))