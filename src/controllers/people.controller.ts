import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {People} from '../models';
import {PeopleRepository} from '../repositories';

@authenticate('jwt')
export class PeopleController {
  constructor(
    @repository(PeopleRepository)
    public PeopleRepository: PeopleRepository,
  ) { }

  @post('/people')
  @response(200, {
    description: 'People model instance',
    content: {'application/json': {schema: getModelSchemaRef(People)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(People, {
            title: 'NewPeople',
            exclude: ['id'],
          }),
        },
      },
    })
    People: Omit<People, 'id'>,
  ): Promise<People> {
    return this.PeopleRepository.create(People);
  }

  @get('/people/count')
  @response(200, {
    description: 'People model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(People) where?: Where<People>,
  ): Promise<Count> {
    return this.PeopleRepository.count(where);
  }

  @get('/people')
  @response(200, {
    description: 'Array of People model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(People, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(People) filter?: Filter<People>,
  ): Promise<People[]> {
    return this.PeopleRepository.find(filter);
  }

  @patch('/people')
  @response(200, {
    description: 'People PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(People, {partial: true}),
        },
      },
    })
    People: People,
    @param.where(People) where?: Where<People>,
  ): Promise<Count> {
    return this.PeopleRepository.updateAll(People, where);
  }

  @get('/people/{id}')
  @response(200, {
    description: 'People model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(People, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(People, {exclude: 'where'}) filter?: FilterExcludingWhere<People>
  ): Promise<People> {
    return this.PeopleRepository.findById(id, filter);
  }

  @patch('/people/{id}')
  @response(204, {
    description: 'People PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(People, {partial: true}),
        },
      },
    })
    People: People,
  ): Promise<void> {
    await this.PeopleRepository.updateById(id, People);
  }

  @put('/people/{id}')
  @response(204, {
    description: 'People PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() People: People,
  ): Promise<void> {
    await this.PeopleRepository.replaceById(id, People);
  }

  @del('/people/{id}')
  @response(204, {
    description: 'People DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.PeopleRepository.deleteById(id);
  }
}
