<template>
  <div class="app-container">
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      label-width="80px"
    >
      <el-form-item label="讲师姓名">
        <el-input v-model="eduTeacher.name" placeholder="讲师姓名"></el-input>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="eduTeacher.level" placeholder="讲师头衔">
          <el-option label="初级讲师" value="0"></el-option>
          <el-option label="高级讲师" value="1"></el-option>
          <el-option label="首席讲师" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getByPage">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="resetData">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="eduTeacherList" style="width: 100%">
      <el-table-column prop="name" label="讲师姓名" width="100" />
      <!-- <el-table-column prop="avatar" label="讲师头像" width="180" /> -->
      <el-table-column label="讲师头像" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" width="80%" />
        </template>
      </el-table-column>
      <el-table-column prop="intro" label="讲师简介" width="420" />
      <el-table-column prop="career" label="讲师资历" width="210" />
      <el-table-column label="讲师头衔" width="120">
        <template slot-scope="scope">
          {{
            scope.row.level === 0
              ? "初级讲师"
              : scope.row.level === 1
              ? "高级讲师"
              : "首席讲师"
          }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <router-link :to="'/edu/teacher/update/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
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
import eduTeacher from "@/api/edu/teacher";
export default {
  data() {
    return {
      current: 1,
      size: 4,
      eduTeacher: {},
      eduTeacherList: [],
      total: 0,
    };
  },
  created() {
    this.getByPage();
  },
  methods: {
    getByPage() {
      eduTeacher
        .getByPage(this.current, this.size, this.eduTeacher)
        .then((result) => {
          this.eduTeacherList = result.data.eduTeacherList;
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
      this.eduTeacher = {};
      this.getByPage();
    },
    deleteById(id) {
      this.$confirm("此操作将永久删除该讲师, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        eduTeacher.deleteById(id).then((result) => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getByPage();
        });
      });
    },
    update() {
      eduTeacher.update().then((result) => {
        this.eduTeacher = result.data;
      });
    },
  },
};
</script>