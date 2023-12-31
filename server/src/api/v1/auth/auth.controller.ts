import { Controller, Get, Header, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';

@Controller('v1/auth/oauth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao')
  @Header('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin() {
    // 사용자를 카카오 인증 페이지로 리다이렉트
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLoginCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user;

    if (user) {
      this.authService.handleKakaoLogin(user, res);
    } else {
      const errorMessage =
        req.query.error_description || '카카오 로그인에 실패했습니다.';
      res.status(400).json({ error: errorMessage });
    }
  }
}
