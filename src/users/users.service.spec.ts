import { Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { User } from './user.entity';

// it('can create an istance of auth service', async () => {
//   // faker회원 서비스 생성
//   const fakeUsersService = {
//     find: () => Promise.resolve([]),
//     create: (email: string, password: string) =>
//       Promise.resolve({ id: 1, email, password }),
//   };

//   const module = await Test.createTestingModule({
//     providers: [
//       AuthService,
//       { provide: UsersService, useValue: fakeUsersService },
//     ],
//   }).compile();
//   const service = module.get(AuthService);
//   expect(service).toBeDefined();
// });

describe('UsersService', () => {
  let service: UsersService;
  const fakeUsersService: Partial<UsersService> = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password } as User),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersService],
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
