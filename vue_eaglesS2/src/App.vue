<script setup>
import MainComponent from "./components/mainIndex/MainComponent.vue";
const popUp = () => {
  const element = document.getElementsByClassName("popup-list")[0];
  if (element) {
    element.style.display = "block";
  }
};

const popBack = () => {
  const element = document.getElementsByClassName("popup-list")[0];
  if (element) {
    element.style.display = "none";
  }
};

const popUp_final = () => {
  const element = document.getElementsByClassName("popup-overlay")[0];
  if (element) {
    element.style.display = "block";
  }
};

const popUp_myList = () => {
  const element = document.getElementsByClassName("popup-overlay")[0];
  if (element) {
    element.style.display = "none";
  }
};

const skip = () => {
  document.getElementById("btnfadeIn").classList.add("fade-out");
};
</script>

<template>
  <section class="popup-list">
    <!-- 
      * display: none; 으로 인한 안보이는거니 참고
    -->

    <div class="popup-container">
      <div>
        <!-- 3선 영역 -->
        <div>
          <div>빨간색 삼선</div>
          <div></div>
        </div>
        <!-- 3선 영역 -->
        <!-- 3선 제작시 마진 추가 영역 -->
        <div class="popup-header">
          <p>나의 주문 리스트</p>
        </div>
        <!-- 3선 제작시 마진 추가 영역 -->

        <!-- 메뉴, 수량, 가격 -->
        <div class="popup-content">
          <div>
            <div class="order-table">
              <table class="list">
                <thead class="meue-list">
                  <tr>
                    <td>메뉴</td>
                    <td>수량</td>
                    <td>가격</td>
                  </tr>
                </thead>

                <!-- 햄버거, 수량 갯수, 가격 원 -->
                <tbody style="font-size: 25px">
                  <!-- for문 돌리기 -->
                  <th style="padding-top: 10px">
                    <tr>
                      <td>준나게 맛있는 햄버거</td>
                      <td>1</td>
                      <td>1000</td>
                    </tr>
                    <tr style="font-size: 15px">
                      <td style="padding-top: 10px">테스트</td>
                      <td>테스트</td>
                      <td>테스트</td>
                    </tr>
                  </th>
                  <!--for문 돌리기  -->
                </tbody>

                <!-- 햄버거, 수량 갯수, 가격 원 -->
              </table>
            </div>

            <!-- 합계, 할인, 총 결제 금액 -->
            <table
              class="sum-list"
              style="
                width: 100%;
                height: 110px;
                background-color: #d3d3d3;
                margin-top: 10px;
              "
            >
              <tr style="border-bottom: 1px solid #999">
                <td>합계</td>
                <td>6</td>
                <td>24000</td>
              </tr>

              <tr style="border-bottom: 1px solid #999">
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

            <!-- 합계, 할인, 총 결제 금액 -->
            <div class="imgs-box">
              <p>함께 구매하기 좋은 상품</p>
              <!-- 추가메뉴 박스 -->
              <!-- 좌우 버튼 -->
              <div class="additional-items">
                <div class="additional-items_sub">
                  <img src="" alt="" />
                </div>
                <!-- 좌우 버튼 -->
                <div class="item-thumbails">
                  <div class="thumbnail">
                    <!-- <img class="imgs-thumbnail" src="" alt="test" style=" width: 100%; height: auto; "> -->
                  </div>
                  <div class="thumbnail">
                    <!-- <img class="imgs-thumbnail" src="" alt="test" style=" width: 100%; height: auto;"> -->
                  </div>
                  <div class="thumbnail">
                    <!-- <img class="imgs-thumbnail" src="" alt="test" style=" width: 100%; height: auto;"> -->
                  </div>
                </div>
                <div class="arrow-button">
                  <img src="" alt="" />
                </div>
                <!-- 추가메뉴 박스 -->
              </div>
            </div>
            <div class="popup-buttons">
              <div class="previous-button" @click="popBack()">
                <p>
                  <a>이전</a>
                </p>
              </div>
              <div class="next-button" @click="popUp_final()">
                <p>
                  <a>결제하기</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- 
      * display: none; 으로 인한 안보이는거니 참고
    -->
  <section class="popup-overlay">
    <!-- 
      * display: none; 으로 인한 안보이는거니 참고
    -->
    <div class="popup-inner">
      <div class="final-amount">
        <div class="final-amount_sub">
          <p>최종 결제 금액</p>
          <div>
            <p>2조억 ㅋㅋ</p>
          </div>
        </div>

        <div class="payment-options">
          <p>식사 방식을 선택해주세요.</p>

          <div class="dine-options">
            <div class="dine-in">매장 식사</div>
            <div class="take-out">포장 주문</div>
          </div>
        </div>
        <div class="popup-buttons02">
          <div class="previous-button02" @click="popUp_myList()">이전</div>
          <div class="next-button02" @click="popUp_myList">
            <a href="./payment.html">다음</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- 승엽님 -->
</template>

<style scoped></style>
