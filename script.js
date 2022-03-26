const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const volumeSlider = document.querySelector("#volume-control");
const volBtn =document.querySelector("#vol-btn");


// Song titles
const songs = ['Janani','Yemaiundacho', 'Meri Jaan Telugu', 'Rowdy-Boys']
let previos_value=0;

// Keep track of songs

let songIndex = 1

// Initially load song info DOM
loadSong(songs[songIndex])

// update song details
function loadSong(song) {

	title.innerText = song
	audio.src =  `music/${song}.mp3`
	cover.src = `images/${song}.jpg`

}

function playSong() {
	// body...

	musicContainer.classList.add('play')

	playBtn.querySelector('i.fas').classList.remove('fa-play')
	playBtn.querySelector('i.fas').classList.add('fa-pause')

	audio.play()
	
}

function pauseSong() {
	// body...
	musicContainer.classList.remove('play')

	playBtn.querySelector('i.fas').classList.add('fa-play')
	playBtn.querySelector('i.fas').classList.remove('fa-pause')
	
	audio.pause()
}

function prevSong() {
	// body...
	songIndex = ((songIndex-1)%songs.length)
	if(songIndex < 0) songIndex = songs.length -1
	// console.log(songIndex)

	loadSong(songs[songIndex])
	playSong()

}
function nextSong() {
	// body...

	songIndex = ((songIndex+1)%songs.length)
	// console.log(songIndex)
	loadSong(songs[songIndex])
	playSong()
}

function updateProgress(e) {
	// body...
	const {duration,   currentTime} = e.srcElement
	const progressPercent = (currentTime/duration)*100
	progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
	// body...
	const totalWidth = this.clientWidth
	const clickedX = e.offsetX
	// console.log(totalWidth)
	const duration = audio.duration

	audio.currentTime = (clickedX / totalWidth) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {

	const isPlaying = musicContainer.classList.contains('play')

	if(isPlaying){
		pauseSong()
	}
	else{
		playSong()
	}
})


function volumeChange(e) {
	// body...

	audio.volume = e.currentTarget.value / 100;
 
}

//Change volume events
volumeSlider.addEventListener("change", volumeChange)

volBtn.addEventListener("click", (e)=>{
	// this.toggleClass('fa-volume-up fa-volume-off')
	console.log(volBtn.classList)
	if(volBtn.classList.contains('fa-volume-up')){
       volBtn.classList.remove('fa-volume-up')
      volBtn.classList.add('fa-volume-off')
      previos_value = volumeSlider.value
      volumeSlider.value = 0 
      
  }
   else{
    volBtn.classList.remove('fa-volume-off')
      volBtn.classList.add('fa-volume-up')
		volumeSlider.value = previos_value
		
  }
  	audio.volume = volumeSlider.value /100
})

//Change song events
prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)

audio.addEventListener('timeupdate', updateProgress)
audio.addEventListener('ended', nextSong)

progressContainer.addEventListener('click', setProgress)
