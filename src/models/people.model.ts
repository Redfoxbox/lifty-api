import {Entity, hasMany, model, property} from '@loopback/repository';
import {Weight} from './weight.model';

@model()
export class People extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'boolean',
    required: true,
  })
  sex: boolean;

  @property({
    type: 'number',
    required: true,
  })
  age: number;

  @property({
    type: 'number',
    required: true,
  })
  height: number;

  @hasMany(() => Weight)
  weights: Weight[];

  constructor(data?: Partial<People>) {
    super(data);
  }
}

export interface PeopleRelations {
  // describe navigational properties here
}

export type PeopleWithRelations = People & PeopleRelations;
