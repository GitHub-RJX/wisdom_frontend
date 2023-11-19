<template>
  <div class="dashboard-container">
    <div class="dashboard-logo">
      <img
        src="../../static/images/wisdom.png"
        alt="wisdom智慧教育"
        style="width: 100%"
      />
    </div>
    <div class="dashboard-banner">
      <img
        src="../../static/images/b4.jpg"
        alt="用智慧 享智能"
        style="width: 100%"
      />
      <img
        src="../../static/images/b2.jpg"
        alt="用智慧 享智能"
        style="width: 50%"
      />
      <img
        src="../../static/images/b3.jpg"
        alt="用智慧 享智能"
        style="width: 50%"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'wisdom智慧教育',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 20px 50px;
  }
  &-logo {
    width: 250px;
  }
  &-banner {
    width: 900px;
    margin: 30px 100px;
    border-radius: 30px;
    overflow: hidden;
  }
}
.logo {
  width: 50px;
}
</style>
