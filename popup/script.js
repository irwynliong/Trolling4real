var videoList = ["https://www.youtube.com/embed/BkWT66jE8Hs?start=60&autoplay=1&mute=1&controls=0&fs=0&modestbranding=1", 
                 "https://www.youtube.com/embed/dvjapcHsqXY?start=10&autoplay=1&mute=1&controls=0&fs=0&modestbranding=1",
                 "https://www.youtube.com/embed/n_Dv4JMiwK8?start=10&autoplay=1&mute=1&controls=0&fs=0&modestbranding=1"];
var currentVideo = 0;

chrome.runtime.onMessage.addListener(function(message, sender) {
    if(message.showVideo) showVideo();
});

function showVideo() {
    var test = document.getElementsByClassName("adhd-vid-div");
    console.log(test);
    if (test.length >= 1) {
        alert("you already have one running!")
        return;
    }
    var div = document.createElement("div");
    div.classList.add("adhd-vid-div");

    var move = document.createElement("div");
    move.classList.add("adhd-movement");
    dragElement(move, div);

    var hidebutton = document.createElement("button");
    hidebutton.innerHTML = '<i class="fas fa-times"></i>';
    hidebutton.classList.add("adhd-hidebutton");
    hidebutton.addEventListener('click', hideVideo)
    
    div.appendChild(hidebutton);    

    var nextbutton = document.createElement("button");
    // move.appendChild(nextbutton);
    nextbutton.innerHTML = ">";
    nextbutton.classList.add("adhd-nextbutton");
    nextbutton.addEventListener('click', nextVideo)

    div.appendChild(move);

    div.appendChild(nextbutton);

    var video = document.createElement("iframe");
    video.classList.add("adhd-vid");
    video.src = videoList[currentVideo];
    video.allow = "autoplay";
    video.volume = 0.2;

    div.appendChild(video);
    document.body.appendChild(div);
}

function hideVideo() {
    var test = document.getElementsByClassName("adhd-vid-div");
    console.log(test);
    if (test.length >= 1) {
    test[0].remove()
    }
}

function nextVideo() {
    var test = document.getElementsByClassName("adhd-vid");
    console.log(test);
    if (test.length >= 1) {
      currentVideo = (currentVideo + 1) % videoList.length;
      test[0].src = videoList[currentVideo];
    }
}

function dragElement(elmnt, toMove) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        toMove.style.top = (toMove.offsetTop - pos2) + "px";
        toMove.style.left = (toMove.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

console.log('content loaded');