import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Min,
  ValidateNested
} from "class-validator";
import { OrderType } from "../order.types";

export class CreateOrderItemDto {
  @IsString()
  @IsNotEmpty()
  menuItemId!: string;

  @IsInt()
  @Min(1)
  qty!: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsObject()
  addonsJson?: Record<string, any>;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  branchId!: string;

  @IsEnum(OrderType)
  orderType!: OrderType;

  @IsOptional()
  @IsString()
  tableNumber?: string;

  @IsOptional()
  @IsString()
  pickupTime?: string;

  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsString()
  customerPhone?: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @ArrayMinSize(1)
  items!: CreateOrderItemDto[];
}
