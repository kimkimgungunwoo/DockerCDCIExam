import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  CreateUserRequestDTO,
  CreateUserResponseDTO,
  DeleteUserResponseDTO,
  UpdateUserRequestDTO,
  userInfoDTO,
} from './user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '유저 생성' })
  @ApiResponse({ status: 201, type: CreateUserResponseDTO })
  createUser(
    @Body() dto: CreateUserRequestDTO,
  ): Promise<CreateUserResponseDTO> {
    return this.userService.createUser(dto);
  }

  @Get()
  @ApiOperation({ summary: '유저 전체 목록 조회' })
  @ApiResponse({ status: 200, type: [CreateUserResponseDTO] })
  getUsers(): Promise<CreateUserResponseDTO[]> {
    return this.userService.getUsers();
  }

  @Get(':userId')
  @ApiOperation({ summary: '유저 단건 조회 (포스트/댓글 수 포함)' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, type: userInfoDTO })
  getUserById(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<userInfoDTO> {
    return this.userService.getUserById(userId);
  }

  @Patch(':userId')
  @ApiOperation({ summary: '유저 정보 수정' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, type: CreateUserResponseDTO })
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: UpdateUserRequestDTO,
  ): Promise<CreateUserResponseDTO> {
    return this.userService.updateUser(userId, dto);
  }

  @Delete(':userId')
  @ApiOperation({ summary: '유저 삭제' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, type: DeleteUserResponseDTO })
  deleteUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<DeleteUserResponseDTO> {
    return this.userService.deleteUser(userId);
  }
}
