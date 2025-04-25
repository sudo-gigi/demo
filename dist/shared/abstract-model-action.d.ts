import CreateRecordGeneric from 'src/types/generic/create-record-type';
import DeleteRecordGeneric from 'src/types/generic/delete-record-type';
import ListRecordGeneric from 'src/types/generic/list-record-type';
import UpdateRecordGeneric from 'src/types/generic/update-record-type';
import { DeepPartial, EntityTarget, FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { PaginationMeta } from './helpers/pagination.helper';
import UpdateManyRecordGeneric from 'src/types/generic/update-many-record.type';
export declare abstract class AbstractModelAction<T extends ObjectLiteral> {
    protected readonly repository: Repository<T>;
    model: EntityTarget<T>;
    constructor(repository: Repository<T>, model: EntityTarget<T>);
    create(createRecordOptions: CreateRecordGeneric<DeepPartial<T>>): Promise<T | null>;
    update(updateRecordOptions: UpdateRecordGeneric<QueryDeepPartialEntity<T>, FindOptionsWhere<T>>): Promise<T | null>;
    delete(deleteRecordOptions: DeleteRecordGeneric<FindOptionsWhere<T>>): Promise<import("typeorm").DeleteResult>;
    get(getRecordIdentifierOptions: object, queryOptions?: object, relations?: object): Promise<T | null>;
    list(listRecordOptions: ListRecordGeneric<object>): Promise<{
        payload: T[];
        paginationMeta: Partial<PaginationMeta>;
    }>;
    exists(where: FindOptionsWhere<T>): Promise<boolean>;
    updateMany(updateManyRecordOptions: UpdateManyRecordGeneric<QueryDeepPartialEntity<T>, FindOptionsWhere<T>>): Promise<import("typeorm").UpdateResult>;
    count(where: FindOptionsWhere<T>): Promise<number>;
}
