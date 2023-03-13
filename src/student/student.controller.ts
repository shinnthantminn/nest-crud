import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { response } from 'express';
import { CreateStudentDto } from 'src/dto/create-student.dto';
import { UpdateStudentDto } from 'src/dto/update-student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async createStudent(
    @Res() response,
    @Body() createStdentDto: CreateStudentDto,
  ) {
    try {
      const newStudent = await this.studentService.createStudent(
        createStdentDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Student has been created successfully',
        newStudent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Student not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateStudent(
    @Param('id') studentId: string,
    @Res() response,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    try {
      const student = await this.studentService.updateStudent(
        studentId,
        updateStudentDto,
      );

      return response.status(HttpStatus.OK).json({
        message: 'Student has been successfully updated',
        student,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getAllStudent(@Res() response) {
    try {
      const student = await this.studentService.getAllStudent();
      return response.status(HttpStatus.OK).json({
        message: 'All student in server',
        student,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: string, @Res() response) {
    try {
      const student = await this.studentService.getStudent(id);
      return response.status(HttpStatus.OK).json({
        message: 'student found',
        student,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete(':id')
  async DeleteStudent(@Param('id') id: string, @Res() response) {
    try {
      const student = await this.studentService.deleteStudent(id);
      return response.status(HttpStatus.OK).json({
        message: 'student remove complete',
        student,
      });
    } catch (err) {
      
      return response.status(err.status).json(err.response);
    }
  }
}
