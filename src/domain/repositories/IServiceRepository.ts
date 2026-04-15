import { Service } from '../entities/Service';

export interface IServiceRepository {
  create(service: Service): Promise<Service>;
  findAllActive(): Promise<Service[]>;
  findById(id: string): Promise<Service | null>;
  update(id: string, payload: Partial<Service>): Promise<Service | null>;
}
