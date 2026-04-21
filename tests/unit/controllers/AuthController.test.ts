import { AuthController } from '../../../src/ports/rest/controllers/AuthController';
import { createMockRequest, createMockResponse, createMockNext } from './testHelpers';
import { sendSuccess } from '../../../src/ports/rest/response/ApiResponse';

jest.mock('../../../src/ports/rest/response/ApiResponse', () => ({
  sendSuccess: jest.fn(),
}));

describe('AuthController', () => {
  let registerUser: any;
  let loginUser: any;
  let controller: AuthController;

  beforeEach(() => {
  registerUser = { execute: jest.fn() };
  loginUser = { execute: jest.fn() };
  controller = new AuthController(registerUser as any, loginUser as any);
  jest.clearAllMocks();
});

  it('should register user', async () => {
    const req = createMockRequest({ body: { email: 'test@test.com' } });
    const res = createMockResponse();
    const next = createMockNext();

    registerUser.execute.mockResolvedValue({ id: '1' });

    await controller.register(req, res, next);

    expect(registerUser.execute).toHaveBeenCalled();
    expect(sendSuccess).toHaveBeenCalled();
  });

  it('should call next on error', async () => {
    const req = createMockRequest({ body: {} });
    const res = createMockResponse();
    const next = createMockNext();

    registerUser.execute.mockRejectedValue(new Error('fail'));

    await controller.register(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});