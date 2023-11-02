import { IsString, IsInt, IsArray } from 'class-validator';

export class CreateTripPathRequestDto {
  @IsInt()
  readonly tripId: number; //패키지 id도 같이 받아야될거같음

  /**
   * // 만일 trip에 trippath의id가 배열로 등록이
   * 안되어있다면 여기에 순서를 둬야되지않나?
   */
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

  /**
   * // 만일 trip에 trippath의id가 배열로 등록이
   * 안되어있다면 여기에 순서를 둬야되지않나?
   */
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
