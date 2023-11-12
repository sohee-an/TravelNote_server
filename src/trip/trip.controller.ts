import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { CreateTripRequestDto } from './dtos/createTrip.dto';
import { TripService } from './trip.service';
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
import {
  UpdateTripRequestDto,
  UpdateTripResponseDto,
} from './dtos/updateTrip.dto';
import { CreateTripPathRequestDto } from 'src/trip.path/dtos/createTripPath.dto';

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
  patchTrip(
    @Param('id') id: number,
    @Body() body: UpdateTripRequestDto,
  ): Promise<UpdateTripResponseDto> {
    return this.tripService.update(id, body);
  }

  @Delete('/:id')
  deleteTrip(@Param('id') id: number) {
    return this.tripService.delete(id);
  }

  // tripPath
  @Post('/tripPath')
  async createTripPath(@Body() body: CreateTripPathRequestDto) {
    const createTrip = await this.tripService.tripPathCreate(body);
    return createTrip;
  }

  @Get('trip/:tripId')
  findTripaths() {
    const user = this.tripService.tripPathFindAll();

    return user;
  }

  @Get('/:tripPathid')
  findOneTripPath(@Param('id', ParseIntPipe) id: number) {
    const user = this.tripService.tripPathFindOneById(id);

    return user;
  }

  @Patch('trip/:tripPathid')
  patchTripPath(@Param('id') id: number, @Body() body) {
    return this.tripService.tripPathUpdate(id, body);
  }

  @Delete('trip/:tripPathid')
  deleteTripPath(@Param('id') id: number) {
    return this.tripService.tripPathDelete(id);
  }
}
