import { Request, Response, NextFunction } from 'express';
import { CreateService } from '../../../application/use-cases/service/CreateService';
import { GetServices } from '../../../application/use-cases/service/GetServices';
import { sendSuccess } from '../response/ApiResponse';

export class ServiceController {
  constructor(
    private readonly createService: CreateService,
    private readonly getServices: GetServices,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const service = await this.createService.execute(req.body);
      sendSuccess(res, 201, 'Service created successfully.', service);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const services = await this.getServices.execute();
      sendSuccess(res, 200, 'Services fetched successfully.', services);
    } catch (error) {
      next(error);
    }
  };
}
