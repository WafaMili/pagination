const { Op } = require('sequelize');
const User = require('../models/user');
const bcrypt = require('bcrypt');
async function getUsers(request, reply) {
  const { page = 1 } = request.query;
  const limit = 3; 
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await User.findAndCountAll({
      limit,
      offset,
    });

    return { count, rows };
  } catch (err) {
    console.error('Error fetching users:', err);
    reply.status(500).send({ error: 'Failed to fetch users' });
  }

}
async function addUser(request, reply) {
    const { username, email ,password,telephone} = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = await User.create({
        username,
        email,
        password:hashedPassword,
        telephone
      });
  
      reply.code(201).send({ message: 'User created successfully', user: newUser });
    } catch (err) {
      console.error('Error creating user:', err);
      reply.status(500).send({ error: 'Failed to create user' });
    }
  }
  


module.exports = async function (fastify, opts) {
  
  fastify.get('/', getUsers);
  fastify.post('/users', addUser);

 
};
