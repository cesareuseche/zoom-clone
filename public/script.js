const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: '3030'
});

let videoStream
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    videoStream = stream
    addVideoStream(myVideo, stream)

    socket.on('user-connected', (userId) => { //passing the stream and the d through the socket from the promise 
        connectToNewUser(userId, stream);
    })
})

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
})


const connectToNewUser = (userId) => {
    const call = peer.call(userId, stream) // calling the user and sending the stream
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play() // Plays the video
    })
    videoGrid.append(video);
}