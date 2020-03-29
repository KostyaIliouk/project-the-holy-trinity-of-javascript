const redis = require('../redishandler/redis');
const validator = require('../middleware/validator');

module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log(`${socket.id} connected`);

    socket.on('global', function() {
      console.log(`${socket.id} fetching global`);
      redis.global(socket);
    });

    socket.on('fetch', function(countryCode) {
      console.log(`${socket.id} fetching ${countryCode.toUpperCase()}`);
      const valid = validator.validate(countryCode);
      if (valid[0]) {
        redis.fetch(countryCode, socket);
      } else {
        socket.emit('fetchedData', [valid[1], valid[2]]);
      }
    });

    socket.on('disconnect', function() {
      console.log(`${socket.id} disconnected`);
    });
  });
}
