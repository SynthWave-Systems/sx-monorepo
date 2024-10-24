import { StaticJsonRpcProvider } from '@ethersproject/providers';

const providers: Record<number, StaticJsonRpcProvider | undefined> = {};

export function getProvider(networkId: number): StaticJsonRpcProvider {
  //const url = `https://rpc.snapshot.org/${networkId}`;
  const url = `https://dev-rpc.oortech.com`;

  let provider = providers[networkId];

  if (!provider) {
    provider = new StaticJsonRpcProvider({ url, timeout: 250000 }, networkId);
    providers[networkId] = provider;
  }

  return provider;
}
