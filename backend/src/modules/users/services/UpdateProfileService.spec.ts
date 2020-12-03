import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Paulo Carvalho',
      email: 'paulo@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Paulo Eduardo',
      email: 'paulo_eduardo@example.com',
    });

    expect(updatedUser.name).toBe('Paulo Eduardo');
    expect(updatedUser.email).toBe('paulo_eduardo@example.com');
  });

  it('should not be able to update the user profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Non-Existing-User-Name',
        email: 'non-existing@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to change to another user email that already exists', async () => {
    await fakeUsersRepository.create({
      name: 'Paulo Carvalho',
      email: 'paulo@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Paulo Eduardo',
      email: 'paulo_eduardo@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Paulo Eduardo',
        email: 'paulo@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Paulo Carvalho',
      email: 'paulo@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Paulo Eduardo',
      email: 'paulo_eduardo@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Paulo Carvalho',
      email: 'paulo@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Paulo Eduardo',
        email: 'paulo_eduardo@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Paulo Carvalho',
      email: 'paulo@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Paulo Eduardo',
        email: 'paulo_eduardo@example.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
