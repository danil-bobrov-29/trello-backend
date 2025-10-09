import { ConflictException, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

export abstract class BaseService<
  TModel,
  TCreateInput,
  TUpdateInput,
  TWhereInput,
> {
  protected constructor(protected readonly prisma: PrismaService) {}

  abstract get model(): any

  async create(data: TCreateInput): Promise<TModel> {
    try {
      return await this.model.create({ data })
    } catch {
      throw new ConflictException(`Conflict creating ${this.getModelName()}`)
    }
  }

  async findAll(filters: TWhereInput): Promise<TModel[]> {
    return this.model.findMany({ where: filters })
  }

  async findOne(
    id: string,
    filters?: Omit<TWhereInput, 'id'>
  ): Promise<TModel> {
    const entity = await this.model.findFirst({
      where: { id, ...filters },
    })

    if (!entity) {
      throw new NotFoundException(`Not Found ${this.getModelName()}`)
    }
    return entity
  }

  async update(
    id: string,
    updateData: TUpdateInput,
    filters?: Omit<TWhereInput, 'id'>
  ): Promise<TModel> {
    return this.model.update({
      where: { id, ...filters },
      data: updateData,
    })
  }

  async remove(id: string, filters?: Omit<TWhereInput, 'id'>): Promise<TModel> {
    return this.model.delete({ where: { id, ...filters } })
  }

  private getModelName(): string {
    return this.constructor.name.replace('Service', '')
  }
}