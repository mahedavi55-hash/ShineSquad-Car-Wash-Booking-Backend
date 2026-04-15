import { IServiceRepository } from '../../../domain/repositories/IServiceRepository';
import { Service } from '../../../domain/entities/Service';

export class CreateService {
  constructor(private readonly serviceRepository: IServiceRepository) {}

  async execute(input: Omit<Service, 'id'>): Promise<Service> {
    return this.serviceRepository.create(input);
  }
}
