  let player;
  let isPlaying = false;
  let currentVideoIndex = 0;
  const playlistId = 'PLrWUB4lPqAdQb46lEc-4hEJt7So_wO2lT'; // 재생목록 고유 ID
        // 유튜브 준비
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
 // 초기 상태에서 썸네일 업데이트
        function onPlayerReady(event) {
            updateThumbnail(); 
        }
 // 곡 바뀔때마다 썸네일 업데이트 하기
        function onPlayerStateChange(event) {
            if (event.data === YT.PlayerState.PLAYING) {
                updateThumbnail();
                updateTitle();
            }
        }
// 곡 바뀔때마다 썸네일 업데이트 하기
        function updateThumbnail() {
            const videoId = player.getVideoData().video_id;
            if (videoId) {
                const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                document.getElementById('thumbnail').style.backgroundImage = `url(${thumbnailUrl})`;
                document.getElementById('thumbnail').textContent = ''; // 기본 텍스트 제거
            } else {
                document.getElementById('thumbnail').style.backgroundImage = ''; // 배경 이미지 제거
                document.getElementById('thumbnail').textContent = '앨범아트 없음'; // 썸네일 없을 때 띄울 텍스트
            }
        }
function updateVideoTitle() {
    const playlist = document.querySelectorAll('#playlist li');  // 플레이리스트 항목을 모두 가져옴
    if (player && player.getVideoData) {
@@ -53,61 +7,71 @@ function updateVideoTitle() {
        // HTML <ul>에서 가져온 제목이 있으면 우선 사용, 없으면 API 제목 사용
        const currentTitle = playlist[currentVideoIndex]?.getAttribute('data-title') || apiTitle;

        document.getElementById('marqueeText').innerText = currentTitle; // 제목 업데이트
        document.getElementById('bgmTitle').innerText = currentTitle; // 제목 업데이트 (ID 수정)
    }
}

    titleElement.textContent = title;
function onPlayerReady(event) {
    updateThumbnail(); 
    updateVideoTitle();  // 제목 업데이트 추가
}
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING) {
        updateThumbnail();
        updateVideoTitle();  // 제목 업데이트 추가
    }
}

        function updateThumbnailSize() {
            const width = document.getElementById('thumbWidth').value;
            const height = document.getElementById('thumbHeight').value;
            const thumbnail = document.getElementById('thumbnail');
            thumbnail.style.width = `${width}px`;
            thumbnail.style.height = `${height}px`;
            // 텍스트가 있는 경우 텍스트 중앙 배치
            thumbnail.style.lineHeight = `${height}px`;
        }
function updateThumbnail() {
    const videoId = player.getVideoData().video_id;
    if (videoId) {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        const thumbnail = document.getElementById('thumbnail');
        thumbnail.style.backgroundImage = `url(${thumbnailUrl})`;
        thumbnail.style.backgroundSize = 'cover';  // 썸네일 크기 조정
        thumbnail.style.backgroundRepeat = 'no-repeat';  // 이미지 반복 금지
        thumbnail.textContent = ''; // 기본 텍스트 제거
    } else {
        const thumbnail = document.getElementById('thumbnail');
        thumbnail.style.backgroundImage = ''; // 배경 이미지 제거
        thumbnail.textContent = '앨범아트 없음'; // 썸네일 없을 때 띄울 텍스트
    }
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
                             /*statusImg.src = '여기에 이미지 명(확장자 포함) 이나 루트 넣기'; 로 바꾸면 이미지로 변경
                             status.style.color는 삭제*/                             
                        playPauseBtn.textContent = '■'; // 버튼 텍스트를 '멈춤'으로 변경
                        isPlaying = true;
                    } else {
                        player.pauseVideo();
                        status.textContent = '일시정지'; // 상태 텍스트 업데이트
                        status.style.color = 'red';
                        playPauseBtn.textContent = '▶'; 
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
function bgm(action) {
    const status = document.getElementById('bgmStatus');
    const playPauseBtn = document.getElementById('playPauseBtn'); // 버튼 선택 추가
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
                playPauseBtn.textContent = '■'; // 버튼 텍스트를 '멈춤'으로 변경
                isPlaying = true;
            } else {
                player.pauseVideo();
                status.textContent = '일시정지'; // 상태 텍스트 업데이트
                status.style.color = 'red';
                playPauseBtn.textContent = '▶'; 
                isPlaying = false;
            }
            updateThumbnail(); // 썸네일 업데이트
        }
        // 유튜브 API 스크립트 로드
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
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
    updateThumbnail(); // 썸네일 업데이트
    updateVideoTitle(); // 제목 업데이트 추가
}
