import { getUserById } from '~/server/controllers/user.controllers';

export default defineEventHandler(async (event) => {
  switch (event.node.req.method) {
    case 'GET':
      return await getUserById(event);
    default:
      return { message: 'Method not allowed' };
  }
});
