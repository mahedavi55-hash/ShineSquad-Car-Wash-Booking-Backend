import { ServiceController } from '../../../src/ports/rest/controllers/ServiceController';
import { createMockRequest, createMockResponse, createMockNext } from './testHelpers';
import { sendSuccess } from '../../../src/ports/rest/response/ApiResponse';

jest.mock('../../../src/ports/rest/response/ApiResponse', () => ({
  sendSuccess: jest.fn(),
}));

describe('ServiceController', () => {
  let controller: any;
beforeEach(() => {
  controller = new ServiceController(
    { execute: jest.fn() } as any,
    { execute: jest.fn() } as any
  );
});

  it('should create service', async () => {
    const req = createMockRequest({ body: {} });
    const res = createMockResponse();
    const next = createMockNext();

    await controller.create(req, res, next);

    expect(sendSuccess).toHaveBeenCalled();
  });
});