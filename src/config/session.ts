import config from ".";

import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "@/db/client";

export default session({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // ms
  },
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: true,
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000, //ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
});
