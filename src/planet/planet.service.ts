import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlanetDto } from './dto/create-planet.dto';

@Injectable()
export class PlanetService {
  constructor(private readonly prisma: PrismaService) {}

  async createPlanet(dto: CreatePlanetDto, userId: number) {
    return await this.prisma.planet.create({
      data: {
        ...dto,
        ownerId: userId,
      },
    });
  }

  async updatePlanet(
    planetId: number,
    userId: number,
    data: Partial<CreatePlanetDto>,
  ) {
    const planet = await this.prisma.planet.findUnique({
      where: { id: planetId },
    });

    if (!planet) {
      throw new NotFoundException('행성을 찾을 수 없습니다.');
    }

    const membership = await this.prisma.planetMembership.findUnique({
      where: {
        planetId_userId: {
          planetId: planetId,
          userId: userId,
        },
      },
    });

    if (
      !membership ||
      (!membership.administrator && planet.ownerId !== userId)
    ) {
      throw new ForbiddenException(
        '관리자 또는 행성 주인만 업데이트 할 수 있습니다.',
      );
    }

    return this.prisma.planet.update({
      where: { id: planetId },
      data,
    });
  }

  async deletePlanet(planetId: number, ownerId: number) {
    const planet = await this.prisma.planet.findUnique({
      where: { id: planetId },
    });

    if (!planet) {
      throw new NotFoundException('행성을 찾을 수 없습니다.');
    }
    if (planet.ownerId !== ownerId) {
      throw new ForbiddenException('행성 주인만 업데이트 할 수 있습니다.');
    }

    return this.prisma.planet.delete({
      where: { id: planetId },
    });
  }

  async joinPlanet(
    userId: number,
    planetId: number,
  ): Promise<MembershipStatus> {
    const existingMembership = await this.prisma.planetMembership.findUnique({
      where: {
        planetId_userId: {
          userId: userId,
          planetId: planetId,
        },
      },
    });

    if (existingMembership) {
      if (existingMembership.status === MembershipStatus.APPROVED) {
        throw new ForbiddenException('이미 행성의 회원입니다.');
      } else if (existingMembership.status === MembershipStatus.PENDING) {
        throw new ForbiddenException(
          '이미 가입 신청을 하셨습니다. 승인을 기다려주세요.',
        );
      } else {
        throw new ForbiddenException('이전의 가입 신청이 거절되었습니다.');
      }
    }

    const planet = await this.getPlanetById(planetId);

    if (!planet) {
      throw new NotFoundException('행성을 찾을 수 없습니다.');
    }

    const membershipStatus = planet.isActive
      ? MembershipStatus.APPROVED
      : MembershipStatus.PENDING;

    await this.prisma.planetMembership.create({
      data: {
        userId: userId,
        planetId: planetId,
        status: membershipStatus,
        administrator: false, // 기본적으로 관리자가 아님
      },
    });

    return membershipStatus;
  }

  async approveApplication(
    adminUserId: number,
    targetUserId: number,
    planetId: number,
  ): Promise<string> {
    return this.handleApplication(
      adminUserId,
      targetUserId,
      planetId,
      MembershipStatus.APPROVED,
    );
  }

  async rejectApplication(
    adminUserId: number,
    targetUserId: number,
    planetId: number,
  ): Promise<string> {
    return this.handleApplication(
      adminUserId,
      targetUserId,
      planetId,
      MembershipStatus.REJECTED,
    );
  }

  private async handleApplication(
    adminUserId: number,
    targetUserId: number,
    planetId: number,
    action: MembershipStatus,
  ): Promise<string> {
    const membership = await this.prisma.planetMembership.findUnique({
      where: {
        planetId_userId: {
          planetId: planetId,
          userId: adminUserId,
        },
      },
    });

    if (!membership || !membership.administrator) {
      throw new ForbiddenException('관리자만 승인/거절을 할 수 있습니다.');
    }

    const targetMembership = await this.prisma.planetMembership.findUnique({
      where: {
        planetId_userId: {
          planetId: planetId,
          userId: targetUserId,
        },
      },
    });

    if (
      !targetMembership ||
      targetMembership.status !== MembershipStatus.PENDING
    ) {
      throw new NotFoundException('유효하지 않은 가입 신청입니다.');
    }

    await this.prisma.planetMembership.update({
      where: {
        planetId_userId: {
          planetId: planetId,
          userId: targetUserId,
        },
      },
      data: { status: action },
    });

    switch (action) {
      case MembershipStatus.APPROVED:
        return '가입 신청이 승인되었습니다.';
      case MembershipStatus.REJECTED:
        return '가입 신청이 거절되었습니다.';
      default:
        throw new Error('유효하지 않은 작업입니다.');
    }
  }

  async leavePlanet(userId: number, planetId: number): Promise<boolean> {
    const existingMembership = await this.prisma.planetMembership.findUnique({
      where: {
        planetId_userId: {
          userId: userId,
          planetId: planetId,
        },
      },
    });

    if (!existingMembership) {
      throw new NotFoundException('해당 행성에 가입되어 있지 않습니다.');
    }

    await this.prisma.planetMembership.delete({
      where: {
        planetId_userId: {
          userId: userId,
          planetId: planetId,
        },
      },
    });

    return true;
  }

  async listPlanetMembers(planetId: number) {
    return await this.prisma.planetMembership.findMany({
      where: { planetId: planetId },
      include: { user: true },
    });
  }

  async updateMemberRole(planetId: number, userId: number, isAdmin: boolean) {
    return await this.prisma.planetMembership.update({
      where: {
        planetId_userId: {
          planetId: planetId,
          userId: userId,
        },
      },
      data: { administrator: isAdmin },
    });
  }

  async getPlanetById(planetId: number) {
    return await this.prisma.planet.findUnique({
      where: { id: planetId },
    });
  }

  async getMembership(userId: number, planetId: number) {
    const membership = await this.prisma.planetMembership.findUnique({
      where: {
        planetId_userId: {
          planetId: planetId,
          userId: userId,
        },
      },
      include: {
        planet: true,
      },
    });

    if (!membership) {
      throw new NotFoundException('멤버십 정보를 찾을 수 없습니다.');
    }

    return membership;
  }
}

export enum MembershipStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
