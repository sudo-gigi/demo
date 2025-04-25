import CreateRecordGeneric from 'src/types/generic/create-record-type';
import DeleteRecordGeneric from 'src/types/generic/delete-record-type';
import ListRecordGeneric from 'src/types/generic/list-record-type';
import UpdateRecordGeneric from 'src/types/generic/update-record-type';
import {
  DeepPartial,
  EntityTarget,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import {
  computePaginationMeta,
  PaginationMeta,
} from './helpers/pagination.helper';
import UpdateManyRecordGeneric from 'src/types/generic/update-many-record.type';

export abstract class AbstractModelAction<T extends ObjectLiteral> {
  model: EntityTarget<T>;

  constructor(
    protected readonly repository: Repository<T>,
    model: EntityTarget<T>,
  ) {
    this.model = model;
  }

  async create(
    createRecordOptions: CreateRecordGeneric<DeepPartial<T>>,
  ): Promise<T | null> {
    const { createPayload, transactionOptions } = createRecordOptions;

    const modelRepository = transactionOptions.useTransaction
      ? transactionOptions.transaction.getRepository(this.model)
      : this.repository;

    const response: T | null = (await modelRepository.save(
      createPayload,
    )) as T | null;
    return response;
  }

  async update(
    updateRecordOptions: UpdateRecordGeneric<
      QueryDeepPartialEntity<T>,
      FindOptionsWhere<T>
    >,
  ) {
    const { updatePayload, identifierOptions, transactionOptions } =
      updateRecordOptions;
    const modelRepository = transactionOptions.useTransaction
      ? transactionOptions.transaction.getRepository(this.model)
      : this.repository;

    await modelRepository.update(identifierOptions, updatePayload);
    return await modelRepository.findOne({ where: identifierOptions });
  }

  async delete(deleteRecordOptions: DeleteRecordGeneric<FindOptionsWhere<T>>) {
    const { identifierOptions, transactionOptions } = deleteRecordOptions;
    const modelRepository = transactionOptions.useTransaction
      ? transactionOptions.transaction.getRepository(this.model)
      : this.repository;
    return await modelRepository.delete(identifierOptions);
  }

  async get(
    getRecordIdentifierOptions: object,
    queryOptions?: object,
    relations?: object,
  ) {
    return await this.repository.findOne({
      where: getRecordIdentifierOptions,
      ...queryOptions,
      relations,
    });
  }

  async list(
    listRecordOptions: ListRecordGeneric<object>,
  ): Promise<{ payload: T[]; paginationMeta: Partial<PaginationMeta> }> {
    const { paginationPayload, filterRecordOptions, relations } =
      listRecordOptions;

    if (paginationPayload) {
      const { limit, page } = paginationPayload;
      const query = await this.repository.find({
        where: filterRecordOptions,
        relations,
        take: +limit,
        skip: +limit * (+page - 1),
      });

      const total = await this.repository.count({ where: filterRecordOptions });

      return {
        payload: query,
        paginationMeta: computePaginationMeta(total, +limit, +page),
      };
    }

    const query = await this.repository.find({
      where: filterRecordOptions,
      relations,
    });

    return {
      payload: query,
      paginationMeta: { total: query.length },
    };
  }

  async exists(where: FindOptionsWhere<T>): Promise<boolean> {
    return (await this.repository.count({ where })) > 0;
  }

  async updateMany(
    updateManyRecordOptions: UpdateManyRecordGeneric<
      QueryDeepPartialEntity<T>,
      FindOptionsWhere<T>
    >,
  ) {
    const { updateManyPayload, identifierOptions, transactionOptions } =
      updateManyRecordOptions;

    const modelRepository = transactionOptions.useTransaction
      ? transactionOptions.transaction.getRepository(this.model)
      : this.repository;

    const updateResult = await modelRepository.update(
      identifierOptions,
      updateManyPayload,
    );

    return updateResult;
  }

  async count(where: FindOptionsWhere<T>): Promise<number> {
    const count = await this.repository.count({ where });
    return count;
  }
}
