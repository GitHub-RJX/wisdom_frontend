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

    <div class="box">
      <el-button class="addChapter" type="text" @click="openChapterDialog()"
        >+ 添加章节</el-button
      >
      <ul class="chapterList">
        <li v-for="(chapter, index) in eduChapterVoList" :key="chapter.id">
          <p>
            第{{ index + 1 }}章&nbsp;{{ chapter.title }}
            <span class="acts">
              <el-button type="text" @click.native="openEditChapter(chapter.id)"
                >编辑</el-button
              >
              <el-button type="text" @click.native="removeChapter(chapter.id)"
                >删除</el-button
              >
            </span>
          </p>
          <el-button
            class="addVideo"
            type="text"
            @click.native="openVideo(chapter.id)"
            >+ 添加小节</el-button
          >
          <!-- 视频 -->
          <ul class="videoList">
            <li v-for="(video, index) in chapter.children" :key="video.id">
              <p>
                第{{ index + 1 }}节&nbsp;{{ video.title }}
                <span class="acts">
                  <el-button type="text" @click.native="openEditVideo(video.id)"
                    >编辑</el-button
                  >
                  <el-button type="text" @click="removeVideo(video.id)"
                    >删除</el-button
                  >
                </span>
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节编号">
          <el-input-number
            v-model="chapter.sort"
            :min="1"
            controls-position="right"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="课时编号">
          <el-input-number
            v-model="video.sort"
            :min="1"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="是否免费" v-if="coursePrice != 0.00">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="true">免费试看</el-radio>
            <el-radio :label="false">收费</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="上传视频">
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API + '/vod/upload'"
            :limit="1"
            class="upload-demo"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">
                最大支持1G，<br />
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br />
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br />
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br />
                SWF、TS、VOB、WMV、WEBM 等视频格式上传
              </div>
              <i class="el-icon-question" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>

    <el-form>
      <el-form-item style="margin-top: 100px">
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
import eduChapter from "@/api/edu/chapter";
import eduVideo from '@/api/edu/video';
export default {
  data() {
    return {
      active: 1,
      ifPrev: true,
      ifNext: true,
      ifSubmit: false,
      eduChapterVoList: [],
      courseId: '',
      coursePrice: 0,
      dialogChapterFormVisible: false,//章节弹框
      dialogVideoFormVisible: false, //小节弹框
      chapter: { //封装章节数据
        id: '',
        title: '',
        sort: 1
      },
      video: {
        id: '',
        courseId: '',
        chapterId: '',
        title: '',
        sort: 1,
        isFree: 0,
        videoSourceId: '',
        videoOriginalName: ''
      }
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
      this.getAllChapter(this.courseId);
      this.getCoursePrice(this.courseId);
    }
  },
  methods: {
    prev() {
      this.$router.push({ path: '/edu/course/info/' + this.courseId });
    },
    next() {
      this.$router.push({ path: '/edu/course/submit/' + this.courseId });
    },
    getAllChapter(courseId) {
      eduChapter.getAllChapter(courseId)
        .then((result) => {
          this.eduChapterVoList = result.data;
        });
    },
    getCoursePrice(courseId) {
      eduCourse.getInfoById(courseId)
        .then((result) => {
          this.coursePrice = result.data.price;
        });
    },
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    },
    openChapterDialog() {
      //弹框
      this.dialogChapterFormVisible = true
      //表单数据清空
      this.eduChapter.title = ''
      this.eduChapter.sort = 0
    },

    //==============================章节操作====================================
    //删除章节
    removeChapter(chapterId) {
      this.$confirm('此操作将删除章节, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {  //点击确定，执行then方法
        //调用删除的方法
        eduChapter.deleteChapter(chapterId)
          .then(response => {//删除成功
            //提示信息
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            //刷新页面
            this.getAllChapter(this.courseId)
          })
      }) //点击取消，执行catch方法
    },
    //修改章节弹框数据回显
    openEditChapter(chapterId) {
      //调用接口
      eduChapter.getChapterById(chapterId)
        .then(response => {
          this.chapter = response.data
        })
      //弹框
      this.dialogChapterFormVisible = true
    },
    //弹出添加章节页面
    openChapterDialog() {
      //弹框
      this.dialogChapterFormVisible = true
      //表单数据清空
      this.chapter.id = ''
      this.chapter.title = ''
      this.chapter.sort = 0
    },
    //添加章节
    addChapter() {
      //设置课程id到chapter对象里面
      this.chapter.courseId = this.courseId
      eduChapter.addChapter(this.chapter)
        .then(response => {
          //关闭弹框
          this.dialogChapterFormVisible = false
          //提示
          this.$message({
            type: 'success',
            message: '添加章节成功!'
          });
          //刷新页面
          this.getAllChapter(this.courseId);
        })
    },
    //修改章节的方法
    updateChapter() {
      eduChapter.updateChapter(this.chapter)
        .then(response => {
          //关闭弹框
          this.dialogChapterFormVisible = false
          //提示
          this.$message({
            type: 'success',
            message: '修改章节成功!'
          });
          //刷新页面
          this.getAllChapter(this.courseId)
        })
    },
    saveOrUpdate() {
      if (!this.chapter.id) {
        this.addChapter()
      } else {
        this.updateChapter()
      }
    },
    //==============================小节操作====================================
    //删除小节
    removeVideo(videoId) {
      this.$confirm('此操作将删除小节, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {  //点击确定，执行then方法
        //调用删除的方法
        eduVideo.deleteVideo(videoId)
          .then(response => {//删除成功
            //提示信息
            this.$message({
              type: 'success',
              message: '删除小节成功!'
            });
            //刷新页面
            this.getAllChapter(this.courseId)
          })
      }) //点击取消，执行catch方法
    },
    //添加小节弹框的方法
    openVideo(chapterId) {
      //弹框
      this.dialogVideoFormVisible = true
      //设置章节id
      this.video.chapterId = chapterId
      //表单数据清空
      this.video.id = ''
      this.video.title = ''
      this.video.sort = 0
      this.video.isFree = 0
      this.video.videoSourceId = 0
      this.video.videoOriginalName = 0
      this.fileList = []
    },
    //添加小节
    addVideo() {
      //设置课程id
      this.video.courseId = this.courseId
      eduVideo.addVideo(this.video)
        .then(response => {
          //关闭弹框
          this.dialogVideoFormVisible = false
          //提示
          this.$message({
            type: 'success',
            message: '添加小节成功!'
          });
          //刷新页面
          this.getAllChapter(this.courseId)
        })
    },
    updateVideo() {
      eduVideo.updateVideo(this.video)
        .then(response => {
          //关闭弹框
          this.dialogVideoFormVisible = false
          //提示
          this.$message({
            type: 'success',
            message: '修改小节成功!'
          });
          //刷新页面
          this.getAllChapter(this.courseId)
        })
    },
    saveOrUpdateVideo() {
      if (!this.video.id) {
        this.addVideo()
      } else {
        this.updateVideo()
      }
    },
    openEditVideo(videoId) {
      //调用接口
      eduVideo.getVideoById(videoId)
        .then((result) => {
          this.video = result.data;
        });
      //弹框
      this.dialogVideoFormVisible = true
    }
  }
}
</script>

<style scoped>
.box {
  margin: 30px 100px;
  width: 1000px;
}
.addChapter {
  padding: 8px 0;
  font-size: 16px;
}
.chapterList {
  list-style: none;
  margin: 0;
  padding: 0;
}
.chapterList p {
  float: left;
  font-size: 18px;
  margin: 20px 0 0;
  padding: 0 20px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border: 2px solid #000000;
  border-radius: 10px;
}
.chapterList .acts {
  float: right;
  font-size: 16px;
}
.addVideo {
  padding: 5px 50px;
}
.videoList {
  list-style: none;
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 3px 0;
  height: 40px;
  line-height: 40px;
  width: 100%;
  border: 1px solid gray;
}
</style>