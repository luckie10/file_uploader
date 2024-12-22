import { client } from "@/db/client";
import { Prisma } from "@prisma/client";
import type { Directory } from "@prisma/client";
import { fromPromise, Result } from "neverthrow";
import { handlePrismaError } from "./util";

export const { byUniqueId } = {
  byUniqueId: (id: string) => ({ id }),
} satisfies Record<string, (...args: any) => Prisma.DirectoryWhereUniqueInput>;

export const getDirectory = async (
  where: Prisma.DirectoryWhereUniqueInput,
  select?: Prisma.DirectorySelect,
): Promise<Result<Directory, Error>> => {
  return fromPromise(
    client.directory.findUnique({
      where,
      select,
    }),
    handlePrismaError,
  );
};

export const { byUserId } = {
  byUserId: (userId: string) => ({ userId }),
} satisfies Record<string, (...args: any) => Prisma.DirectoryWhereInput>;

export const getDirectories = async (
  args: Prisma.DirectoryFindManyArgs,
): Promise<Result<Directory[], Error>> => {
  return fromPromise(client.directory.findMany(args), handlePrismaError);
};

export const createDirectory = async (args: Prisma.DirectoryCreateInput) => {
  return fromPromise(
    client.directory.create({ data: args }),
    handlePrismaError,
  );
};
