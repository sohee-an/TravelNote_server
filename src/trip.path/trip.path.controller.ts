import { CreateTripPathRequestDto } from './dtos/createTripPath.dto';
import { TripPathService } from './trip.path.service';
import {
  Body,
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';

@Controller('trip')
export class TripPathController {
  constructor(private tripService: TripPathService) {}

  @Post()
  async createTrip(@Body() body: CreateTripPathRequestDto) {
    const createTrip = await this.tripService.create(body);
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
  patchTrip(@Param('id') id: number, @Body() body) {
    return this.tripService.update(id, body);
  }

  @Delete('/:id')
  deleteTrip(@Param('id') id: number) {
    return this.tripService.delete(id);
  }
}
