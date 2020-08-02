const Pump = require('./ModelPump');

module.exports = class ModelDispencer {

    constructor(props = -1) {

        this.dispencerId = props;
        this.coilUnixtime = 0;
        this.side = false;
        this.registerUnixtime = 0;
        this.pump_1 = new Pump(null);
        this.pump_2 = new Pump(null);

    }

    setCoils(data) {

        //console.log('setCoil ', data.length, data);

        if (!Array.isArray(data)) {
            data = [];
        }

        while (data.length < global.config.modbus.packetCoilSize) {
            data.push(false);
        }

        this.coilUnixtime = data[0];
        this.side = data[1];

        if (this.side) {
            //pump1 is pumpA
            //pump2 is pumpB
            this.pump_1.setCoils(data, 2, 12, 2 * this.dispencerId - 1);
            this.pump_2.setCoils(data, 14, 12, 2 * this.dispencerId);
        } else {
            //pump1 is pumpB
            //pump2 is pumpA
            this.pump_2.setCoils(data, 2, 12, 2 * this.dispencerId - 1);
            this.pump_1.setCoils(data, 14, 12, 2 * this.dispencerId);
        }
    }

    setRegisters(data) {

        //console.log('setRegisters ', data.length, data);

        if (!Array.isArray(data)) {
            data = [];
            while (data.length < global.config.modbus.packetRegisterSize) {
                data.push(0);
            }
        }
        this.registerUnixtime = (data[0] << 16) + data[1];

        if (this.side) {
            //pump1 is pumpA
            //pump2 is pumpB
            this.pump_1.setRegisters(data.slice(2, 23));
            this.pump_2.setRegisters(data.slice(23, 44));
        } else {
            //pump1 is pumpB
            //pump2 is pumpA
            this.pump_1.setRegisters(data.slice(23, 44));
            this.pump_2.setRegisters(data.slice(2, 23));
        }

    }

};
