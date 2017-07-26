# ws-binary
WS Binary is the simple way to send and receive binary data between browser and node

## Install module
```
npm install ws-binary --save
```

## Require module

### Browser
```html
<script src="./node_modules/ws-binary/dist/ws-binary-browser.min.js"></script>
```
### Server
```js
const wsBinary = require('ws-binary');
```

## Example

### Browser
```js
var ws = new WebSocket('ws://localhost:5000');

ws.binaryType = 'arraybuffer';

var clientPacketID = {
    ping: 1
};

var serverPacketID = {
    pong: 1
};

var pkg = new Package();

ws.onmessage = function(res) {
    pkg.setData(res.data);

    var packageID = pkg.getPackageID();

    dictionaryClient[packageID]();
};

var dictionaryClient = {};
dictionaryClient[clientPacketID.ping] = ping;

function ping() {
    console.log("PING");

    pkg.setPackageID(serverPacketID.pong);
    ws.send(pkg.dataSend());
}
```

### Server
```js
const WebSocketServer = require('ws').Server,
    ws = new WebSocketServer({
        port: 5000
    }),
    wsBinary = require('ws-binary');

const pkg = new wsBinary();

var clientPacketID = {
    ping: 1
};

var serverPacketID = {
    pong: 1
};

ws.on('connection', function(ws) {
    pkg.setPackageID(clientPacketID.ping);
    ws.send(pkg.dataSend());

    ws.on('message', function(res) {
        pkg.setData(res);
        var packageID = pkg.getPackageID();
        
        dictionaryServer[packageID](ws);
    });
});

var dictionaryServer = {};
dictionaryServer[serverPacketID.pong] = pong;

function pong(ws) {
    console.log("PONG");
}
```

## Functions
* `setData(data)`
* `getPackageID()`
* `setPackageID(packageID)`
* `writeByte(numByte)`
* `writeShort(numShort)`
* `writeInt(numInt)`
* `writeFloat(numFloat)`
* `writeDouble(numDouble)`
* `writeString(dataString)`
* `getByte()`
* `getShort()`
* `getInt()`
* `getFloat()`
* `getDouble()`
* `getString()`
* `dataSend()`