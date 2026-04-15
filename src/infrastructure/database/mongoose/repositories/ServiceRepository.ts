import { IServiceRepository } from '../../../../domain/repositories/IServiceRepository';
import { Service } from '../../../../domain/entities/Service';
import { ServiceModel } from '../models/ServiceModel';

export class ServiceRepository implements IServiceRepository {
  async create(service: Service): Promise<Service> {
    const saved = await ServiceModel.create(service);
    return { id: saved.id, name: saved.name, description: saved.description, price: saved.price, durationMinutes: saved.durationMinutes, isActive: saved.isActive };
  }

  async findAllActive(): Promise<Service[]> {
    const services = await ServiceModel.find({ isActive: true });
    return services.map((item) => ({ id: item.id, name: item.name, description: item.description, price: item.price, durationMinutes: item.durationMinutes, isActive: item.isActive }));
  }

  async findById(id: string): Promise<Service | null> {
    const found = await ServiceModel.findById(id);
    return found ? { id: found.id, name: found.name, description: found.description, price: found.price, durationMinutes: found.durationMinutes, isActive: found.isActive } : null;
  }

  async update(id: string, payload: Partial<Service>): Promise<Service | null> {
    const updated = await ServiceModel.findByIdAndUpdate(id, payload, { new: true });
    return updated ? { id: updated.id, name: updated.name, description: updated.description, price: updated.price, durationMinutes: updated.durationMinutes, isActive: updated.isActive } : null;
  }
}
