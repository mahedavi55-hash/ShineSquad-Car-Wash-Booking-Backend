import { RegisterUser } from '../../src/application/use-cases/auth/RegisterUser';

describe('RegisterUser', () => {
  test('creates a user when email does not exist', async () => {
    const userRepository = {
      findByEmail: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockImplementation(async (payload) => ({ id: '123', ...payload })),
    } as any;

    const useCase = new RegisterUser(userRepository);
    const result = await useCase.execute({
      fullName: 'Rakib',
      email: 'rakib@test.com',
      password: 'Password123',
      phone: '1234567890',
    });

    expect(result.id).toBe('123');
    expect(userRepository.create).toHaveBeenCalled();
  });
});
