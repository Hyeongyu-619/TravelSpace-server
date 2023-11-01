import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  Put,
  UseGuards,
  Req,
  Get,
  Delete,
  ForbiddenException,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { PlanetService } from './planet.service';
import {
  CreatePlanetDto,
  TransferOwnershipDto,
  UpdateMemberRoleDto,
  UpdatePlanetDto,
} from './dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { MembershipStatus, PlanetMemberRole } from '@prisma/client';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { AdminGuard, LoggedInGuard } from 'src/auth/guard';

@ApiTags('행성 API')
@Controller('planet')
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}

  @Get()
  @ApiOperation({
    summary: '모든 행성 조회 API',
    description: '모든 행성을 페이지네이션하여 반환합니다.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: 'number',
    description: '페이지 번호',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
    description: '한 페이지당 행성 수',
  })
  async getAllPlanet(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
  ) {
    return this.planetService.getAllPlanet(page, limit);
  }

  @Get('my-planets')
  @UseGuards(JwtAuthGuard, LoggedInGuard)
  @ApiOperation({
    summary: '내가 가입된 행성 조회 API',
    description: '사용자가 가입된 모든 행성을 페이지네이션하여 불러옵니다.',
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: '페이지 번호',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: '페이지당 행성 수',
  })
  async getMyPlanets(
    @Req() req: any,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    const { planets, totalMemberships } = await this.planetService.getMyPlanets(
      req.user.userId,
      page,
      limit,
    );
    return {
      data: planets,
      page,
      limit,
      totalMemberships,
    };
  }

  @Get(':planetId')
  @ApiOperation({
    summary: '특정 행성 조회 API',
    description: 'ID를 사용하여 특정 행성을 불러옵니다.',
  })
  @ApiResponse({
    status: 200,
    description: '특정 행성을 불러왔습니다.',
  })
  async getPlanetById(@Param('planetId') planetId: number) {
    return await this.planetService.getPlanetById(planetId);
  }

  @UseGuards(JwtAuthGuard, LoggedInGuard)
  @Post()
  @ApiOperation({
    summary: '행성 생성 API',
    description: '새로운 행성을 생성합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '행성 생성 성공',
  })
  @ApiBody({ type: CreatePlanetDto })
  async createPlanet(@Body() dto: CreatePlanetDto, @Req() req: any) {
    return await this.planetService.createPlanet(dto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, LoggedInGuard)
  @Put(':planetId')
  @ApiOperation({
    summary: '행성 수정 API',
    description: '행성을 수정합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '행성 업데이트 성공',
  })
  @ApiBody({ type: UpdatePlanetDto })
  async updatePlanet(
    @Param('planetId') planetId: number,
    @Request() req: any,
    @Body() data: UpdatePlanetDto,
  ): Promise<any> {
    const userId = req.user.userId;
    console.log(userId);

    return this.planetService.updatePlanet(planetId, userId, data);
  }

  @UseGuards(JwtAuthGuard, LoggedInGuard)
  @Post('join/:planetId')
  @ApiOperation({
    summary: '행성 가입 API',
    description: '행성에 가입합니다.',
  })
  @ApiParam({ name: 'planetId', description: '행성의 고유 ID' })
  async joinPlanet(
    @Req() req: any,
    @Param('planetId', ParseIntPipe) planetId: number,
  ): Promise<any> {
    const userId = req.user.userId;
    const result = await this.planetService.joinPlanet(userId, planetId);

    if (result === MembershipStatus.APPROVED) {
      return { message: '행성에 성공적으로 가입되었습니다.' };
    } else if (result === MembershipStatus.PENDING) {
      return {
        message: '행성 가입 신청이 완료되었습니다. 승인을 기다려주세요.',
      };
    } else {
      throw new ForbiddenException('행성 가입에 실패하였습니다.');
    }
  }

  @Post('leave/:planetId')
  @UseGuards(JwtAuthGuard, LoggedInGuard)
  @ApiOperation({
    summary: '행성 탈출 API',
    description: '행성을 탈출합니다.',
  })
  @ApiParam({ name: 'planetId', description: '행성의 고유 ID' })
  async leavePlanet(@Req() req: any, @Param('planetId') planetId: number) {
    const userId = req.user.userId;
    await this.planetService.leavePlanet(userId, planetId);
    return { message: '행성에서 성공적으로 탈출하였습니다.' };
  }

  @Get('members/:planetId')
  @UseGuards(JwtAuthGuard, LoggedInGuard)
  @ApiOperation({
    summary: '행성 멤버 리스트 조회 API',
    description: '해당 행성의 모든 멤버를 조회합니다.',
  })
  @ApiParam({ name: 'planetId', description: '행성의 고유 ID' })
  async listPlanetMembers(@Param('planetId') planetId: number) {
    return await this.planetService.listPlanetMembers(planetId);
  }

  @UseGuards(JwtAuthGuard, LoggedInGuard)
  @Put('members/:planetId/:userId')
  @ApiOperation({
    summary: '행성 멤버 권한 수정 API',
    description: '행성에 속한 멤버의 권한을 수정합니다.',
  })
  @ApiParam({ name: 'planetId', description: '행성의 고유 ID' })
  @ApiParam({ name: 'userId', description: '유저의 고유 ID' })
  @ApiBody({ type: UpdateMemberRoleDto })
  async updateMemberRole(
    @Param('planetId') planetId: number,
    @Param('userId') userId: number,
    @Body() updateMemberRoleDto: UpdateMemberRoleDto,
    @Request() req: any,
  ) {
    const { role } = updateMemberRoleDto;
    const currentUserId = req.user.userId;
    return await this.planetService.updateMemberRole(
      planetId,
      userId,
      role,
      currentUserId,
    );
  }

  @Post('approve/:planetId/:userId')
  @UseGuards(JwtAuthGuard, LoggedInGuard)
  @ApiOperation({
    summary: '행성 가입 승인 API',
    description: '행성 가입 신청을 승인합니다.',
  })
  @ApiParam({ name: 'planetId', description: '행성의 고유 ID' })
  @ApiParam({ name: 'userId', description: '유저의 고유 ID' })
  async approveApplication(
    @Req() req: any,
    @Param('planetId') planetId: number,
    @Param('userId') targetUserId: number,
  ): Promise<any> {
    const response = await this.planetService.approveApplication(
      req.user.userId,
      targetUserId,
      planetId,
    );
    return { message: response };
  }

  @Post('reject/:planetId/:userId')
  @UseGuards(JwtAuthGuard, LoggedInGuard)
  @ApiOperation({
    summary: '행성 가입 거절 API',
    description: '행성 가입 신청을 거절합니다.',
  })
  @ApiParam({ name: 'planetId', description: '행성의 고유 ID' })
  @ApiParam({ name: 'userId', description: '유저의 고유 ID' })
  async rejectApplication(
    @Req() req: any,
    @Param('planetId') planetId: number,
    @Param('userId') targetUserId: number,
  ): Promise<any> {
    const response = await this.planetService.rejectApplication(
      req.user.userId,
      targetUserId,
      planetId,
    );
    return { message: response };
  }

  @Delete('kick/:planetId/:userId')
  @UseGuards(JwtAuthGuard, LoggedInGuard)
  @ApiOperation({
    summary: '행성 추방 API',
    description: '행성에 속한 멤버를 추방시킵니다..',
  })
  @ApiParam({ name: 'planetId', description: '행성의 고유 ID' })
  @ApiParam({ name: 'userId', description: '유저의 고유 ID' })
  async kickMember(
    @Req() req: any,
    @Param('planetId') planetId: number,
    @Param('userId') targetUserId: number,
  ) {
    const currentUserId = req.user.userId;

    const membership = await this.planetService.getMembership(
      currentUserId,
      planetId,
    );

    if (
      !membership ||
      (membership.role !== PlanetMemberRole.ADMIN &&
        membership.planet.ownerId !== currentUserId)
    ) {
      throw new ForbiddenException(
        '행성의 관리자 또는 주인만 회원을 추방할 수 있습니다.',
      );
    }

    await this.planetService.leavePlanet(targetUserId, planetId);
    return { message: '사용자가 행성에서 성공적으로 추방되었습니다.' };
  }

  @Get('pending-applications')
  @UseGuards(JwtAuthGuard, LoggedInGuard)
  @ApiOperation({
    summary: '가입 대기 중인 신청 목록 조회 API',
    description: '관리자로 속한 행성의 가입 대기 중인 신청 목록을 조회합니다.',
  })
  async getPendingApplications(@Req() req: any): Promise<any> {
    const userId = req.user.userId;
    const applications =
      await this.planetService.getPendingApplications(userId);
    return applications;
  }

  @UseGuards(JwtAuthGuard, LoggedInGuard)
  @Post(':planetId/bookmark')
  @ApiOperation({
    summary: '행성 북마크 추가 API',
    description: '행성을 북마크에 추가합니다.',
  })
  async addBookmark(
    @Req() req: any,
    @Param('planetId', ParseIntPipe) planetId: number,
  ) {
    return await this.planetService.addBookmark(req.user.userId, planetId);
  }

  @UseGuards(JwtAuthGuard, LoggedInGuard)
  @Delete(':planetId/bookmark')
  @ApiOperation({
    summary: '행성 북마크 취소 API',
    description: '행성 북마크를 취소합니다.',
  })
  async removeBookmark(
    @Req() req: any,
    @Param('planetId', ParseIntPipe) planetId: number,
  ) {
    return await this.planetService.removeBookmark(req.user.userId, planetId);
  }

  @UseGuards(JwtAuthGuard, LoggedInGuard)
  @Get('/my/bookmarks')
  @ApiOperation({
    summary: '북마크한 행성 목록 조회 API',
    description: '사용자가 북마크한 모든 행성을 페이지네이션하여 조회합니다.',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: '페이지 번호',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: '페이지당 행성 수',
  })
  async getBookmarkedPlanets(
    @Req() req: any,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    const { bookmarkedPlanets, totalCount } =
      await this.planetService.getBookmarkedPlanets(
        req.user.userId,
        page,
        limit,
      );
    return {
      data: bookmarkedPlanets,
      page,
      limit,
      totalCount,
    };
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete('admin/delete/:planetId')
  @ApiOperation({
    summary: '행성 삭제 API (관리자 전용)',
    description:
      '관리자가 해당 행성과 연관된 모든 게시글을 포함하여 행성을 삭제합니다.',
  })
  @ApiParam({ name: 'planetId', description: '삭제할 행성의 고유 ID' })
  async deletePlanetForAdmin(
    @Param('planetId', ParseIntPipe) planetId: number,
    @Req() req: any,
  ): Promise<any> {
    await this.planetService.deletePlanet(planetId, req.user.userId, true);
    return { message: '행성이 성공적으로 삭제되었습니다.' };
  }

  @UseGuards(JwtAuthGuard, LoggedInGuard)
  @Delete('delete/:planetId')
  @ApiOperation({
    summary: '행성 삭제 API',
    description: '행성 주인이 해당 행성을 삭제합니다.',
  })
  @ApiParam({ name: 'planetId', description: '삭제할 행성의 고유 ID' })
  async deletePlanet(
    @Param('planetId', ParseIntPipe) planetId: number,
    @Req() req: any,
  ): Promise<any> {
    await this.planetService.deletePlanet(planetId, req.user.userId);
    return { message: '행성이 성공적으로 삭제되었습니다.' };
  }

  @UseGuards(JwtAuthGuard, LoggedInGuard)
  @Put('transfer-ownership/:planetId')
  @ApiOperation({
    summary: '행성 소유권 이전 API',
    description: '행성의 소유권을 다른 멤버에게 이전합니다.',
  })
  @ApiParam({ name: 'planetId', description: '행성의 고유 ID' })
  @ApiBody({ description: 'TransferOwnershipDto', type: TransferOwnershipDto })
  async transferOwnership(
    @Param('planetId', ParseIntPipe) planetId: number,
    @Body() transferOwnershipDto: TransferOwnershipDto,
    @Req() req: any,
  ) {
    const currentOwnerId = req.user.userId;
    const newOwnerId = transferOwnershipDto.newOwnerId;
    await this.planetService.transferOwnership(
      planetId,
      newOwnerId,
      currentOwnerId,
    );
    return { message: '행성의 소유권이 성공적으로 이전되었습니다.' };
  }
}
