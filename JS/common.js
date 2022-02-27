//CSS에서 search의 변환효과를 적용하였으나, 돋보기 모양을 클릭하면 변환효과가 적용이 
//안되기 때문에 이를 해결하기 위해 JS를 이용
const searchEl = document.querySelector('.search');
//const searchInputEl = document.querySelector('.search input'); //이렇게 해도 되지만
const searchInputEl = searchEl.querySelector('input'); //이렇게 찾는게 더 최적화된 상태

searchEl.addEventListener('click', function () {
  searchInputEl.focus(); //searchInputEl를 focusing해라. 즉, 선택해라
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused'); //포커싱되면 포커싱됐다는 클래스를 생성
  searchInputEl.setAttribute('placeholder', '통합검색'); //텍스트상자에 힌트 표기
});

searchInputEl.addEventListener('blur', function () { //blur:포커싱이 해제됐다.
  searchEl.classList.remove('focused'); //언포커싱되면 포커싱됐던 클래스를 삭제
  searchInputEl.setAttribute('placeholder', ''); //텍스트상자에 힌트 수정
});


const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear(); //올해 년도(2022)를 반환