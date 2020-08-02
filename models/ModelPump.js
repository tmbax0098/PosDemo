module.exports = class ModelPump {

    constructor(props) {

        this.pumpId = 0;
        this.price = 0;
        this.consume = 0;
        this.unit = 0;
        this.temp = 0;
        this.press = 0;
        this.key = false;
        this.red = false;
        this.green = false;
        this.start = false;
        this.stop = false;
        this.remote = false;
        this.finish = false;
        this.coilsAddress = {
            key: 0,
            red: 2,
            green: 3,
            start: 8,
            stop: 9,
            remote: 10,
            finish: 11,
        }
    }

    setCoils(coils = null, start = 0, length = 12, pumpId) {

        if (!Array.isArray(coils)) {
            coils = [];

        }
        while (coils.length < (start + length)) {
            coils.push(false);
        }

        this.pumpId = pumpId;

        this.key = coils[start];
        this.red = coils[start + 2];
        this.green = coils[start + 3];
        this.start = coils[start + 8];
        this.stop = coils[start + 9];
        this.remote = coils[start + 10];
        this.finish = coils[start + 11];

        this.coilsAddress = {
            key: start,
            red: start + 2,
            green: start + 3,
            start: start + 8,
            stop: start + 9,
            remote: start + 10,
            finish: start + 11,
        }
    }

    byteToInt(byte) {
        return (byte << 16) >> 16;
    }

    calcNumber(data) {
        data = data.reverse();
        let str = '';
        data.forEach(item => {
            //let item = String.fromCharCode(element);
            // console.log(typeof item);
            if (item !== 0x00) {
                str += String.fromCharCode(item & 0x7f);
                if (item & 0x80) {
                    str += ".";
                }
            }
        });
        return str.trim();
    }

    setRegisters(data = null) {
        if (!Array.isArray(data)) {
            data = [];
            while (data.length < (global.config.modbus.packetRegisterSize / 2) - 1) {
                data.push(20);
            }
        }

        this.price = this.calcNumber(data.slice(0, 6));
        this.consume = this.calcNumber(data.slice(6, 12));
        this.unit = this.calcNumber(data.slice(12, 18));
        this.temp = this.byteToInt(data[18]);
        this.press = this.byteToInt(data[19]);
    }

    transformToPos() {
        return {
            pumpId: this.pumpId,
            price: this.price,
            consume: this.consume,
            unit: this.unit,
        }
    }

    createDate() {
        let dt = new Date();
        return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate() + " " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
    }

    transformToServer() {
        return {
            pumpNumber: this.pumpId || 0,
            consumption: this.consume || 0,
            date: this.createDate(),
            vehicleId: null,
            amount: this.price || 0,
            stationId: global.config.stationId,

        }
    }

    transformToMonitor() {
        let consume = (this.consume).toString().trim().replace('.', '');
        consume = consume.substr(0, consume.length - 1);
//        console.log(consume, " - ", consume.length);

        let price = (this.price).toString().trim().replace('.', '');
        // let consume = "2.34"
        // let price = "12345";

        while (consume.length < 4) {
            consume = " " + consume;
        }

        while (price.length < 6) {
            price = " " + price;
        }

        let data = price + consume;
        let asciiKeys = [];

        for (var i = 0; i < data.length; i++) {
            asciiKeys.push(data[i].charCodeAt(0));
        }

        return asciiKeys;
    }
};
