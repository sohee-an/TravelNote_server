import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import {
  CreateTripRequestDto,
  CreateTripResponseDto,
} from './dtos/createTrip.dto';
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
import { UpdateTripRequestDto } from './dtos/updateTrip.dto';

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

  @Patch('/:id')
  patchTrip(@Param('id') id: number, @Body() body: UpdateTripRequestDto) {
    return this.tripService.update(id, body);
  }

  @Delete('/:id')
  deleteTrip(@Param('id') id: number) {
    return this.tripService.delete(id);
  }
}
