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
    const createTrip = await this.tripService.create(body, userId);
    return createTrip;
  }

  @Get('')
  findTrips() {
    const user = this.tripService.findAll();

    return user;
  }

  @Get('/:id')
  findOneTrip(@Param('id', ParseIntPipe) id: number) {
    const user = this.tripService.findOneById(id);

    return user;
  }

  //   @Patch()
  //   findUsers(@Param('id') id: number) {
  //     return this.tripService.update(id);
  //   }
}
