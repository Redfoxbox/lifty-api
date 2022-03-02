import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  People,
  Weight
} from '../models';
import {PeopleRepository} from '../repositories';

export class PeopleWeightController {
  constructor(
    @repository(PeopleRepository) protected PeopleRepository: PeopleRepository,
  ) { }

  @get('/people/{id}/weights', {
    responses: {
      '200': {
        description: 'Array of People has many Weight',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Weight)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Weight>,
  ): Promise<Weight[]> {
    return this.PeopleRepository.weights(id).find(filter);
  }

  @post('/people/{id}/weights', {
    responses: {
      '200': {
        description: 'People model instance',
        content: {'application/json': {schema: getModelSchemaRef(Weight)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof People.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Weight, {
            title: 'NewWeightInPeople',
            exclude: ['id'],
            optional: ['peopleId']
          }),
        },
      },
    }) weight: Omit<Weight, 'id'>,
  ): Promise<Weight> {
    return this.PeopleRepository.weights(id).create(weight);
  }

  @patch('/people/{id}/weights', {
    responses: {
      '200': {
        description: 'People.Weight PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Weight, {partial: true}),
        },
      },
    })
    weight: Partial<Weight>,
    @param.query.object('where', getWhereSchemaFor(Weight)) where?: Where<Weight>,
  ): Promise<Count> {
    return this.PeopleRepository.weights(id).patch(weight, where);
  }

  @del('/people/{id}/weights', {
    responses: {
      '200': {
        description: 'People.Weight DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Weight)) where?: Where<Weight>,
  ): Promise<Count> {
    return this.PeopleRepository.weights(id).delete(where);
  }
}
