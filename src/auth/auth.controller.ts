import { Body, Controller, Get, Post, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-tokens.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateProfileDto } from './dtos/updateprofile.dto';
import { GoogleAuthGuard } from './google-auth.guard';

interface AuthRequest extends Request {
  user?: any; // Define `user` based on what GoogleAuthGuard attaches
}
@ApiTags('example')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signupData: SignupDto) {
    return this.authService.signup(signupData);
  }

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @Post('refresh')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }

  @UseGuards(AuthenticationGuard)
  @Put('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req,
  ) {
    return this.authService.changePassword(
      req.userId,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Put('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(
      resetPasswordDto.newPassword,
      resetPasswordDto.resetToken,
    );
  }
  @UseGuards(AuthenticationGuard)
@Put('updateprof')
async updateProfile(
  @Body() updateProfileDto: UpdateProfileDto,
  @Req() req,
) {
  console.log(req.user); // Debug: Check the contents of req.user
  if (!req.user) {
    throw new UnauthorizedException('User not authenticated');
  }
  const userId = req.user.id;
  const { email, name } = updateProfileDto;
  return this.authService.updateProfile(userId, email, name);
}
@Get('google')
@UseGuards(GoogleAuthGuard)
async googleLogin() {
  // Initiates the Google OAuth flow
}

// Google login redirect
@Get('google/callback')
@UseGuards(GoogleAuthGuard)
async googleLoginRedirect(@Req() req: AuthRequest) { // Use AuthRequest to access req.user

  var userDto = new LoginDto()
  userDto.email = req.user.email
  userDto.password = req.user.password

  return this.authService.loginGoogle(req.user)
  //this.authService.login(userDto) // Log in the user

}

  
  
}
