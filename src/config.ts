import Fastify from 'fastify';
import { validatorCompiler, serializerCompiler, ZodTypeProvider } from "fastify-type-provider-zod";

const server = Fastify({
  logger: true
}).setValidatorCompiler(validatorCompiler).setSerializerCompiler(serializerCompiler).withTypeProvider<ZodTypeProvider>();

server.register(import('@fastify/rate-limit'), {
  max: 5,
  timeWindow: '10 minute'
})

export default server;