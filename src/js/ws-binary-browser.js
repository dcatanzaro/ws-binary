function Package() {
    this.bufferRcv = new dcodeIO.ByteBuffer(
        dcodeIO.ByteBuffer.DEFAULT_CAPACITY,
        true
    );
    
    this.bufferSnd = new dcodeIO.ByteBuffer(
        dcodeIO.ByteBuffer.DEFAULT_CAPACITY,
        true
    );

    this.setData = function(data) {
        this.bufferRcv = new dcodeIO.ByteBuffer.wrap(data, 'utf8', true);
    };

    this.getPackageID = function() {
        var packageID = this.getByte();

        return packageID;
    };

    this.setPackageID = function(packageID) {
        this.bufferSnd = new dcodeIO.ByteBuffer(
            dcodeIO.ByteBuffer.DEFAULT_CAPACITY,
            true
        );
        this.writeByte(packageID);
    };

    this.writeByte = function(numByte, signed) {
        if (!numByte) {
            numByte = 0;
        }

        if (signed) {
            this.bufferSnd.writeInt8(parseInt(numByte));
        } else {
            this.bufferSnd.writeUint8(parseInt(numByte));
        }
    };

    this.writeShort = function(numShort, signed) {
        if (!numShort) {
            numShort = 0;
        }

        if (signed) {
            this.bufferSnd.writeInt16(parseInt(numShort));
        } else {
            this.bufferSnd.writeUint16(parseInt(numShort));
        }
    };

    this.writeInt = function(numInt, signed) {
        if (!numInt) {
            numInt = 0;
        }

        if (signed) {
            this.bufferSnd.writeInt32(parseInt(numInt));
        } else {
            this.bufferSnd.writeUint32(parseInt(numInt));
        }
    };

    this.writeFloat = function(numFloat) {
        if (!numFloat) {
            numFloat = 0;
        }

        this.bufferSnd.writeFloat(parseInt(numFloat));
    };

    this.writeDouble = function(numDouble) {
        if (!numDouble) {
            numDouble = 0;
        }

        this.bufferSnd.writeDouble(parseInt(numDouble));
    };

    this.writeString = function(dataString) {
        if (!dataString) {
            dataString = '';
        }

        this.writeShort(dcodeIO.ByteBuffer.calculateUTF8Chars(dataString));

        this.bufferSnd.writeString(dataString);
    };

    this.getByte = function(signed) {
        var dByte = 0;

        if (signed) {
            dByte = this.bufferRcv.readInt8();
        } else {
            dByte = this.bufferRcv.readUint8();
        }

        return dByte;
    };

    this.getShort = function(signed) {
        var dShort = 0;

        if (signed) {
            dShort = this.bufferRcv.readInt16();
        } else {
            dShort = this.bufferRcv.readUint16();
        }

        return dShort;
    };

    this.getInt = function(signed) {
        var dInt = 0;

        if (signed) {
            dInt = this.bufferRcv.readInt32();
        } else {
            dInt = this.bufferRcv.readUint32();
        }

        return dInt;
    };

    this.getFloat = function() {
        var dFloat = 0;

        dFloat = this.bufferRcv.readFloat();

        return dFloat;
    };

    this.getDouble = function() {
        var dDouble = 0;

        dDouble = this.bufferRcv.readDouble();

        return dDouble;
    };

    this.getString = function() {
        var lengthStr = this.getShort();

        var dString = this.bufferRcv.readString(
            lengthStr,
            dcodeIO.ByteBuffer.METRICS_CHARS
        );

        return dString;
    };

    this.dataSend = function() {
        this.bufferSnd.flip();
        return this.bufferSnd.toBuffer();
    };
}

module.exports = Package;
