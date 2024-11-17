import { prisma } from "@/db/client";
import { Prisma } from "@prisma/client";
import { fromPromise, ResultAsync } from "neverthrow";

export const findUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return user;
};

const userSelect = {
  id: true,
  username: true,
  password: true,
  created_at: true,
} satisfies Prisma.UserSelect;
type User = Prisma.UserGetPayload<{ select: typeof userSelect }>;

export const createUser = async (
  args: Prisma.UserCreateInput,
): Promise<ResultAsync<User, Error>> => {
  return fromPromise(
    prisma.user.create({ data: args }),
    (e: Prisma.PrismaClientKnownRequestError) => {
      if (e.code === "P2002") return new Error("Username already exists.");
    },
  );
};
