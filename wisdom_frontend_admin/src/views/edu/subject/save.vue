<template>
    <div class="app-container">
        <el-form label-width="120px">
            <el-form-item label="信息描述">
                <el-tag type="info">Excel模板文件说明</el-tag>
                <el-tag>
                    <i class="el-icon-dnowload"></i>
                    <a href="'C:\Users\Ran\Desktop\Download\模板文件.xlsx'">点击下载模板文件</a>
                </el-tag>
            </el-form-item>
            <el-form-item label="选择文件">
                <el-upload class="upload-demo" ref="upload" :action="BASE_API + '/edu/subject/save'"
                    :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false"
                    :limit="1" name="file" accept="application/vnd.ms-excel">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <el-button style="margin-left: 10px;" size="small" type="success"
                        @click="submitUpload">上传到服务器</el-button>
                    <div slot="tip" class="el-upload__tip">注意：只能上传Excel（.xlsx）文件</div>
                </el-upload>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
export default {
    data() {
        return {
            BASE_API: process.env.BASE_API,
            fileList: []
        };
    },
    created() {

    },
    methods: {
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    }
}
</script>