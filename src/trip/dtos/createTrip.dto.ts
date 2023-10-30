import { IsString, IsInt, IsArray } from 'class-validator';

export class CreateTripRequestDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsArray()
  @IsString({ each: true })
  readonly imageUrls: string[];
}

export class CreateTripResponseDto {
  @IsInt()
  readonly id: number;

  @IsInt()
  readonly userId: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsArray()
  @IsString({ each: true })
  readonly imageUrls: string[];
}
