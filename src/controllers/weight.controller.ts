import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Weight} from '../models';
import {WeightRepository} from '../repositories';

export class WeightController {
  constructor(
    @repository(WeightRepository)
    public weightRepository : WeightRepository,
  ) {}

  @post('/weights')
  @response(200, {
    description: 'Weight model instance',
    content: {'application/json': {schema: getModelSchemaRef(Weight)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Weight, {
            title: 'NewWeight',
            exclude: ['id'],
          }),
        },
      },
    })
    weight: Omit<Weight, 'id'>,
  ): Promise<Weight> {
    return this.weightRepository.create(weight);
  }

  @get('/weights/count')
  @response(200, {
    description: 'Weight model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Weight) where?: Where<Weight>,
  ): Promise<Count> {
    return this.weightRepository.count(where);
  }

  @get('/weights')
  @response(200, {
    description: 'Array of Weight model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Weight, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Weight) filter?: Filter<Weight>,
  ): Promise<Weight[]> {
    return this.weightRepository.find(filter);
  }

  @patch('/weights')
  @response(200, {
    description: 'Weight PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Weight, {partial: true}),
        },
      },
    })
    weight: Weight,
    @param.where(Weight) where?: Where<Weight>,
  ): Promise<Count> {
    return this.weightRepository.updateAll(weight, where);
  }

  @get('/weights/{id}')
  @response(200, {
    description: 'Weight model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Weight, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Weight, {exclude: 'where'}) filter?: FilterExcludingWhere<Weight>
  ): Promise<Weight> {
    return this.weightRepository.findById(id, filter);
  }

  @patch('/weights/{id}')
  @response(204, {
    description: 'Weight PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Weight, {partial: true}),
        },
      },
    })
    weight: Weight,
  ): Promise<void> {
    await this.weightRepository.updateById(id, weight);
  }

  @put('/weights/{id}')
  @response(204, {
    description: 'Weight PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() weight: Weight,
  ): Promise<void> {
    await this.weightRepository.replaceById(id, weight);
  }

  @del('/weights/{id}')
  @response(204, {
    description: 'Weight DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.weightRepository.deleteById(id);
  }
}
