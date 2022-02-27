const badgeEl = document.querySelector('header .badges');
const toTopEl = document.querySelector('#to-top');
// gsap.to API사용 시에 요소 부분에 직접 찾아서 넣어도 되지만, CSS요소를 직접 넣어도 찾아줌

window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    // 배지 숨기기
    // gsap.to(요소, 지속시간, 옵션)
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    // 페이지 상단으로 이동하는 버튼 보이기!
    // CSS 요소를 직접 넣는다면,
    // gsap.to('#to-top', .2, { 와 같이 써도 된다. 아래도 동일.
    // 굳이 toTopEl에 찾은 데이터값을 반환시킨 이유는 찾는 행위를 한번만 할 수 있게 효율적 관리차원
    gsap.to(toTopEl, .2, {
      x: 0
    });
  } else {
    // 배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    // 페이지 상단으로 이동하는 버튼 숨기기!
    gsap.to(toTopEl, .2, {
      x: 100 //옆으로 보내서 안보이게 만듬
    });
  }
}, 300)); 
// _.throttle(함수, 시간)을 사용함으로써 스크롤 시 과도하게 부하 걸리지 않도록
// 설정시간만큼 함수 실행을 지연시켜준다. (기존에는 스크롤 드르륵과정에서 수십번 함수 실행)

toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, {
    scrollTo: 0 // 0의 위치로 이동시키겠다. <-ScrollToPlugin이 불러와져 있어야 함.
  });
});



const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  // gsap.to(요소, 지속시간, 옵션)
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, //첫번째 fade-in클래스는 0.7, 그 후로는 1.4, 2.1, 2.7초 후에 생김
    opacity: 1
  });
});


// new Swiper(선택자, 옵션)
// 생성자를 통해 Swiper 함수 실행
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});  // 생성자를 통해 함수 실행
new Swiper('.promotion .swiper-container', {
  // direction: 'horizontal', <-기본 값이기 때문에 특별히 명시할 필욘 없음
  slidesPerView: 3, // 한번에 보여줄 슬라이드 개수 (기본값 1)
  spaceBetween: 10, // 슬라이드 사이 여백 (단위 px)
  centeredSlides: true, // 1번 슬라이드가 가운데로 보이게
  loop: true,
  autoplay: {
    delay: 5000 // 단위 (ms) 기본값은 3000 (3초)
  },
  pagination: {
    el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
    clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});
// 다중 요소 슬라이드
new Swiper('.awards .swiper-container', {
  // direction: 'horizontal'; <-이 역시 기본값이라 생략
  autoplay: true,
  loop:true,
  spaceBetween: 30,
  slidesPerView: 5, //한 화면에 몇개의 슬라이드를 보이게 할건지
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

//promotion 숨김/보임 처리 토글
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false; // promotion 영역이 숨겨져 있는지 여부 (기본은 숨김)
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion // !를 통해서 반전값 적용
  if (isHidePromotion) {
    //true 보여져 있다면, 숨김 처리
    promotionEl.classList.add('hide');
  } else {
   //false 숨겨져 있다면, 보임 처리
    promotionEl.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}


function floatingObject(selector, delay, size) {
  // gsap.to(요소, 시간, 옵션);
  gsap.to(selector, //선택자
    random(1.5, 2.5),  //애니메이션 동작 시간
    { //옵션
    y: size,
    repeat: -1, //무한 반복
    yoyo: true, //한번 재생되면 반대로도 재생
    ease: Power1.easeInOut, //동작타이밍 적용
    delay: random(0, delay)
  });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);


// 스크롤 위치 계산
const spyEls = document.querySelectorAll('section.scroll-spy'); //'section영역 안'명시는 필수X
//section.scroll_spy는 scrollMagic API를 쓰고 html에 클래스를 지정해 줘야 함
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
      triggerHook: .8 //감시하고 있는 요소가 .8이 되었을 때 다음 메소드 setClassToggle()을 실행
      //(뷰포트의 가장 윗단이 0, 가장 밑단이 1)
    })
    .setClassToggle(spyEl, 'show') //setClassToggle이란 어떤 클래스를 넣고빼는 메소드
    .addTo(new ScrollMagic.Controller()); //addTo는 제어하기 위함
});
//scrollMagic이 감시하고 있다가, 뷰포트 0.8의 위치에 scroll-spy클래스 요소가 닿으면 해당 요소에 show를 추가한다는 로직