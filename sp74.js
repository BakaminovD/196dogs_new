const player = document.querySelector('.container-for-player'),
    poster = document.querySelector('.img'),
    play = document.querySelector('.play'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    audio = document.querySelector('.audio'),
    progressbar = document.querySelector('.progressbar'),
    progress = document.querySelector('.progress'),
    nowNameSong = document.querySelector('.now-name-song'),
    songCollection = document.querySelector('.songs-collection'),
    progressVolume = document.querySelector('.progress-volume'),
    poligonVolume = document.querySelector('.volume'),
    note = document.querySelector('.note');
let songBlock = document.getElementsByClassName('song-block'),
    containAlbum = document.querySelector('.container-album'),
    containForPlayer = document.querySelector('.container-for-player')

const songs74sp = [
    ['Пролог', '74sp/1.mp3', '1:25'],
    ['Ежели бы мне бы...', '74sp/2.mp3', '1:17'],
    ['Девяткино', '74sp/3.mp3', '1:59'],
    ['Полрайона', '74sp/4.mp3', '2:07'],
    ['Пастораль', '74sp/5.mp3', '3:01'],
    ['Пачка', '74sp/6.mp3', '1:37'],
    ['Проститутка', '74sp/7.mp3', '1:36'],
    ['Содом', '74sp/8.mp3', '1:52'],
    ['1000 лет', '74sp/9.mp3', '1:20'],
    ['Эпилог', '74sp/10.mp3', '0:59']
]

    // songsOleg = [
    //     ['Наркоманка Олег', 'oleg/oleg_waw.wav', '1:41']
    // ],

    // poster74sp = '74sp/die.jpg',
    // posterOleg = 'oleg/oleg.jpg'

// Потом переделать на функцию, выбирающую альбом и POSTER
let songs = songs74sp
//    picture = poster74sp

let songIndex = 0,
    flag = false,
    volumeFlag = true, 
    nowVolume = 1

// init songs list
function songsList(songs) {
    //poster.src = picture
    let len = songs.length,
        elem = 1
    for (i=0; i < len; i++) {
        // ТУТ ХЕРНЯ !!!!!!!!!!!!!!!!!!!!!!!!!!
        audio.src = songs[i][1];
        songCollection.innerHTML += '<div class="song-block" onclick="muveSong('+ i +')" id="'+ elem +'"><div class="name-song">'+ elem + '. ' + songs[i][0] +'</div><div class="time-cong">'+songs[i][2]+'</div></div>'
        elem++
    }
}

// init playlist
// function nowAlbum(el) {
//     console.log(el)
//     console.log('kpijpijpijpi')
//     if (el == '1') {
//         songs = songs74sp
//         picture = poster74sp
//     } else if (el == '2') {
//         songs = songsOleg
//         picture = posterOleg
//     }
//     window.location.href = 'pleer.html'
//     console.log(songs)
//     console.log(picture)
    //containAlbum.style.display = 'none'
    //containForPlayer.style.display = 'flex'
//     songsList(songs, picture)
// }

songsList(songs);

// init song
function loadSong(song) {
    Array.from(songBlock).forEach((item) =>
        item.style.borderTop = 'none')
    Array.from(songBlock).forEach((item) =>
        item.style.borderBottom = 'none')
    songBlock[song].style.borderTop = '2px solid white';
    songBlock[song].style.borderBottom = '2px solid white';
    nowNameSong.innerHTML = songs[song][0];
    audio.src = songs[song][1];
}

loadSong(songIndex);

// Play
function playSong() {
    player.classList.add('work-player')
    poster.classList.add('active')
    play.innerHTML = '&#124;&#124;'
    audio.play()
}

// Pause
function pauseSong() {
    player.classList.remove('work-player')
    poster.classList.remove('active')
    play.innerHTML = '&#9655;'
    audio.pause()
}

// next song
function nextSong() {
    flag = false
    songIndex++
    if (songIndex > songs.length-1) {
        songIndex = 0
    }
    loadSong(songIndex)
    let isPlaing = player.classList.contains('work-player')
    if (isPlaing) {
        playSong()
    } else {
        progress.style.width = 0
    }
}

// prev song
function prevSong() {
    flag = true
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length-1
    }
    loadSong(songIndex)
    let isPlaing = player.classList.contains('work-player')
    if (isPlaing) {
        playSong()
    } else {
        progress.style.width = 0
    }
}

//play
play.addEventListener('click', () => {
    console.log('aaaaaaaa')
    flag = false
    let isPlaing = player.classList.contains('work-player')
    if (isPlaing) {
        pauseSong()
    } else {
        playSong()
    }
})

// progressbar
function updateProgress(e) {
    let {duration, currentTime} = e.srcElement,
        progressPersent = currentTime / duration * 100

    progress.style.width = progressPersent + '%'
}

// set progress
function setProgress(e) {
    let width = this.clientWidth,
        clickWidth = e.offsetX,
        duration = audio.duration

    audio.currentTime = clickWidth / width * duration
}

// play in song block
function muveSong(eval) {
    flag = false
    songIndex = eval
    loadSong(songIndex)
    playSong()
}

function myVolume() {
    if (volumeFlag) {
        audio.volume = 0;
        volumeFlag = false
        progressVolume.style.width = 0 +"%"
        note.style.color = "white"
        nowVolume = 0
    } else {
        audio.volume = 1;
        volumeFlag = true
        progressVolume.style.width = 100 +"%"
        note.style.color = "red"
        nowVolume = 1
    }
}

function updateVolume(e) {
    let width = this.clientWidth,
        clickWidth = e.offsetX

    nowVolume = clickWidth / width
    progressVolume.style.width = clickWidth / width * 100 + "%"
    if (nowVolume == 0) {
        audio.volume = 0;
        volumeFlag = false
        progressVolume.style.width = 0 +"%"
        note.style.color = "white"
        nowVolume = 0
    } else {
        audio.volume = nowVolume
        note.style.color = "red"
    }
}

next.addEventListener('click', nextSong)
prev.addEventListener('click', prevSong)
audio.addEventListener('timeupdate', updateProgress)
progressbar.addEventListener('click' , setProgress)
note.addEventListener('click', myVolume)
poligonVolume.addEventListener('click', updateVolume)

// auto play

audio.addEventListener('ended', nextSong)


