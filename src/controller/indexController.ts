import { byUserId, createDirectory, getDirectories } from "@/db/directory";
import type { Request, Response } from "express";

export const index_get = async (req: Request, res: Response) => {
  const result = await getDirectories({ where: byUserId(req.body.id) });
  if (result.isErr()) return console.log(result.error);
  const directories = result.value;
  console.log(directories);
  res.render("index", { directories });
};

export const createFolder_post = async (req: Request, res: Response) => {
  const result = await createDirectory({
    name: req.body.name,
    user: {
      connect: { id: req.user.id },
    },
  });

  if (result.isErr()) {
    res.send("Error");
  }

  res.send("Dir created");
};

export const deleteFolder_get = async (req: Request, res: Response) => {
  res.send("delete Folder GET");
};

export const deleteFolder_post = async (req: Request, res: Response) => {
  res.send("delete Folder POST");
};

export const updateFolder_get = async (req: Request, res: Response) => {
  res.send("update Folder GET");
};

export const updateFolder_post = async (req: Request, res: Response) => {
  res.send("update Folder POST");
};
