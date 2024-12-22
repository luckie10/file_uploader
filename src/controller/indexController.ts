import {
  byUniqueId,
  byUserId,
  createDirectory,
  deleteDirectory,
  getDirectories,
  getDirectory,
  updateDirectory,
} from "@/db/directory";
import type { Request, Response } from "express";

export const index_get = async (req: Request, res: Response) => {
  const result = await getDirectories({ where: byUserId(req.body.id) });
  if (result.isErr()) return console.log(result.error);
  const directories = result.value;
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
  const result = await getDirectory(byUniqueId(req.params.id));
  if (result.isErr()) return res.send(`Error: ${result.error}`);
  res.render("delete_form", { directory: result.value });
};

export const deleteFolder_post = async (req: Request, res: Response) => {
  const result = await deleteDirectory({ id: req.params.id });
  if (result.isErr()) return res.send("Error: " + result.error);

  res.redirect("/");
};

export const updateFolder_get = async (req: Request, res: Response) => {
  const result = await getDirectory(byUniqueId(req.params.id));
  if (result.isErr()) return res.send(`Error: ${result.error}`);
  res.render("update_form", { name: result.value.name });
};

export const updateFolder_post = async (req: Request, res: Response) => {
  const result = await updateDirectory(
    { id: req.params.id },
    { name: req.body.name },
  );
  if (result.isErr()) return res.send(`Error: ${result.error}`);
  res.redirect("/");
  res.send(`Update folder POST: ${req.params.id}`);
};
