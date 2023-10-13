<template>
  <div class="PageDev">
    <div class="left">
      left

      <div class="box">
        box
      </div>
    </div>

    <div class="right">
      <el-scrollbar class="content">
        right

        <div class="box">
          box
          <div class="text" v-for="i in 50" :key="i">Lorem ipsum {{ i }}</div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>


<script setup>

</script>


<style scoped lang="scss">
.PageDev {
  background-color: #ddd;
  border-bottom: 2px solid red;
  opacity: 0.5;
  display: flex;
  gap: 20px;
  font-size: 50px;

  .left {
    width: 400px;
    background-color: #eee;
    border-bottom: 4px solid green;
    display: flex;
    flex-direction: column;

    .box {
      opacity: 0.5;
    }
  }

  .right {
    flex: 1;
    background-color: #eee;
    overflow: clip;
  }
}
</style>
