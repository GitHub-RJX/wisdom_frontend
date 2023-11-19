<template>
    <div class="app-container">
        <el-form label-width="100px">
            <el-form-item label="课程标题">
                <el-input v-model="eduCourse.title"></el-input>
            </el-form-item>
            <el-form-item label="课程讲师">
                <el-input v-model="eduCourse.teacherId"></el-input>
            </el-form-item>
            <el-form-item label="课程专业">
                <el-input v-model="eduCourse.subjectId"></el-input>
            </el-form-item>
            <el-form-item label="课程父专业">
                <el-input v-model="eduCourse.subjectParentId"></el-input>
            </el-form-item>
            <el-form-item label="课程价格">
                <el-input-number :min="0" v-model="eduCourse.price" controls-position="right" placeholder="0" />
            </el-form-item>
            <el-form-item label="总课时">
                <el-input-number :min="0" v-model="eduCourse.lessonNum" controls-position="right" placeholder="0" />
            </el-form-item>
            <el-form-item label="课程封面">
                <el-upload action="#" list-type="picture-card" :auto-upload="false" :limit="1" v-model="eduCourse.cover">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                                <i class="el-icon-download"></i>
                            </span>
                            <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="eduCourse.cover" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="课程状态">
                <el-select v-model="eduCourse.status" placeholder="-- 请选择 --">
                    <el-option label="未发布" value="Draft"></el-option>
                    <el-option label="已发布" value="Normal"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item style="margin: 50px 300px">
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button type="default" @click="onQuit">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import eduCourse from "@/api/edu/course";
export default {
    data() {
        return {
            eduCourse: {
                title: '',
                teacherId: '',
                subjectId: '',
                subjectParentId: '',
                price: 0,
                lessonNum: 0,
                cover: '',
                description: '',
                status: '',
            },
            dialogVisible: false,
            disabled: false
        }
    },
    created() {
        if (this.$route.params && this.$route.params.id) {
            const id = this.$route.params.id;
            this.getById(id);
        }
    },
    watch: {
        $route(to, from) {

        }
    },
    methods: {
        getById(id) {
            eduCourse.getById(id)
                .then((result) => {
                    this.eduCourse = result.data;
                });
        },
        onSubmit() {
            if (!this.eduCourse.id) {
                this.save();
            } else {
                this.update();
            }
        },
        save() {
            eduCourse.save(this.eduCourse)
                .then((result) => {
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                    this.$router.push({ path: '/edu/course/list' });
                });
        },
        update() {
            eduCourse.update(this.eduCourse)
                .then((result) => {
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    this.$router.push({ path: '/edu/course/list' });
                });
        },
        onQuit() {
            this.$router.push({ path: '/edu/course/list' });
        },
        handleRemove(file) {
            file.url = '';
        },
        handlePictureCardPreview(file) {
            this.eduCourse.cover = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            console.log(file);
        }
    }
}
</script>