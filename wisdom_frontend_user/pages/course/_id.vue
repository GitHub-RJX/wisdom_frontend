<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="/" title class="c-999 fsize14">首页</a>
        \
        <a href="#" title class="c-999 fsize14">{{
          eduCourseInfoVo.subjectLevelOne
        }}</a>
        \
        <span class="c-333 fsize14">{{ eduCourseInfoVo.subjectLevelTwo }}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px">
          <section class="p-h-video-box" id="videoPlay">
            <img
              :src="eduCourseInfoVo.cover"
              :alt="eduCourseInfoVo.title"
              class="dis c-v-pic"
            />
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ eduCourseInfoVo.title }}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff fsize16">价格：</span>
              <b class="c-green fsize24" v-if="eduCourseInfoVo.price == 0.0"
                >￥{{ eduCourseInfoVo.price }}</b
              >
              <b class="c-red fsize24" v-else-if="eduCourseInfoVo.price == 0.01"
                >￥{{ eduCourseInfoVo.price }}</b
              >
              <b class="c-yellow fsize24" v-else
                >￥{{ eduCourseInfoVo.price }}</b
              >
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize16"
                >主讲：
                {{ eduCourseInfoVo.teacherName }}&nbsp;&nbsp;&nbsp;</span
              >
            </section>
            <section class="c-attr-mt of">
              <span class="ml5 vam">
                <em class="icon18 scIcon"></em>
                <a class="c-fff vam" title="收藏" href="#">收藏</a>
              </span>
            </section>

            <section
              v-if="ifPay || Number(eduCourseInfoVo.price) === 0"
              class="c-attr-mt"
            >
              <a href="#" title="立即观看" class="comm-btn c-btn-3">立即观看</a>
            </section>

            <section v-else class="c-attr-mt">
              <a
                @click="createOrder()"
                href="#"
                title="立即购买"
                class="comm-btn c-btn-3"
                >立即购买</a
              >
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol clearfix">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ eduCourseInfoVo.buyCount }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ eduCourseInfoVo.lessonNum }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ eduCourseInfoVo.viewCount }}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p>{{ eduCourseInfoVo.description }}</p>
                    </section>
                  </div>
                </div>
                <!-- /课程介绍 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 文件目录 -->
                          <li
                            class="lh-menu-stair"
                            v-for="chapter in eduChapterVoList"
                            :key="chapter.id"
                          >
                            <a
                              href="javascript: void(0)"
                              :title="chapter.title"
                              class="current-1"
                            >
                              <em class="lh-menu-i-1 icon18 mr10"></em>
                              {{ chapter.title }}
                            </a>

                            <ol class="lh-menu-ol" style="display: block">
                              <li
                                class="lh-menu-second ml30"
                                v-for="video in chapter.children"
                                :key="video.id"
                              >
                                <a
                                  :href="'/player/' + video.videoSourceId"
                                  target="_blank"
                                >
                                  <span
                                    class="fr"
                                    v-if="
                                      eduCourseInfoVo.price != 0.0 &&
                                      video.ifPay == true
                                    "
                                  >
                                    <i class="free-icon vam mr10">免费试看</i>
                                  </span>
                                  <span
                                    class="fr"
                                    v-if="eduCourseInfoVo.price == 0.0"
                                  >
                                    <i class="free-icon vam mr10">立即观看</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>
                                  {{ video.title }}
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto">
                  <li>
                    <div class="u-face">
                      <a href="#">
                        <img
                          :src="eduCourseInfoVo.avatar"
                          width="50"
                          height="50"
                          alt
                        />
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a class="c-333 fsize16 fl" href="#">{{
                        eduCourseInfoVo.teacherName
                      }}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{ eduCourseInfoVo.intro }}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
    </section>
    <!-- /课程详情 结束 -->
  </div>
</template>

<script>
import courseApi from "@/api/course";
import ordersApi from "@/api/orders";
export default {
  asyncData({ params, error }) {
    return { courseId: params.id };
  },
  data() {
    return {
      eduCourseInfoVo: {},
      eduChapterVoList: [],
      ifPay: false,
    };
  },
  created() {
    //在页面渲染之前执行
    this.initCourseInfo();
  },
  methods: {
    //查询课程详情信息
    initCourseInfo() {
      courseApi.getCourseInfo(this.courseId)
        .then((response) => {
          this.eduCourseInfoVo = response.data.data.eduCourseInfoVo;
          this.eduChapterVoList = response.data.data.eduChapterVoList;
          this.ifPay = response.data.data.ifPay;
        });
    },
    //生成订单
    createOrder() {
      ordersApi.createOrder(this.courseId).then((response) => {
        //获取返回订单号
        //生成订单之后，跳转订单显示页面
        this.$router.push({ path: "/orders/" + response.data.data });
      });
    },
  },
};
</script>
