import { EntityRepository, Repository } from "typeorm";
import { ItemDto } from "../dtos/item-dto";
import { Item } from "../entities/item";

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async findByIdOrFail(id: string): Promise<ItemDto> {
    const query = this.createQueryBuilder("items").where("items.id = :id", {
      id,
    });
    return ItemDto.fromEntity(await query.getOneOrFail());
  }

  async findLastByOrder(): Promise<ItemDto | undefined> {
    const entity = await this.createQueryBuilder("items")
      .orderBy("items.order", "DESC")
      .getOne();
    if (!entity) return undefined;
    return ItemDto.fromEntity(entity);
  }

  async get(): Promise<ItemDto[]> {
    let entities = await this.createQueryBuilder("items").getMany();
    entities = entities.sort((a, b) => {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });
    const results: ItemDto[] = [];
    entities.forEach((e) => {
      results.push(ItemDto.fromEntity(e));
    });
    return results;
  }
}
