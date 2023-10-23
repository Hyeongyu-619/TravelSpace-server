import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticleGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (request.params.id) {
      const articleId = parseInt(request.params.id, 10);

      const articleWithMembership = await this.prisma.article.findUnique({
        where: { id: articleId },
        select: {
          planet: {
            select: {
              published: true,
              members: {
                where: { userId: user?.id },
                select: { userId: true },
              },
            },
          },
        },
      });

      if (!articleWithMembership) {
        throw new ForbiddenException('게시글을 찾을 수 없습니다.');
      }

      if (articleWithMembership.planet.published) {
        return true;
      } else {
        if (!user || articleWithMembership.planet.members.length === 0) {
          throw new ForbiddenException('해당 게시글에 액세스 권한이 없습니다.');
        }
        return true;
      }
    }

    // 행성 ID를 기반으로 검색하는 경우
    if (request.query.planetId) {
      const planetId = parseInt(request.query.planetId, 10);

      const planet = await this.prisma.planet.findUnique({
        where: { id: planetId },
        select: {
          published: true,
          members: {
            where: { userId: user?.id },
            select: { userId: true },
          },
        },
      });

      if (!planet) {
        throw new ForbiddenException('행성을 찾을 수 없습니다.');
      }

      if (planet.published) {
        return true;
      } else {
        if (!user || planet.members.length === 0) {
          throw new ForbiddenException(
            '해당 행성의 게시글에 액세스 권한이 없습니다.',
          );
        }
        return true;
      }
    }

    return true;
  }
}
