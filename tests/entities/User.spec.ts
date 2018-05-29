/* tslint:disable:only-arrow-functions */
// tslint:disable-next-line
import 'mocha';
import { expect } from 'chai';
import UserRepository from '@src/repositories/UserRepository';
import { register } from '@src/lib/bootstrap';
import { Container } from 'typedi';
import { ConnectionToken } from '@src/types';

describe('User Entity Test', () => {
  before(async function() {
    await register();
  });

  beforeEach(async function() {
    const connection = Container.get(ConnectionToken);
    await connection.synchronize();
  });

  afterEach(async function() {
    const connection = Container.get(ConnectionToken);
    await connection.dropDatabase();
  });

  it('Can create new user', async () => {
    const connection = Container.get(ConnectionToken);
    const userRepository = connection.getCustomRepository(UserRepository);

    const user = userRepository.create();
    user.email = 'test@test.com';
    await user.setPassword('testing');
    await userRepository.save(user);

    expect(user.id).to.equal(1);
  });
});
