import { z } from 'zod';
import { procedure, router } from '../trpc';
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),

  getUser: procedure.input(z.object({text: z.string()}),).query(async ({ input }) => {
    return {
      greeting: await prisma.user.findFirst(),
    };
  }),

  insertUser: procedure.input(z.object({text: z.string()}),).query(async ({ input }) => {
    return {
      greeting: await prisma.user.create({
        data: {
          name: 'Alice',
          email: 'alice@prisma.io',
        },
      }),
    };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;