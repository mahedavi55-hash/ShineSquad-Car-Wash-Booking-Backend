import { SlotController } from '../../../src/ports/rest/controllers/SlotController';
import { createMockRequest, createMockResponse, createMockNext } from './testHelpers';
import { sendSuccess } from '../../../src/ports/rest/response/ApiResponse';

jest.mock('../../../src/ports/rest/response/ApiResponse', () => ({
  sendSuccess: jest.fn(),
}));

describe('SlotController', () => {
  let controller: any;

beforeEach(() => {
  controller = new SlotController(
    { execute: jest.fn() } as any,
    { execute: jest.fn() } as any
  );
});

  it('should create slot', async () => {
    const req = createMockRequest({ body: {} });
    const res = createMockResponse();
    const next = createMockNext();

    await controller.create(req, res, next);

    expect(sendSuccess).toHaveBeenCalled();
  });
});