import {Entity, model, property} from '@loopback/repository';

@model()
export class Weight extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  weight: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;


  @property({
    type: 'number',
  })
  peopleId?: number;

  constructor(data?: Partial<Weight>) {
    super(data);
  }
}

export interface WeightRelations {
  // describe navigational properties here
}

export type WeightWithRelations = Weight & WeightRelations;
