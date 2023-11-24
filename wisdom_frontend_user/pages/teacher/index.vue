<template>
  <div id="aCoursesList" class="bg-fa of">
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部讲师</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">讲师头衔</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#" @click="getAllTeacher()">全部</a>
                </li>
                <li
                  v-for="(item, index) in teacherLevelList"
                  :key="index"
                  :class="{ active: selectIndex == index }"
                >
                  <a :title="item.title" href="#" @click="search(index)">{{
                    item
                  }}</a>
                </li>
              </ul>
            </dd>
          </dl>
        </section>
      </section>
      <section class="c-tab-title"></section>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total == 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam"
              >没有相关数据，小编正在努力整理中...</span
            >
          </section>
          <!-- /无数据提示 结束-->
          <article v-if="data.total > 0" class="i-teacher-list">
            <ul class="of">
              <li v-for="teacher in data.eduTeacherList" :key="teacher.id">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a :href="'/teacher/' + teacher.id" :title="teacher.name">
                      <img :src="teacher.avatar" :alt="teacher.name" />
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a
                      :href="'/teacher/' + teacher.id"
                      :title="teacher.name"
                      class="fsize18 c-666"
                      >{{ teacher.name }}</a
                    >
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{ teacher.intro }}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{ teacher.career }}</p>
                  </div>
                </section>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <a
              :class="{ undisable: !data.hasPrevious }"
              href="#"
              title="首页"
              @click.prevent="gotoPage(1)"
              >首页</a
            >
            <a
              :class="{ undisable: !data.hasPrevious }"
              href="#"
              title="前一页"
              @click.prevent="gotoPage(data.current - 1)"
              >&lt;</a
            >
            <a
              v-for="page in data.pages"
              :key="page"
              :class="{
                current: data.current == page,
                undisable: data.current == page
              }"
              :title="'第' + page + '页'"
              href="#"
              @click.prevent="gotoPage(page)"
              >{{ page }}</a
            >
            <a
              :class="{ undisable: !data.hasNext }"
              href="#"
              title="后一页"
              @click.prevent="gotoPage(data.current + 1)"
              >&gt;</a
            >
            <a
              :class="{ undisable: !data.hasNext }"
              href="#"
              title="末页"
              @click.prevent="gotoPage(data.pages)"
              >末页</a
            >
            <div class="clear" />
          </div>
        </div>
        <!-- 公共分页 结束 -->
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /讲师列表 结束 -->
  </div>
</template>
<script>
import teacherApi from "@/api/teacher";
export default {
  //异步调用，调用一次
  //params: 相当于之前 this.$route.params.id  等价  params.id
  asyncData({ params, error }) {
    return teacherApi.getTeacherList(1, 8).then(response => {
      //this.data = response.data.data
      return { data: response.data.data };
    });
  },
  data() {
    return {
      page: 1, //当前页
      data: {}, //讲师列表
      teacherLevelList: ["初级讲师", "高级讲师", "首席讲师"], // 讲师头衔列表
      searchObj: {}, // 查询表单对象
      selectIndex: -1
    };
  },
  methods: {
    //分页切换的方法
    //参数是页码数
    gotoPage(page) {
      teacherApi.getTeacherList(page, 8).then(response => {
        this.data = response.data.data;
      });
    },
    getAllTeacher() {
      this.selectIndex = -1
      this.searchObj = {}
      this.gotoPage(1)
    },
    search(index) {
      this.selectIndex = index
      teacherApi.getTeacherListByLevel(1, 8, index).then(response => {
        this.data = response.data.data;
      });
    },
  }
};
</script>
<style scoped>
.active {
  background: #bdbdbd;
  border-radius: 8px;
}

.hide {
  display: none;
}

.show {
  display: block;
}
</style>
