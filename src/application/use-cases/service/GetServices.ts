import { IServiceRepository } from '../../../domain/repositories/IServiceRepository';
import { Service } from '../../../domain/entities/Service';

export class GetServices {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(): Promise<Service[]> {
    return this.serviceRepository.findAllActive();
  }
}
