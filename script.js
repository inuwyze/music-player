const musicContainer=document.getElementById('music-container');
const play=document.getElementById('play');
const prev=document.getElementById('prev');
const next=document.getElementById('next');

const audio=document.getElementById('audio');
const progress=document.getElementById('progress');
const progressContainer=document.getElementById('progress-container');
const title=document.getElementById('title');
const cover=document.getElementById('cover');

const songs=['hey','summer','ukulele'];
let songIndex=1;

loadSong(songs[songIndex]);

function loadSong(song){
    title.innerText=song;
    console.log('ola')
    audio.src=`music/${song}.mp3`;
    cover.src=`images/${song}.jpg`;
}

play.addEventListener('click',()=>{
    const isPlaying=musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }
});

function playSong(){
    musicContainer.classList.add('play');
    play.querySelector('i.fas').classList.remove('fa-play');
    play.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}
function pauseSong(){
    musicContainer.classList.remove('play');
    play.querySelector('i.fas').classList.remove('fa-pause');
    play.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex=songs.length-1;
    }

    loadSong(songs[songIndex]);
    playSong();
}
function nextSong(){
    songIndex++;
    if(songIndex>songs.length-1){
        songIndex=0;
    }

    loadSong(songs[songIndex]);
    playSong();
}
function updateProgress(e){
    const {duration,currentTime}=e.srcElement
    const progressPercent=(currentTime/duration)*100;
    progress.style.width=`${progressPercent}%`;
}

function setProgress(e){
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const duration=audio.duration;
    audio.currentTime=(clickX/width)*duration;
}

next.addEventListener('click',prevSong);
prev.addEventListener('click',nextSong);
audio.addEventListener('timeupdate',updateProgress);

progressContainer.addEventListener('click',setProgress);
audio.addEventListener('ended',nextSong);