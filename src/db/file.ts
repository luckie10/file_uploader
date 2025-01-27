import { client } from "@/db/client";
import { Prisma } from "@prisma/client";
import { fromPromise } from "neverthrow";
import { handlePrismaError } from "./util";

export const createFile = async (args: Prisma.FileCreateInput) => {
  return fromPromise(client.file.create({ data: args }), handlePrismaError);
};
