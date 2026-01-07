import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateReservationDto {
  @IsString()
  @IsNotEmpty()
  branchId!: string;

  @IsString()
  @IsNotEmpty()
  startAt!: string;

  @IsInt()
  @Min(1)
  partySize!: number;

  @IsString()
  @IsNotEmpty()
  customerName!: string;

  @IsString()
  @IsNotEmpty()
  customerPhone!: string;
}
