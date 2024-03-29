import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserTokenResponse } from './dto/response/UserTokenResponse.dto';
import { FixLastVideo } from './dto/request/FixLastVideo.dto';
import { JwtAccessGuard } from '../middleware/guard/jwt-access.guard';
import { SignUpRequest } from './dto/request/UserSignUpRequest.dto';
import { LoginRequest } from './dto/request/UserLoginRequest.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  public async SignUp(@Body() body: SignUpRequest): Promise<void> {
    await this.userService.SignUp(body);
  }

  @Post('login')
  @HttpCode(200)
  public async Login(@Body() body: LoginRequest): Promise<UserTokenResponse> {
    return await this.userService.Login(body);
  }

  @UseGuards(JwtAccessGuard)
  @Get()
  public async getLastVideo(
    @Headers('authorization') token: string,
  ): Promise<number> {
    return await this.userService.getLastVideo(token);
  }

  @UseGuards(JwtAccessGuard)
  @Put('last_video')
  public async FixLastVideo(
    @Body() body: FixLastVideo,
    @Headers('authorization') token: string,
  ): Promise<void> {
    return await this.userService.lastVideo(body, token);
  }
}
