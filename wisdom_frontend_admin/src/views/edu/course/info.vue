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
          action="#"
          list-type="picture-card"
          :auto-upload="false"
          :limit="1"
          :on-change="uploadFile"
          v-model="eduCourseInfo.cover"
        >
          <i v-if="eduCourseInfo.cover == ''" slot="default" class="el-icon-plus"></i>
          <img v-else :src="eduCourseInfo.cover" alt="" style="width: 100%; height: 100%;">
          <!-- <div slot="file" slot-scope="{ file }">
            <img class="el-upload-list__item-thumbnail" :src="file.url" />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div> -->
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
          >发布</el-button
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
    handleRemove(file) {
      file.url = '';
    },
    handlePictureCardPreview(file) {
      this.eduCourseInfo.cover = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
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
    uploadFile(file) {
      this.eduCourseInfo.cover = file.url;
    }
  }
}
</script>