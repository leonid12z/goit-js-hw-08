import Player from '@vimeo/player';
import throttle from 'lodash.throttle'; 

const STORAGE_VIDEO_PLAYER = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function onTimeData(data) {
   localStorage.setItem(STORAGE_VIDEO_PLAYER, data.seconds);
};

player.on('timeupdate', throttle(onTimeData, 1000));

const currentTimePlay = localStorage.getItem(STORAGE_VIDEO_PLAYER);
   if (currentTimePlay) {
      player.setCurrentTime(currentTimePlay);
}

player.getVideoTitle().then(function(title) {
   console.log('title:', title);
});

