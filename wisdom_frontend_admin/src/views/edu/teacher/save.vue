<template>
    <div class="app-container">
        <el-form label-width="100px">
            <el-form-item label="讲师姓名">
                <el-input v-model="eduTeacher.name"></el-input>
            </el-form-item>
            <el-form-item label="讲师头衔">
                <el-select v-model="eduTeacher.level">
                    <el-option label="初级讲师" value="0"></el-option>
                    <el-option label="高级讲师" value="1"></el-option>
                    <el-option label="首席讲师" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="讲师头像">
                <el-upload action="" list-type="picture-card" :auto-upload="false" :limit="1">
                    <i v-if="eduTeacher.avatar == ''" slot="default" class="el-icon-plus"></i>
                    <!-- <img v-else :src="eduTeacher.avatar" alt=""> -->
                    <!-- <i slot="default" class="el-icon-plus"></i> -->
                    <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                        <span class="el-upload-list__item-actions">
                            <!-- <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                <i class="el-icon-zoom-in"></i>
                            </span> -->
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleUpload(file)">
                                <i class="el-icon-download"></i>
                            </span>
                            <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
                <!-- <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="eduTeacher.avatar" alt="">
                </el-dialog> -->
            </el-form-item>
            <el-form-item label="讲师排序">
                <el-input-number :min="0" v-model="eduTeacher.sort" controls-position="right" />
            </el-form-item>
            <el-form-item label="讲师简介">
                <el-input v-model="eduTeacher.intro"></el-input>
            </el-form-item>
            <el-form-item label="讲师资历">
                <el-input v-model="eduTeacher.career"></el-input>
            </el-form-item>
            <el-form-item style="margin: 50px 300px">
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button type="default" @click="onQuit">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import eduTeacher from "@/api/edu/teacher";
export default {
    data() {
        return {
            eduTeacher: {
                id: '',
                name: '',
                intro: '',
                career: '',
                level: 0,
                avatar: '',
                sort: 0
            },
            dialogVisible: false,
            disabled: false
        }
    },
    created() {
        if (this.$route.params && this.$route.params.id) {
            this.eduTeacher.id = this.$route.params.id;
            this.getById(this.eduTeacher.id);
        }
    },
    watch: {
        $route(to, from) {
        }
    },
    methods: {
        getById(id) {
            eduTeacher.getById(id)
                .then((result) => {
                    this.eduTeacher = result.data;
                });
        },
        onSubmit() {
            if (!this.eduTeacher.id) {
                this.save();
            } else {
                this.update();
            }
        },
        save() {
            eduTeacher.save(this.eduTeacher)
                .then((result) => {
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                    this.$router.push({ path: '/edu/teacher/list' });
                });
        },
        update() {
            eduTeacher.update(this.eduTeacher)
                .then((result) => {
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    this.$router.push({ path: '/edu/teacher/list' });
                });
        },
        onQuit() {
            this.$router.push({ path: '/edu/teacher/list' });
        },
        handleRemove(file) {
            file.url = '';
            eduTeacher.avatar = ''
        },
        handleUpload(file) {
            this.eduTeacher.avatar = file.url;
            // this.dialogVisible = true;
        }
    }
}
</script>