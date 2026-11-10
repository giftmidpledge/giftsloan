import { Address, beginCell, storeStateInit } from '@ton/core';
import { LoanEscrow } from './giftloan_LoanEscrow.js';

async function main() {
    const poolRaw = process.argv[2];
    const nftRaw = process.argv[3];
    const opRaw = process.argv[4];

    if (!poolRaw || !nftRaw || !opRaw) {
        throw new Error(
            'Usage: node escrow_init.js POOL_ADDRESS NFT_ADDRESS OPERATION_ID'
        );
    }

    if (!/^\d+$/.test(opRaw)) {
        throw new Error('operationId must be an integer');
    }

    const opId = BigInt(opRaw);

    if (opId < 1n || opId > 0xFFFFFFFFn) {
        throw new Error('operationId must be in range 1..4294967295');
    }

    const pool = Address.parse(poolRaw);
    const nft = Address.parse(nftRaw);

    const escrow = await LoanEscrow.fromInit(pool, nft, opId);

    const stateInit = beginCell()
        .store(storeStateInit(escrow.init))
        .endCell()
        .toBoc()
        .toString('base64');

    console.log(JSON.stringify({
        address: escrow.address.toString({
            bounceable: false,
            urlSafe: true
        }),
        stateInit
    }));
}

main().catch(error => {
    console.error('ESCROW_INIT_ERROR:', error?.stack || String(error));
    process.exit(1);
});
