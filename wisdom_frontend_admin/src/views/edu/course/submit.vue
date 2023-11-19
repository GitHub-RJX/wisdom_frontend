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
    <div style="margin: 100px">
      <h2>{{ eduCoursePublishVo.title }}</h2>
      <h4>共计 {{ eduCoursePublishVo.lessonNum }} 课时</h4>
      <h4>
        <i>所属分类：</i>{{ eduCoursePublishVo.subjectLevelOne }} --
        {{ eduCoursePublishVo.subjectLevelTwo }}
      </h4>
      <h4><i>课程讲师：</i>{{ eduCoursePublishVo.teacherName }}</h4>
      <h3><i>课程价格：</i>￥{{ eduCoursePublishVo.price }}</h3>
    </div>

    <el-form style="margin-top: 60px">
      <el-form-item>
        <el-button
          :disabled="!ifPrev"
          type="default"
          @click="prev"
          style="margin-left: 400px; padding: 12px"
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
      active: 2,
      ifPrev: true,
      ifNext: false,
      ifSubmit: true,
      courseId: '',
      eduCoursePublishVo: {}
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      this.getEduCoursePublishVo(this.courseId);
    }
  },
  methods: {
    prev() {
      this.$router.push({ path: '/edu/course/chapter/' + this.courseId });
    },
    getEduCoursePublishVo(courseId) {
      eduCourse.getEduCoursePublishVo(courseId)
        .then((result) => {
          this.eduCoursePublishVo = result.data;
        });
    },
    submit() {
      eduCourse.updateNormal(this.courseId)
        .then((result) => {
          this.active = 3;
          this.ifPrev = false;
          this.ifSubmit = false;
          this.$message({
            type: 'success',
            message: '发布成功!'
          });
          this.$router.push({ path: '/edu/course/list' });
        });
    }
  }
}
</script>