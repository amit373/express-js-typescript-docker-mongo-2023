import { decode, type JwtPayload, sign, verify } from 'jsonwebtoken';
import { type ObjectId } from 'mongoose';
import { injectable } from 'tsyringe';
import { config } from '@app/config';
import { type Request } from 'express';

@injectable()
export class JwtService {
  async verifyToken(token: string): Promise<string | JwtPayload> {
    const decoded = verify(token, config.JWT.JWT_SECRET);
    return decoded;
  }

  decodeToken(token: string): string | JwtPayload | null {
    const decodedToken = decode(token);
    return decodedToken;
  }

  signToken(id: string | ObjectId): string {
    const token = sign({ id }, config.JWT.JWT_SECRET, {
      expiresIn: config.JWT.EXPIRES_IN,
    });
    return token;
  }

  static getCookieOptions(req: Request): {
    secure: boolean;
    httpOnly: boolean;
    maxAge: number;
  } {
    const options = {
      secure: !config.isDevelopment || req?.secure || req?.headers['x-forwarded-proto'] === 'https',
      httpOnly: true,
      maxAge: Date.now() + Number.parseInt(config.JWT.EXPIRES_IN) * 24 * 60 * 60 * 1000,
    };
    return options;
  }
}
