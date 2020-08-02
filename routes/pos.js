var express = require('express');
var router = express.Router();
const RefuelModel = require('./../models/RefuelModel');
const Answer = require('./Answer');


router.get('/', function (req, res) {

    let result = global.refuels.filter(elem => elem.finish === false).map(({_id, pumpId, consume, price, unit}) => ({
        _id,
        pumpId,
        consume,
        price,
        unit
    }));
    Answer.success(res, result);
});

router.get('/reset', function (req, res) {
    global.refuels.forEach(item => {
        item.finish = false;
        item.traking = null;
    })
    Answer.save(res, "اطلاعات برای تست مجدد ریست شد.");
});

router.get('/:pumpId', (req, res) => {
    let result = global.refuels.filter(elem => elem.pumpId + '' === req.params.pumpId && elem.finish === false).map(({_id, pumpId, consume, price, unit}) => ({
        _id,
        pumpId,
        consume,
        price,
        unit
    }));
    // console.log(result, req.params.pumpId)
    if (result.length === 1) {
        Answer.success(res, result[0]);
    } else {
        Answer.fail(res, null);
    }
});

//reports payment of specific refuel
router.post('/:refuelId/:traking', function (req, res) {

    global.refuels.forEach(item => {
        if (item._id === req.params.refuelId) {
            item.finish = true;
            item.traking = req.params.traking;
            return Answer.success(res, true);
        }
    });
    Answer.error(res, "شما یه خطا دارین حالا یا مربوط به پیدا نشدن رکورد هست یا خطای برنامه به احتمال خیلی خیلی کم");
});


module.exports = router;
