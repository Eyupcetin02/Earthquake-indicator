const amqp = require("amqplib/callback_api");

const sendMessage = (req, res) => {
 
  amqp.connect("amqp://rabbitmq", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      const message = req.body;
      console.log("req.body", req.body.siddet);
      const jsonString = JSON.stringify(message);
      const queueName = "earthQuake-Queue"; 
      channel.assertQueue(queueName, {
        durable: false,
      });
      channel.sendToQueue(queueName, Buffer.from(jsonString));

      res.send("Message sent to RabbitMQ");
    });
  });
};

const sendMessageToError = (req, res) => {
  
  amqp.connect("amqp://rabbitmq", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      const message = req.body;
      const jsonString = JSON.stringify(message);
      const queueName = "error-queue"; 
      channel.assertQueue(queueName, {
        durable: false,
      });
      channel.sendToQueue(queueName, Buffer.from(jsonString));

      res.send("Message sent to RabbitMQ");
    });
  });
};

module.exports = { sendMessage , sendMessageToError};
