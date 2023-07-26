import { z } from "zod";

export const postLinkModel = z.object({
  url: z.string().max(1000),
}); 

export const getLinkModel = z.object({
  hash: z.string().length(10),
}); 