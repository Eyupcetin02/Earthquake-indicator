const amqp = require("amqplib")

const checkrabbit = async()=>{
    try {
        const connection = await amqp.connect('amqp://localhost');
        await connection.close();
        return true;
    } catch (error) {
        return false;
    }
}



const checkserver = async(req , res)=>{
    const rabbitmqstatus = await checkrabbit()
    if (rabbitmqstatus) {
        res.status(200).json({ status: 'healthy', message: 'RabbitMQ connection is successful' });
    } else {
        res.status(500).json({ status: 'unhealthy', message: 'Failed to establish RabbitMQ connection' });
    }
}

module.exports = {checkserver}