import { Request, Response, NextFunction } from 'express';

export const createMockRequest = (data: any = {}): Request =>
  ({
    body: {},
    params: {},
    query: {},
    ...data,
  } as Request);

export const createMockResponse = (): Response =>
  ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response);

export const createMockNext = (): NextFunction => jest.fn();