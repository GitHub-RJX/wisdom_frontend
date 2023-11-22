<template>
  <div class="app-container">
    <el-steps
      :active="active"
      finish-status="success"
      style="width: 1000px; margin: 30px 100px"
    >
      <el-step title="编辑课程信息"></el-step>
      <el-step title="编辑课程章节"></el-step>
      <el-step title="提交课程"></el-step>
    </el-steps>
    <el-form label-width="120px" style="margin-left: 50px">
      <el-form-item label="课程标题：">
        <el-input v-model="eduCourseInfo.title" placeholder="请输入课程标题" />
      </el-form-item>
      <el-form-item label="总课时数：">
        <el-input-number
          :min="0"
          v-model="eduCourseInfo.lessonNum"
          controls-position="right"
          placeholder="0"
        />
      </el-form-item>
      <el-form-item label="课程简介：">
        <el-input
          v-model="eduCourseInfo.description"
          placeholder="请输入课程简介"
        />
      </el-form-item>
      <el-form-item label="课程价格：">
        <el-input-number
          :min="0"
          v-model="eduCourseInfo.price"
          controls-position="right"
          placeholder="0"
        />
      </el-form-item>
      <el-form-item label="课程讲师：">
        <el-select v-model="eduCourseInfo.teacherId" placeholder="-- 请选择 --">
          <el-option
            v-for="eduTeacher in eduTeacherList"
            :key="eduTeacher.id"
            :label="eduTeacher.name"
            :value="eduTeacher.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程专业：">
        <el-select
          v-model="eduCourseInfo.subjectParentId"
          placeholder="-- 请选择一级专业 --"
          @change="oneChanged"
        >
          <el-option
            v-for="eduSubjectOne in eduSubjectOneList"
            :key="eduSubjectOne.id"
            :label="eduSubjectOne.title"
            :value="eduSubjectOne.id"
          ></el-option>
        </el-select>
        <el-select
          v-model="eduCourseInfo.subjectId"
          placeholder="-- 请选择二级专业 --"
        >
          <el-option
            v-for="eduSubjectTwo in eduSubjectTwoList"
            :key="eduSubjectTwo.id"
            :label="eduSubjectTwo.title"
            :value="eduSubjectTwo.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程封面：">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8099/oss/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="eduCourseInfo.cover" :src="eduCourseInfo.cover" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="eduCourseInfo.cover" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item style="margin-top: 30px">
        <el-button
          :disabled="!ifPrev"
          type="default"
          @click="prev"
          style="margin-left: 250px; padding: 12px"
          >上一步</el-button
        >
        <el-button
          :disabled="!ifNext"
          type="default"
          @click="next"
          style="margin-left: 50px; padding: 12px"
          >下一步</el-button
        >
        <el-button
          :disabled="!ifSubmit"
          type="primary"
          @click="submit"
          style="margin-left: 50px; padding: 12px"
          >发布课程</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import eduCourse from "@/api/edu/course";
export default {
  data() {
    return {
      active: 0,
      ifPrev: false,
      ifNext: true,
      ifSubmit: false,
      dialogVisible: false,
      eduCourseInfo: {
        id: '',
        title: '',
        subjectId: '',
        subjectParentId: '',
        teacherId: '',
        lessonNum: 0,
        description: '',
        cover: '',
        price: 0
      },
      eduTeacherList: [],
      eduSubjectOneList: [],
      eduSubjectTwoList: []
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.eduCourseInfo.id = this.$route.params.id;
      this.getInfoById(this.eduCourseInfo.id);
    }
    this.getAllTeacher();
    this.getAllSubjectOne();
  },
  methods: {
    next() {
      if (this.eduCourseInfo.id == '') {
        eduCourse.save(this.eduCourseInfo)
          .then((result) => {
            if (result.code == 20000) {
              this.$router.push({ path: '/edu/course/chapter/' + result.data.id });
            } else {
              this.$message({
                type: 'error',
                message: '缺少必要信息，请完善表单内容！'
              });
            }
          });
      } else {
        eduCourse.update(this.eduCourseInfo)
          .then((result) => {
            this.$router.push({ path: '/edu/course/chapter/' + this.eduCourseInfo.id });
          });
      }
    },
    getAllTeacher() {
      eduCourse.getAllTeacher()
        .then((result) => {
          this.eduTeacherList = result.data;
        });
    },
    getAllSubjectOne() {
      eduCourse.getAllSubject()
        .then((result) => {
          this.eduSubjectOneList = result.data;
        });
    },
    getInfoById(id) {
      eduCourse.getInfoById(id)
        .then((result) => {
          this.eduCourseInfo = result.data;
        });
    },
    oneChanged(value) {
      for (var i = 0; i < this.eduSubjectOneList.length; i++) {
        var eduSubjectOne = this.eduSubjectOneList[i];
        if (eduSubjectOne.id == value) {
          this.eduSubjectTwoList = eduSubjectOne.children;
          this.eduCourseInfo.subjectId = '';
        }
      }
    },
    handleAvatarSuccess(res, file) {
      this.eduCourseInfo.cover = res.data;
    },
    beforeAvatarUpload(file) {
      const isJpgPng = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt1M = file.size / 1024 / 1024;
      if (!isJpgPng) {
        this.$message.error('上传头像图片只能是 jpg/jpeg 或 png 格式!');
      }
      if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
      }
      return isJpgPng && isLt1M;
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>