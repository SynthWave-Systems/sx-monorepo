import { EvmNetworkConfig } from './types';

type AdditionalProperties = {
  authenticators?: Record<string, string>;
  strategies?: Record<string, string>;
  executionStrategies?: Record<string, string>;
};

function createStandardConfig(
  eip712ChainId: number,
  additionalProperties: AdditionalProperties = {}
) {
  const additionalAuthenticators = additionalProperties.authenticators || {};
  const additionalStrategies = additionalProperties.strategies || {};
  const additionalExecutionStrategies =
    additionalProperties.executionStrategies || {};

  return {
    Meta: {
      eip712ChainId,
      proxyFactory: '0x4B4F7f64Be813Ccc66AEFC3bFCe2baA01188631c',
      masterSpace: '0xC3031A7d3326E47D49BfF9D374d74f364B29CE4D'
    },
    Authenticators: {
      EthSig: '0x5f9B7D78c9a37a439D78f801E0E339C6E711e260',
      EthTx: '0xBA06E6cCb877C332181A6867c05c8b746A21Aed1',
      ...additionalAuthenticators
    },
    Strategies: {
      Vanilla: '0xC1245C5DCa7885C73E32294140F1e5d30688c202',
      Comp: '0x0c2De612982Efd102803161fc7C74CcA15Db932c',
      OZVotes: '0x2c8631584474E750CEdF2Fb6A904f2e84777Aefe',
      Whitelist: '0x34f0AfFF5A739bBf3E285615F50e40ddAaf2A829',
      ...additionalStrategies
    },
    ProposalValidations: {
      VotingPower: '0x6D9d6D08EF6b26348Bd18F1FC8D953696b7cf311'
    },
    ExecutionStrategies: {
      SimpleQuorumAvatar: '0xecE4f6b01a2d7FF5A9765cA44162D453fC455e42',
      SimpleQuorumTimelock: '0xf2A1C2f2098161af98b2Cc7E382AB7F3ba86Ebc4',
      Axiom: null,
      Isokratia: null,
      ...additionalExecutionStrategies
    }
  };
}

function createStandardConfigOORT(
  eip712ChainId: number,
  additionalProperties: AdditionalProperties = {}
) {
  const additionalAuthenticators = additionalProperties.authenticators || {};
  const additionalStrategies = additionalProperties.strategies || {};
  const additionalExecutionStrategies =
    additionalProperties.executionStrategies || {};

  return {
    Meta: {
      eip712ChainId,
      proxyFactory: '0x401835F2Edb78533f05Eb223A96234cf461B95A3',
      masterSpace: '0xf91195b197e0c003B4E8c96983aade5A913c1BBF'
    },
    Authenticators: {
      EthSig: '0xBc4733e2B4ac2e9A842fc599e870B548fef9a25B',
      EthTx: '0xfB4996466825b9CD2D1C01b208edcf56D36698b7',
      ...additionalAuthenticators
    },
    Strategies: {
      Vanilla: '0x03215CfbcE47345dE5E9664156cF1c8D844DE6C0',
      Comp: '0x2F136A8937129A66f6092d930d93f092c6eaFEa4',
      OZVotes: '0x9941442691a5e3170F9b0B2219e1EE0A651C7Fa0',
      Whitelist: '0x7a0f4E4AF0F79620Cdb8dc0ac43564E1Fe7b8893',
      ...additionalStrategies
    },
    ProposalValidations: {
      VotingPower: '0xB39722EC5Bd1DfE7AB91988CEe46407C2cEE9580'
    },
    ExecutionStrategies: {
      SimpleQuorumAvatar: '0xecE4f6b01a2d7FF5A9765cA44162D453fC455e42',
      SimpleQuorumTimelock: '0xf2A1C2f2098161af98b2Cc7E382AB7F3ba86Ebc4',
      Axiom: null,
      Isokratia: null,
      ...additionalExecutionStrategies
    }
  };
}

function createEvmConfig(
  networkId: keyof typeof evmNetworks
): EvmNetworkConfig {
  const network = evmNetworks[networkId];

  const authenticators = {
    [network.Authenticators.EthSig]: {
      type: 'ethSig'
    },
    [network.Authenticators.EthTx]: {
      type: 'ethTx'
    }
  } as const;

  const strategies = {
    [network.Strategies.Vanilla]: {
      type: 'vanilla'
    },
    [network.Strategies.Comp]: {
      type: 'comp'
    },
    [network.Strategies.OZVotes]: {
      type: 'ozVotes'
    },
    [network.Strategies.Whitelist]: {
      type: 'whitelist'
    }
  } as const;

  const executionStrategiesImplementations = {
    SimpleQuorumAvatar: network.ExecutionStrategies.SimpleQuorumAvatar,
    SimpleQuorumTimelock: network.ExecutionStrategies.SimpleQuorumTimelock,
    ...(network.ExecutionStrategies.Axiom
      ? { Axiom: network.ExecutionStrategies.Axiom }
      : {}),
    ...(network.ExecutionStrategies.Isokratia
      ? { Isokratia: network.ExecutionStrategies.Isokratia }
      : {})
  } as const;

  return {
    eip712ChainId: network.Meta.eip712ChainId,
    proxyFactory: network.Meta.proxyFactory,
    masterSpace: network.Meta.masterSpace,
    authenticators,
    strategies,
    executionStrategiesImplementations
  };
}

export const evmNetworks = {
  oorttestnet: createStandardConfigOORT(9700),
  eth: createStandardConfig(1),
  oeth: createStandardConfig(10),
  sep: createStandardConfig(11155111, {
    executionStrategies: {
      Axiom: '0xaC6dbd42Ed254E9407fe0D2798784d0110979DC2',
      Isokratia: '0xc674eCf233920aa3052738BFCDbDd0812AEE5A83'
    }
  }),
  matic: createStandardConfig(137),
  arb1: createStandardConfig(42161),
  'linea-testnet': {
    Meta: {
      eip712ChainId: 59140,
      proxyFactory: '0x12A1FfFFfd70677939D61d641eA043bc9060c718',
      masterSpace: '0x7cC62f8E9BF2b44ce704D2cdCd4aa8021d5A6f4B'
    },
    Authenticators: {
      EthSig: '0x3e3a68e0e70dbf78051109a9f379b7a7adec82f4',
      EthTx: '0xddb36b865a1021524b936fb29fcba5fac073db74'
    },
    Strategies: {
      Vanilla: '0x3e3A68e0e70dBF78051109a9f379B7A7adec82f4',
      Comp: '0x343Baf4b44F7f79b14301CFA8068E3F8BE7470De',
      OZVotes: '0x4aAa33b4367dc5657854bD40738201651eC0cC7B',
      Whitelist: '0x54449c058bBf0B777745944ea1A7b79786FBC958'
    },
    ProposalValidations: {
      VotingPower: '0x6D9d6D08EF6b26348Bd18F1FC8D953696b7cf311'
    },
    ExecutionStrategies: {
      SimpleQuorumAvatar: '0x177F163F8f789F0d9C5c7993728ADB106a7b12d4',
      SimpleQuorumTimelock: '0xdb86512e7E3a2d0B93b74b8FE3fFE8AD780791BE',
      Axiom: null,
      Isokratia: null
    }
  }
} as const;

export const evmMainnet = createEvmConfig('eth');
export const evmSepolia = createEvmConfig('sep');
export const evmOptimism = createEvmConfig('oeth');
export const evmPolygon = createEvmConfig('matic');
export const evmArbitrum = createEvmConfig('arb1');
export const evmLineaGoerli = createEvmConfig('linea-testnet');
export const evmoortTestnet = createEvmConfig('oorttestnet');
