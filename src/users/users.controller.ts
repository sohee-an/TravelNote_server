import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseInterceptors(SerializeInterceptor)
  @Get('/:id')
  findUser(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.findOne(id);
    if (!user) throw new NotFoundException('유저를 찾을 수 없습니다.');
    return user;
  }

  @Get()
  findUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  // @Delete('/:id')
  // deleteUser(@Param('id') id: string) {
  //   return this.userService.delete(parseInt(id));
  // }

  // @Patch('/:id')
  // updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
  //   return this.userService.update(parseInt(id), body);
  // }
}
