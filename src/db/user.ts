import { client } from "@/db/client";
import { Prisma } from "@prisma/client";
import { Record } from "@prisma/client/runtime/library";
import { fromPromise, Result } from "neverthrow";

const userSelect = {
  id: true,
  username: true,
  password: true,
  created_at: true,
} satisfies Prisma.UserSelect;
type User = Prisma.UserGetPayload<{ select: typeof userSelect }>;

export const { byId, byUsername } = {
  byId: (id: string) => ({ id }),
  byUsername: (username: string) => ({ username }),
} satisfies Record<string, (...args: any) => Prisma.UserWhereUniqueInput>;

export const findUser = async (
  args: Prisma.UserWhereUniqueInput,
): Promise<Result<User, Error>> => {
  return fromPromise(
    client.user.findUnique({
      where: args,
    }),
    (e: Prisma.PrismaClientKnownRequestError) =>
      new Error(`Prisma Error: ${e.message}`),
  );
};

export const createUser = async (
  args: Prisma.UserCreateInput,
): Promise<Result<User, Error>> => {
  return fromPromise(
    client.user.create({ data: args }),
    (e: Prisma.PrismaClientKnownRequestError) => {
      if (e.code === "P2002") return new Error("Username already exists.");
      return new Error(`Prisma Error: ${e.message}`);
    },
  );
};
