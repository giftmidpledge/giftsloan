// Считает адрес хранилища (Escrow) и stateInit для тройки (пул, NFT, operationId). Ключей не использует.
// Запуск: node escrow_init.js АДРЕС_ПУЛА АДРЕС_NFT OPERATION_ID
// OPERATION_ID — целое число 1..4294967295 (uint32), должно совпадать с operationId в подписи и в PrepareEscrow.
import { Address, beginCell, storeStateInit } from '@ton/core';
// ВАЖНО: имя файла = <name проекта из tact.config.json>_LoanEscrow.js. Поправьте, если проект назван иначе.
import { LoanEscrow } from './output/giftloan_v2_LoanEscrow.js';

(async () => {
  const pool = Address.parse(process.argv[2]);
  const nft = Address.parse(process.argv[3]);
  const opRaw = process.argv[4];
  if (!/^\d+$/.test(opRaw || '')) throw new Error('operationId must be an integer');
  const opId = BigInt(opRaw);
  if (opId <= 0n || opId > 0xFFFFFFFFn) throw new Error('operationId must be in 1..4294967295');

  // В новой версии init контракта: LoanEscrow(pool, nft, opId)
  const escrow = await LoanEscrow.fromInit(pool, nft, opId);
  const stateInit = beginCell().store(storeStateInit(escrow.init)).endCell().toBoc().toString('base64');
  console.log(JSON.stringify({
    address: escrow.address.toString({ bounceable: false, urlSafe: true }),
    stateInit
  }));
})().catch(e => {
  console.error(String(e));
  process.exit(1);
});
