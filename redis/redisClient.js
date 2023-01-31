const redis = require('redis');

const client = redis.createClient({
  socket: {
      host: process.env.REDIS_CACHE || 'localhost',
      port: '6379'
  }
});
client.on('connect', function() {
  console.log('Connected to Redis');
});
client.on('error', function (err) {
  console.log('Error: ' + err);
});

client.connect();

module.exports = client;
