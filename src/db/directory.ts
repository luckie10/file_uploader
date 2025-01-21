import { client } from "@/db/client";
import { Prisma } from "@prisma/client";
import type { Directory } from "@prisma/client";
import { fromPromise, Result } from "neverthrow";
import { handlePrismaError } from "./util";

export const { byUniqueId, byUniqueParentId } = {
  byUniqueId: (id: string) => ({ id }),
  byUniqueParentId: (id: string, parentId: string | null) => ({ id, parentId }),
} satisfies Record<string, (...args: any) => Prisma.DirectoryWhereUniqueInput>;

export const getUserRootDir = async (userId: string) => {
  return fromPromise(
    client.directory.findFirst({
      where: {
        AND: {
          userId,
          parentId: null,
        },
      },
      include: {
        children: true,
        files: true,
      },
    }),
    handlePrismaError,
  );
};

export const getDirectory = async (
  where: Prisma.DirectoryWhereUniqueInput,
  select?: Prisma.DirectorySelect,
) => {
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

export const deleteDirectory = async (
  where: Prisma.DirectoryWhereUniqueInput,
): Promise<Result<Directory, Error>> => {
  return fromPromise(client.directory.delete({ where }), handlePrismaError);
};

export const updateDirectory = async (
  where: Prisma.DirectoryWhereUniqueInput,
  data: Prisma.DirectoryUpdateInput,
): Promise<Result<Directory, Error>> => {
  return fromPromise(
    client.directory.update({ where, data }),
    handlePrismaError,
  );
};
