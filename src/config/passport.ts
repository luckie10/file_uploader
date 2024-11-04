import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { prisma } from "@/db/client";
import type { User } from "@prisma/client";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user: User | null = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (!user)
        return done(null, false, {
          message: "Incorrect username or password.",
        });

      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return done(null, false, {
          message: "Incorrect username or password.",
        });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),
);

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user: User | null = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});
