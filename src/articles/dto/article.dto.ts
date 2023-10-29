import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsString,
  IsBoolean,
  IsDate,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { LocationDto } from '.';
import { Type } from 'class-transformer';

export class ArticleDto {
  @ApiProperty({ description: '게시글 ID' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '게시글 제목' })
  @IsString()
  title: string;

  @ApiProperty({ description: '게시글 내용' })
  @IsString()
  content: string;

  @ApiProperty({ description: '게시글 공개 여부' })
  @IsBoolean()
  published: boolean;

  @ApiProperty({ description: '게시글 생성 일자' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: '게시글에 연결된 해시태그 배열' })
  @IsArray()
  @IsString({ each: true })
  hashtags: string[];

  @ApiProperty({ description: '게시글 작성자 ID' })
  @IsNumber()
  authorId: number;

  @ApiProperty({ description: '게시글에 연결된 이미지들의 URL' })
  @IsArray()
  @IsString({ each: true })
  imageUrls: string[];

  @ApiProperty({ description: '게시글에 설정된 주소' })
  @IsString()
  address: string;

  @ApiProperty({
    description: '게시글에 설정된 위치 정보',
    type: [LocationDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocationDto)
  locations: LocationDto[];
}
