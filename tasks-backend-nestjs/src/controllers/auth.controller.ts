import { 
  Controller, 
  Post, 
  Body, 
  UseGuards, 
  Get,
  HttpCode,
  HttpStatus 
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { RegisterDto } from '../auth/dto/register.dto';
import { LoginDto } from '../auth/dto/login.dto';
import { ForgotPasswordDto } from '../auth/dto/forgot-password.dto';
import { VerifySecurityAnswerDto } from '../auth/dto/verify-security-answer.dto';
import { ResetPasswordDto } from '../auth/dto/reset-password.dto';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@CurrentUser() user: any, @Body() loginDto: LoginDto) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    return this.authService.getProfile(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify-token')
  @HttpCode(HttpStatus.OK)
  async verifyToken(@CurrentUser() user: any) {
    return {
      valid: true,
      user: user,
    };
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.emailOrUsername);
  }

  @Post('verify-security-answer')
  @HttpCode(HttpStatus.OK)
  async verifySecurityAnswer(@Body() verifySecurityAnswerDto: VerifySecurityAnswerDto) {
    return this.authService.verifySecurityAnswer(
      verifySecurityAnswerDto.emailOrUsername,
      verifySecurityAnswerDto.respuesta
    );
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.emailOrUsername,
      resetPasswordDto.newPassword,
      resetPasswordDto.confirmPassword
    );
  }
}
