import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser
} from '~/server/controllers/user.controllers';

export default defineEventHandler(async (event) => {
  switch (event.node.req.method) {
    case 'POST':
      return await createUser(event);
    case 'PUT':
      return await updateUser(event);
    case 'GET':
      return await getAllUsers();
    case 'DELETE':
      return await deleteUser(event);
    default:
      return { message: 'Method not allowed' };
  }
});
