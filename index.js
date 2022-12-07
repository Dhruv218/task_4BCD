const submit = document.querySelector("#submit");

submit.addEventListener("click", () => {

  openTab();

});

async function openTab() {

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: logInfo,
    });

  });
}


function logInfo() {
  
  document.body.innerHTML = `<div class='output' style="position:absolute;width:100%;height:100%;z-index:100;">
</div>`
  var div = document.querySelector('div')
  var video = document.createElement('video');
  video.style.width = "60%";
  video.style.height = "500px";
  video.style.margin = "15px auto";
  video.setAttribute("controls", "controls")
  video.style.borderRadius = '4px'

  div.appendChild(video)

  var button = document.createElement('button');
  button.style.padding = '10px'
  button.innerHTML = 'Start'
  button.style.margin = "15px auto";
  button.style.width = "70px";
  button.style.borderRadius = "4px";
  button.style.fontSize = " larger";
  button.style.fontWeight = "600";
  button.setAttribute("class", "start")
  button.style.background = 'black'
  button.style.color = 'white'

  div.appendChild(button)


  div.style.display = 'flex'

  div.style.flexDirection = 'column'
  div.style.justifyContent = 'center'
  div.style.alignItems = 'center'


  const start = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        mediaSource: "screen",
      }
    });

    const data = [];
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e) => {
      data.push(e.data);
    }
    mediaRecorder.start();
    mediaRecorder.onstop = (e) => {
      video.src = URL.createObjectURL(
        new Blob(data, {
          type: data[0].type,
        })
      )
    }

    
    let stopRecording = document.querySelector('.stop')

    startRecording.addEventListener("click", () => {
      mediaRecorder.stop();
     
        startRecording.innerHTML = 'Start'
        stopRecording.setAttribute("class", "start")


      
    })


  }
  let startRecording = document.querySelector('.start')
  startRecording.addEventListener("click", () => {

    start()
    startRecording.innerHTML = 'Stop'
    startRecording.setAttribute("class", "stop")
  });


}

