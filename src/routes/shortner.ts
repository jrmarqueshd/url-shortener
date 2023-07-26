import { getLinkController, postLinkController } from "../controllers/shortner";
import { getLinkModel, postLinkModel } from "../models/shortner";

async function shortnerRoutes (fastify: any) {
  fastify.post('/url', { schema: { body: postLinkModel } }, postLinkController);
  fastify.get('/url/:hash', { schema: { params: getLinkModel } }, getLinkController);
}

export default shortnerRoutes;