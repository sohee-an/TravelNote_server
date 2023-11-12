import { IsString, IsInt, IsArray } from 'class-validator';

export class CreateTripPathRequestDto {
  @IsInt()
  readonly tripId: number; //패키지 id도 같이 받아야될거같음

  @IsInt()
  readonly tripPathIndex: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsArray()
  @IsString({ each: true })
  readonly imageUrls: string[];
}

export class CreateTripPathResponseDto {
  @IsInt()
  readonly id: number;

  @IsInt()
  readonly userId: number;

  @IsInt()
  readonly tripPathIndex: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsArray()
  @IsString({ each: true })
  readonly imageUrls: string[];
}
