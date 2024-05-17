const amqp = require("amqplib/callback_api");
const dataSchema = require("../schema/dataSchema");

const consumeFromQueue = () => {
  amqp.connect("amqp://rabbitmq", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      const queueName = "earthQuake-Queue";
      channel.assertQueue(queueName, { durable: false });
      console.log(`Waiting for messages in queue: ${queueName}`);

      channel.consume(
        queueName,
        async function (msg) {
          try {
            console.log(msg.content + "msg");
            const messageContentBuffer = msg.content;
            const messageContentString = messageContentBuffer.toString();
            const messageContent = JSON.parse(messageContentString);
            // mongoya kayıd
            if (messageContent.siddet > 5) {
              const message = new dataSchema({
                lat: messageContent.lat,
                lon: messageContent.lon,
                siddet: messageContent.siddet,
              });
              await message.save();
              console.log("Message recorded:", messageContent);
            } else {
              console.log("not recorded");
            }
          } catch (error) {
            console.error("Error saving message to MongoDB:", error);
          }
        },
        { noAck: true }
      );
    });
  });
};


const consumeFromErrorQueue = () => {
  amqp.connect("amqp://rabbitmq", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }
      const queueName = "error-queue"; 
      channel.assertQueue(queueName, { durable: false });
      console.log(`Waiting for messages in queue: ${queueName}`);

      channel.consume(
        queueName,
        async function (msg) {
          try {
            console.log(msg.content + "msg");
          } catch (error) {
            console.error("Error handling message from error queue:", error);
          }
        },
        { noAck: true }
      );
    });
  });
};




module.exports = {
  consumeFromQueue,
  consumeFromErrorQueue,
};


