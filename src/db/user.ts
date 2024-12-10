import { client } from "@/db/client";
import { Prisma } from "@prisma/client";
import { Record } from "@prisma/client/runtime/library";
import { fromPromise, Result } from "neverthrow";
import { handlePrismaError } from "./util";

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
    handlePrismaError,
  );
};

export const createUser = async (
  args: Prisma.UserCreateInput,
): Promise<Result<User, Error>> => {
  return fromPromise(client.user.create({ data: args }), handlePrismaError);
};
