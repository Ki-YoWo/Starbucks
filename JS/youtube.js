// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() { //메소드 명칭 바꾸면 안됨
  // HTML <div id="player"></div> 여기서의 player를 불러온다
  new YT.Player('player', {
    videoId: 'An6LvWQuj_8', // 최초 재생할 유튜브의 ID (자기 ID아님)
    // 참조 : https://www.youtube.com/watch?v=An6LvWQuj_8
    playerVars: {
      autoplay: true, // 자동 재생 유무
      loop: true, // 반복 재생 유무
      playlist: 'An6LvWQuj_8' //반복 재생할 유튜브 영상 ID 목록
    },
    events: {
      onReady: function (event) {
        event.target.mute() //음소거
      }
    }
  });
}