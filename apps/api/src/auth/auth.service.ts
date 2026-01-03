import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async onModuleInit() {
    await this.ensureAdmin();
  }

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const token = await this.jwt.signAsync({ sub: user.id, username: user.username });
    return { token };
  }

  async me(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, username: true, createdAt: true },
    });
  }

  async ensureAdmin() {
    const username = 'admin';
    const exists = await this.prisma.user.findUnique({ where: { username } });
    if (exists) return;

    const passwordHash = await bcrypt.hash('admin123', 10);
    await this.prisma.user.create({ data: { username, passwordHash } });
    console.log('Admin user created: admin / admin123');
  }
}
