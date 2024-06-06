<template>
  <div class="order-table">
    <table class="list">
      <thead class="meue-list">
        <tr>
          <td>메뉴</td>
          <td>수량</td>
          <td>가격</td>
        </tr>
      </thead>

      <tbody class="menu1">
        <th class="menu2">
          <tr>
            <td>준나게 맛있는 햄버거</td>
            <td>1</td>
            <td>1000</td>
          </tr>

          <tr class="menu-side1" style="font-size: 15px">
            <td class="menu-side2" style="padding-top: 10px">테스트</td>
            <td>테스트</td>
            <td>테스트</td>
          </tr>
        </th>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.menu1 > tr {
  font-size: 25px;
}
.menu2 {
  font-size: 25px;
  padding-top: 10px;
}

tr > td:nth-child(1) {
  width: 60%;
  padding: 1px 1px 1px 20px;
}

tr > td:nth-child(2) {
  width: 25%;
  text-align: right;
  padding: 1px 20px 1px 1px;
}

tr > td:nth-child(3) {
  text-align: right;
  padding: 1px 20px 1px 1px;
}
</style>
