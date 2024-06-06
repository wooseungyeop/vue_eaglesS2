<template>
  <table class="sum-list">
    <tr>
      <td>합계</td>
      <td>6</td>
      <td>24000</td>
    </tr>

    <tr>
      <td>할인</td>
      <td></td>
      <td>안해줘</td>
    </tr>

    <tr>
      <td>총 결제 금액</td>
      <td></td>
      <td>24000</td>
    </tr>
  </table>
</template>

<style scoped>
.sum-list {
  width: 100%;
  height: 110px;
  background-color: #d3d3d3;
  margin-top: 10px;
}
tr > td:nth-child(1) {
  width: 60%;
  padding: 1px 1px 1px 20px;
  border-bottom: 1px solid #999;
}

tr > td:nth-child(2) {
  width: 25%;
  text-align: right;
  padding: 1px 20px 1px 1px;
  border-bottom: 1px solid #999;
}

tr > td:nth-child(3) {
  text-align: right;
  padding: 1px 20px 1px 1px;
  border-bottom: 1px solid #999;
}
</style>
