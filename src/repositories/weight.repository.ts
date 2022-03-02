import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {LocalDataSource} from '../datasources';
import {Weight, WeightRelations} from '../models';

export class WeightRepository extends DefaultCrudRepository<
  Weight,
  typeof Weight.prototype.id,
  WeightRelations
> {
  constructor(
    @inject('datasources.local') dataSource: LocalDataSource,
  ) {
    super(Weight, dataSource);
  }
}
