<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      label-width="80px"
    >
      <el-form-item label="课程标题">
        <el-input v-model="eduCourse.title" placeholder="课程标题"></el-input>
      </el-form-item>
      <el-form-item label="课程状态">
        <el-select v-model="eduCourse.status" placeholder="课程状态">
          <el-option label="待发布" value="Draft"></el-option>
          <el-option label="已发布" value="Normal"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getByPage">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="resetData">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="eduCourseVoList"
      style="width: 100%"
      border
      :header-cell-style="{ 'text-align': 'center', color: '#333' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="title" label="课程标题" width="180" />
      <el-table-column label="课程封面" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.cover" width="80%" />
        </template>
      </el-table-column>
      <el-table-column prop="teacherName" label="课程讲师" width="120" />
      <el-table-column prop="subjectTitle" label="所属专业" width="120" />
      <el-table-column prop="lessonNum" label="总课时数" width="100" />
      <el-table-column prop="price" label="课程价格" width="100" />
      <el-table-column prop="viewCount" label="浏览数量" width="100" />
      <el-table-column label="课程状态" width="100">
        <template slot-scope="scope">
          {{ scope.row.status === "Draft" ? "待发布" : "已发布" }}
        </template>
      </el-table-column>
      <el-table-column label="操作课程" width="180">
        <template slot-scope="scope">
          <router-link :to="'/edu/course/update/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateDraft(scope.row.id)"
              >修改</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteById(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="current"
      :page-sizes="[4, 8, 12, 16]"
      :page-size.sync="size"
      :total="total"
      background
      style="text-align: center; margin-top: 30px"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import eduCourse from "@/api/edu/course";
export default {
  data() {
    return {
      current: 1,
      size: 4,
      eduCourse: {},
      eduCourseVoList: [],
      total: 0,
    };
  },
  created() {
    this.getByPage();
  },
  methods: {
    getByPage() {
      eduCourse
        .getByPage(this.current, this.size, this.eduCourse)
        .then((result) => {
          this.eduCourseVoList = result.data.eduCourseVoList;
          this.total = result.data.total;
        });
    },
    handleSizeChange(val) {
      this.size = val;
      this.getByPage();
    },
    handleCurrentChange(val) {
      this.current = val;
      this.getByPage();
    },
    resetData() {
      this.eduCourse = {};
      this.getByPage();
    },
    deleteById(id) {
      this.$confirm("此操作将永久删除该课程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        eduCourse.deleteById(id).then((result) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getByPage();
        });
      });
    },
    updateDraft(courseId) {
      eduCourse.updateDraft(courseId);
    }
  },
};
</script>