         let player;
  let isPlaying = false;
  let currentVideoIndex = 0;
  const playlistId = 'PLrWUB4lPqAdQb46lEc-4hEJt7So_wO2lT'; // 재생목록 고유 ID

        // 유튜브 API가 준비되면 호출되는 함수
  function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
               playerVars: {
                    'autoplay': 0,
                    'controls': 1,
                    'playlist': playlistId,
                    'loop': 1,
                    'rel': 0
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        function onPlayerReady(event) {
            // 비디오 준비 완료 후 추가 작업이 필요하면 여기에 작성
            updateTitle(); // 초기 상태에서 썸네일 업데이트
        }

        function onPlayerStateChange(event) {
            if (event.data === YT.PlayerState.PLAYING) {
              updateTitle();
            }
        }


        function updateTitle() {
            const title = player.getVideoData().title;
document.getElementById('bgmTitle').textContent = title;
        }


        function bgm(action) {
            const status = document.getElementById('bgmStatus');
            switch(action) {
                case 'playPause':
                    if (!isPlaying) {
                        player.loadPlaylist({
                            listType: 'playlist',
                            list: playlistId,
                            index: currentVideoIndex
                        });
                        player.playVideo();
                        status.textContent = '재생 중'; // 상태 텍스트 업데이트
                        status.style.color = 'green';
                        isPlaying = true;
                    } else {
                        player.pauseVideo();
                        status.textContent = '일시정지'; // 상태 텍스트 업데이트
                        status.style.color = 'red';
                        isPlaying = false;
                    }
                    break;
                case 'next':
                    player.nextVideo(); // 다음 곡 재생
                    currentVideoIndex = (currentVideoIndex + 1) % player.getPlaylist().length;
                    break;
                case 'prev':
                    player.previousVideo(); // 이전 곡 재생
                    currentVideoIndex = (currentVideoIndex - 1 + player.getPlaylist().length) % player.getPlaylist().length;
                    break;
            }
        }
        // 유튜브 API 스크립트 로드
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
       
