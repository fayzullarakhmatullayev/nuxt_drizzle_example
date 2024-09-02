import { db } from '~/server/drizzle/db';
import { UserTable } from '~/server/drizzle/schema';

import { H3Event } from 'h3';
import { UserDto } from '~/interfaces/dto/user.dto';
import { UserModel } from '~/interfaces/models/user.model';
import { eq } from 'drizzle-orm';

export const getAllUsers = async () => {
  try {
    const users: UserModel[] = await db.query.UserTable.findMany({ orderBy: UserTable.name });
    return users;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (event: H3Event) => {
  try {
    const body = await readBody<UserDto>(event);
    const users: UserModel[] = await db
      .insert(UserTable)
      .values({ name: body.name, email: body.email, age: body.age })
      .returning()
      .execute();

    return users[0];
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (event: H3Event) => {
  try {
    const { id: userId } = getRouterParams(event);

    if (!userId || typeof userId !== 'string') {
      throw new Error('User ID is required and must be a string');
    }

    const user: UserModel[] = await db.select().from(UserTable).where(eq(UserTable.id, userId));
    return user[0];
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (event: H3Event) => {
  try {
    const body = await readBody<UserDto>(event);
    const { id: userId } = getQuery(event);

    if (!userId || typeof userId !== 'string') {
      throw new Error('User ID is required and must be a string');
    }

    if (!body.name && !body.email && !body.age) {
      throw new Error('At least one field must be provided for updating');
    }

    await db
      .update(UserTable)
      .set({ name: body.name, email: body.email, age: body.age })
      .where(eq(UserTable.id, userId))
      .execute();

    console.log(`User with id ${userId} has been updated.`);

    return { message: `User with id ${userId} has been updated.` };
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (event: H3Event) => {
  try {
    const { id: userId } = getQuery(event);

    if (!userId || typeof userId !== 'string') {
      throw new Error('User ID is required and must be a string');
    }

    await db.delete(UserTable).where(eq(UserTable.id, userId)).execute();

    return { message: `User with id ${userId} has been deleted.` };
  } catch (error) {
    throw error;
  }
};
