import express from 'express';
import z from 'zod';
import {
  DEFAULT_INDEX,
  getStarknetAccount,
  SPACES_INDICIES
} from './dependencies';
import { NETWORKS } from './networks';
import { createNetworkHandler } from './rpc';
import { rpcError } from '../utils';

const jsonRpcRequestSchema = z.object({
  id: z.any(),
  method: z.enum([
    'send',
    'execute',
    'registerTransaction',
    'registerProposal',
    'getDataByMessageHash',
  ]),
  params: z.any()
});

const handlers = Object.fromEntries(
  Array.from(NETWORKS.keys()).map(chainId => [
    chainId,
    createNetworkHandler(chainId)
  ])
);

const router = express.Router();

router.post('/:chainId', (req, res) => {
  const chainId = req.params.chainId;

  const parsed = jsonRpcRequestSchema.safeParse(req.body);
  if (!parsed.success) return rpcError(res, 400, parsed.error, 0);
  const { id, method, params } = parsed.data;

  const handler = handlers[chainId];
  if (!handler) return rpcError(res, 404, new Error('Unsupported chainId'), id);

  handler[method](id, params, res);
});

router.get('/relayers', (req, res) => {
  const mnemonic = process.env.STARKNET_MNEMONIC || '';

  const defaultRelayer = getStarknetAccount(mnemonic, DEFAULT_INDEX).address;
  const relayers = Object.fromEntries(
    Array.from(SPACES_INDICIES).map(([spaceAddress, index]) => {
      const { address } = getStarknetAccount(mnemonic, index);
      return [spaceAddress, address];
    })
  );

  res.json({
    default: defaultRelayer,
    ...relayers
  });
});

export default router;
