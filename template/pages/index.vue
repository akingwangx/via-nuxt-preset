<template>
  <div class="p-index">
    <p class="text-yellow">test翻译</p>
    <p> 全球数字货币交易平台</p>
    <p> 聚集创新数字资产</p>
    <p>顶尖的技术团队，全方位安全保护，自主研发高速交易撮合引擎，海量交易并发下仍可稳定可靠运行。</p>
    <p>test接口</p>
    <el-table
      :data="tableData"
      style="width: 600px">
      <el-table-column
        prop="coin"
        label="币种"/>
      <el-table-column
        prop="coin_price"
        label="币价"/>
      <el-table-column
        prop="network_hashrate_7days"
        label="算力"
        style="width:300px"/>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.$axios.get('/pool/state/new').then(data => {
      this.tableData = data;
    });
  },
};
</script>
<style lang="scss">
.p-index {
  padding: 100px;
  p {
    font-size: 20px;
    margin-bottom: 40px;
  }
}
</style>
