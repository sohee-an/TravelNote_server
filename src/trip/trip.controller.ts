import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { CreateTripRequestDto, CreateTripResponseDto } from './dtos/createTrip';
import { TripService } from './trip.service';
import {
  Body,
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Post,
  Query,
  NotFoundException,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';

@Controller('trip')
export class TripController {
  constructor(private tripService: TripService) {}

  @Post()
  async createTrip(
    @CurrentUser() userId: number,
    @Body() body: CreateTripRequestDto,
  ) {
    console.log('body', body);
    const createTrip = await this.tripService.create(body, userId);
    return createTrip;
  }

  //   @Get('/:id')
  //   findUser(@Param('id', ParseIntPipe) id: number) {
  //     const user = this.tripService.findOneById(id);
  //     if (!user) throw new NotFoundException('유저를 찾을 수 없습니다.');
  //     return user;
  //   }

  //   @Get()
  //   findUsers(@Query('email') email: string) {
  //     return this.tripService.find(email);
  //   }
}
