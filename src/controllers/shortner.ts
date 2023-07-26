import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import crypto from 'crypto'

import * as db from "../db";
import { getLinkModel, postLinkModel } from "../models/shortner";

export const postLinkController = async (request: FastifyRequest<{ Body: z.infer<typeof postLinkModel> }>, reply: FastifyReply) => {
  try {
    const { url } = request.body;

    const hash = crypto.createHash('sha256').update(url).digest('hex').toUpperCase().substring(0, 10);

    const data = await db.selectLink(hash);

    const shortnersUrl = `https://urlshorter.com/${hash}`;

    if (data) return reply.code(200).send({ data: shortnersUrl })

    await db.insertLink({ url, hash });

    return reply
      .code(201)
      .send({ data: shortnersUrl })
  } catch (error) {
    return reply
      .code(500)
      .send({ error });
  }    
}

export const getLinkController = async (request: FastifyRequest<{ Params: z.infer<typeof getLinkModel> }>, reply: FastifyReply) => {
  try {
    const { hash } = request.params;

    const data = await db.selectLink(hash);

    if (!data) return reply.code(404).send({ error: 'Url not found' })

    return reply
      .code(200)
      .send({ data })
  } catch (error) {
    return reply
      .code(500)
      .send({ error });
  } 
}