import { IsOptional, IsString } from "class-validator";

export class StartPaymentDto {
  @IsOptional()
  @IsString()
  provider?: string;
}
