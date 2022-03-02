import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {LocalDataSource} from '../datasources';
import {People, PeopleRelations, Weight} from '../models';
import {WeightRepository} from './weight.repository';

export class PeopleRepository extends DefaultCrudRepository<
  People,
  typeof People.prototype.id,
  PeopleRelations
> {

  public readonly weights: HasManyRepositoryFactory<Weight, typeof People.prototype.id>;

  constructor(
    @inject('datasources.local') dataSource: LocalDataSource, @repository.getter('WeightRepository') protected weightRepositoryGetter: Getter<WeightRepository>,
  ) {
    super(People, dataSource);
    this.weights = this.createHasManyRepositoryFactoryFor('weights', weightRepositoryGetter,);
    this.registerInclusionResolver('weights', this.weights.inclusionResolver);
  }
}
