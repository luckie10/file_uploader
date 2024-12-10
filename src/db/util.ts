import { Prisma } from "@prisma/client";

type prismaErrors =
  | Prisma.PrismaClientUnknownRequestError
  | Prisma.PrismaClientValidationError
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientInitializationError
  | Prisma.PrismaClientRustPanicError;

export const handlePrismaError = (e: prismaErrors) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === "P2002")
      return new Error(`${e.meta.target} already exists.`);
  }
  return new Error(`Prisma Error: ${e.message}`);
};
