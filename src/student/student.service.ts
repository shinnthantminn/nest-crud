import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStudent } from '../interface/student.interface';
import { CreateStudentDto } from '../dto/create-student.dto';
import { UpdateStudentDto } from 'src/dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(@InjectModel('Student') private StudentModel: Model<IStudent>) {}

  async createStudent(createStudentDto: CreateStudentDto): Promise<IStudent> {
    const newStudent = await new this.StudentModel(createStudentDto);
    return newStudent.save();
  }

  async updateStudent(
    StudentId: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<IStudent> {
    const existingStudent = await this.StudentModel.findByIdAndUpdate(
      StudentId,
      updateStudentDto,
      { new: true },
    );

    if (!existingStudent) {
      throw new NotFoundException(`Student ${StudentId} is not found`);
    }

    return existingStudent;
  }

  async getAllStudent(): Promise<IStudent[]> {
    const studentData = await this.StudentModel.find();
    if (!studentData || studentData.length == 0) {
      throw new NotFoundException('Students data not found!');
    }
    return studentData;
  }

  async getStudent(id: string): Promise<IStudent> {
    const student = await this.StudentModel.findById(id).exec();

    if (!student) {
      throw new NotFoundException('no student found');
    }

    return student;
  }

  async deleteStudent(id: string): Promise<IStudent> {
    const student = this.StudentModel.findByIdAndDelete(id);

    if (!student) {
      throw new NotFoundException(`student ${id} was not found`);
    }

    return student;
  }
}
