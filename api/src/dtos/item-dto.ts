import { ItemVO } from "../types/vo";
import { Item } from "../entities/item";

export class ItemDto {
  id: string;
  order: number;
  content: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, order: number, content: string, isDone: boolean) {
    if(!this.isValidContent(content)) throw new Error("content must be less than 80");
    this.id = id;
    this.order = order;
    this.content = content;
    this.isDone = isDone;
  }

  toEntity = (): Item => {
    return new Item(this.id, this.order, this.content, this.isDone);
  };

  static fromEntity = (entity: Item): ItemDto => {
    const dto = new ItemDto(
      entity.id,
      entity.order,
      entity.content,
      entity.isDone
    );
    return dto;
  };

  toVO = (): ItemVO => {
    return {
      id: this.id,
      order: this.order,
      content: this.content,
      isDone: this.isDone
    };
  };

  isValidContent = (content: string) => {
    return content.length <= 80
  };
}
