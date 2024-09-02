import { relations } from 'drizzle-orm';
import {
  primaryKey,
  boolean,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';

export const UserRole = pgEnum('userRole', ['ADMIN', 'BASIC']);

export const UserTable = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    age: integer('age').notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    role: UserRole('userRole').default('BASIC').notNull()
  },
  (table) => ({
    emailIndex: uniqueIndex('emailIndex').on(table.email),
    uniqueNamAndAge: unique('uniqueNamAndAge').on(table.name, table.age)
  })
);

export const UserPreferencesTable = pgTable('user_preferences', {
  id: uuid('id').primaryKey().defaultRandom(),
  emailUpdates: boolean('emailUpdates').notNull().default(false),
  userId: uuid('userId')
    .references(() => UserTable.id, { onDelete: 'cascade' })
    .notNull()
});

export const PostTable = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  content: varchar('content', { length: 255 }).notNull(),
  averageRating: integer('averageRating').notNull().default(0),
  createAt: timestamp('createAt').defaultNow().notNull(),
  updatedAt: timestamp('createAt').defaultNow().notNull(),
  authorId: uuid('authorId')
    .references(() => UserTable.id)
    .notNull()
});

export const CategoryTable = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull()
});

export const PostCategoryTable = pgTable(
  'post_categories',
  {
    postId: uuid('postId')
      .references(() => PostTable.id)
      .notNull(),
    categoryId: uuid('categoryId')
      .references(() => CategoryTable.id)
      .notNull()
  },
  (table) => ({
    pk: primaryKey({ columns: [table.postId, table.categoryId] })
  })
);

// RELATIONS
export const UserTableRelations = relations(UserTable, ({ one, many }) => ({
  preferences: one(UserPreferencesTable),
  posts: many(PostTable)
}));

export const UserPreferencesTableRelations = relations(UserPreferencesTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [UserPreferencesTable.userId],
    references: [UserTable.id]
  })
}));

export const PostTableRelations = relations(PostTable, ({ one, many }) => ({
  author: one(UserTable, {
    fields: [PostTable.authorId],
    references: [UserTable.id]
  }),
  postCategories: many(CategoryTable)
}));

export const CategoryTableRelations = relations(CategoryTable, ({ many }) => ({
  postCategories: many(PostTable)
}));

export const PostCategoryTableRelations = relations(PostCategoryTable, ({ one }) => ({
  post: one(PostTable, {
    fields: [PostCategoryTable.postId],
    references: [PostTable.id]
  }),
  category: one(CategoryTable, {
    fields: [PostCategoryTable.categoryId],
    references: [CategoryTable.id]
  })
}));
