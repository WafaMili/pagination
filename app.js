const fastify = require('fastify')({ logger: true });
const sequelize = require('./config/database');
const user = require('./models/user');

const PORT = 3000;
fastify.register(require('./router/router'));

const start = async () => {
  try {
    await fastify.listen({ port: PORT });
    console.log(`Server is running on port ${PORT}`);
    await sequelize.authenticate();
    console.log('Connection  successfully.');
    

  } catch (error) {
    console.error('Unable to connect to the database:', error);
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
