function updateVideoTitle() {
    const playlist = document.querySelectorAll('#playlist li');  // 플레이리스트 항목을 모두 가져옴
    if (player && player.getVideoData) {
        let videoData = player.getVideoData(); // 현재 동영상 데이터 가져오기
        let apiTitle = videoData.title;  // YouTube API에서 가져온 제목

        // HTML <ul>에서 가져온 제목이 있으면 우선 사용, 없으면 API 제목 사용
        const currentTitle = playlist[currentVideoIndex]?.getAttribute('data-title') || apiTitle;

        document.getElementById('bgmTitle').innerText = currentTitle; // 제목 업데이트 (ID 수정)
    }
}

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
