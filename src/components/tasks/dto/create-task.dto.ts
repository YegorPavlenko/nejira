import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Create seed project.',
    description: "The task's title.",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 1, description: "The project's id." })
  @IsNotEmpty()
  @IsPositive()
  projectId: number;

  @IsString()
  code?: string;

  // @IsPositive()
  // milestoneId?: number;
}
