declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      created_at: Date;
      username: string;
      password: string;
    };
  }
}
