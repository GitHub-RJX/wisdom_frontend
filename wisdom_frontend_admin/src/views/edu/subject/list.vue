<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="请输入专业关键词"
      style="margin: 20px"
    />
    <el-tree
      ref="tree6"
      :data="eduSubjectList"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
      style="margin: 10px"
    />
  </div>
</template>

<script>
import eduSubject from "@/api/edu/subject";
export default {
  data() {
    return {
      filterText: '',
      eduSubjectList: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created() {
    this.getAll();
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    getAll() {
      eduSubject.getAll()
        .then((result) => {
          this.eduSubjectList = result.data;
        });
    },
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
  }
}
</script>