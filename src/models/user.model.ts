import {Entity, hasOne, model, property} from '@loopback/repository';
import {securityId, UserProfile} from '@loopback/security';
import {UserCredentials} from './user-credentials.model';
@model()
export class User extends Entity implements UserProfile {
  [securityId]: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    id: true,
  })
  role: string;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
