import {
  Controller,
  Get,
  Route,
  SuccessResponse,
  Request,
  Post,
  Body,
  Put,
  Delete,
  Tags,
} from "tsoa";
import { ItemService } from "../../services/item-service";
import { provideSingleton, inject } from "../../middlewares/inversify/ioc-util";
import { ItemVO } from "../../types/vo";
import { ItemCreateParams, ItemUpdateParams } from "../../types/request";
import { getCustomRepository } from "typeorm";
import { ItemRepository } from "../../repositories/item-repository";
import { StatusCodes } from "http-status-codes";

@Route("items")
@Tags("Item")
@provideSingleton(ItemController)
export class ItemController extends Controller {
  private itemRepository = getCustomRepository(ItemRepository);
  // private validationService = new ValidationService({"ItemCreateParams": {dataType: "refObject", properties: {"content": {dataType: "string"}, isDone: {dataType: "boolean"}}}});
  @inject(ItemService) private itemService: ItemService;

  @Get()
  @SuccessResponse(StatusCodes.OK, "Return Items")
  public get(): Promise<ItemVO[]> {
    return this.itemService.get();
  }

  @Get("count")
  @SuccessResponse(StatusCodes.OK, "Return Item Count")
  public count(@Request() req: any): Promise<number> {
    return this.itemRepository.count();
  }

  @Get("{id}")
  @SuccessResponse(StatusCodes.OK, "Return Item")
  public find(@Request() req: any, id: string): Promise<ItemVO> {
    return this.itemService.find(id);
  }

  @Post()
  @SuccessResponse(StatusCodes.OK, "Return Item")
  public post(
    @Request() req: any,
    @Body() params: ItemCreateParams,
  ): Promise<ItemVO> {
    return this.itemService.create(params);
  }

  @Put("{id}")
  @SuccessResponse(StatusCodes.OK, "Return Item")
  public put(
    @Request() req: any,
    id: string,
    @Body() params: ItemUpdateParams
  ): Promise<ItemVO> {
    return this.itemService.update(id, params);
  }

  @Delete("{id}")
  @SuccessResponse(StatusCodes.NO_CONTENT, "Succeeded")
  public async delete(@Request() req: any, id: string): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
