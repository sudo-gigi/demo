import { EntityManager } from 'typeorm';
type UpdateManyRecordGeneric<UpdateManyRecordPayload, IdentifierOptions> = {
    updateManyPayload: UpdateManyRecordPayload;
    identifierOptions: IdentifierOptions;
    transactionOptions: {
        useTransaction: false;
    } | {
        useTransaction: true;
        transaction: EntityManager;
    };
};
export default UpdateManyRecordGeneric;
