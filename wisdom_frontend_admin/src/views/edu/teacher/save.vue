<template>
    <div class="app-container">
        <el-form label-width="120px">
            <el-form-item label="讲师姓名">
                <el-input v-model="eduTeacher.name"></el-input>
            </el-form-item>
            <el-form-item label="讲师头衔">
                <el-select v-model="eduTeacher.level" clearable placeholder="请选择">
                    <el-option label="初级讲师" value="0"></el-option>
                    <el-option label="高级讲师" value="1"></el-option>
                    <el-option label="首席讲师" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="讲师头像">
                <!-- 头衔缩略图 -->
                <pan-thumb :image="eduTeacher.avatar" />
                <!-- 文件上传按钮 -->
                <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">选取头像</el-button>
                <!--
                v-show：是否显示上传组件
                :key：类似于id，如果一个页面多个图片上传控件，可以做区分
                :url：后台上传的url地址
                @close：关闭上传组件
                @crop-upload-success：上传成功后的回调-->
                <image-cropper
                    v-show="imagecropperShow"
                    :width="300"
                    :height="300"
                    :key="imagecropperKey"
                    :url="'/oss/upload'"
                    field="file"
                    @close="close"
                    @crop-upload-success="cropSuccess"
                />
            </el-form-item>
            <el-form-item label="讲师排序">
                <el-input-number :min="1" v-model="eduTeacher.sort" controls-position="right"/>
            </el-form-item>
            <el-form-item label="讲师简介">
                <el-input v-model="eduTeacher.intro" />
            </el-form-item>
            <el-form-item label="讲师资历">
                <el-input v-model="eduTeacher.career" />
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
import ImageCropper from "@/components/ImageCropper";
import PanThumb from "@/components/PanThumb";

export default {
    data() {
        return {
            eduTeacher: {
                id: '',
                name: '',
                intro: '',
                career: '',
                level: '',
                avatar: '',
                sort: 1
            },
            imagecropperShow: false, // 是否显示上传组件
            imagecropperKey: 0, // 上传组件id
            saveBtnDisabled: false // 保存按钮是否禁用,
        }
    },
    created() {
        if (this.$route.params && this.$route.params.id) {
            this.eduTeacher.id = this.$route.params.id;
            this.getById(this.eduTeacher.id);
        }
    },
    components: { ImageCropper, PanThumb },
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
        close() {
            this.imagecropperShow = false,
            this.imagecropperKey = this.imagecropperKey + 1
        },
        cropSuccess(data) {
            this.imagecropperShow = false
            //上传成功之后，关闭弹窗
            this.eduTeacher.avatar = data
            this.imagecropperKey = this.imagecropperKey + 1
        }
    }
}
</script>