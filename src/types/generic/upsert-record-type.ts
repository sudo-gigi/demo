import { EntityManager } from 'typeorm';

type UpsertRecordGeneric<UpsertRecordPayload, IdentifierOptions> = {
  upsertPayload: UpsertRecordPayload;
  identifierOptions: IdentifierOptions;
  transactionOptions:
    | {
        useTransaction: false;
      }
    | {
        useTransaction: true;
        transaction: EntityManager;
      };
};

export default UpsertRecordGeneric;
