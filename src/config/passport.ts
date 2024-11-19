import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import type { User } from "@prisma/client";
import { findUser, byUsername, byId } from "@/db/user";

export default passport;

const localStrategy = new LocalStrategy(async (username, password, done) => {
  const result = await findUser(byUsername(username));
  if (result.isErr()) return done(result.error);

  const user = result.value;
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
});
passport.use(localStrategy);

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const result = await findUser(byId(id));
  if (result.isErr()) return done(result.error);

  done(null, result.value);
});
