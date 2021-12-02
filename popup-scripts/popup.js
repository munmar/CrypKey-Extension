function hide_button() {
  var btn = document.querySelector(".box")
  btn.style.visibility = 'hidden'
}
function prediction_appear() {
  var preddiv = document.querySelector(".box1")
  preddiv.style.visibility = 'visible'
}
function loader_change() {
  document.getElementById("loader").className =
    document.getElementById("loader").className.replace
      (/(?:^|\s)active(?!\S)/g, 'disabled')
}


function listenClick() {
  const button = document.getElementById('send-data');
  button.addEventListener('click',() => {
    chrome.tabs.executeScript({
      file: 'content-scripts/send-data.js'
    });
    hide_button(button)
    prediction_appear()
  })
}


listenClick();
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  document.getElementById('prediction').innerHTML = parseFloat(parseFloat(message['mean_proba']*100).toFixed(1)) + '%'
  loader_change()
  console.log(message)
  sendResponse()
})



// function gauge() {
//   const changeNum = () => {
//     const randomNum = Math.round(Math.random() * 100);
//     const degrees = Math.round((randomNum / 100) * 180);
//     const root = document.querySelector(":root");
//     let title = document.querySelector(".loader__title");
//     let currentNumber = title.innerText;
//     setInterval(() => {
//       if (currentNumber < randomNum) {
//         currentNumber++;
//         title.innerText = currentNumber;
//       } else if (currentNumber > randomNum) {
//         currentNumber--;
//         title.innerText = currentNumber;
//       }
//     }, 3);
//     root.style.setProperty("--rotation", `${degrees}deg`);
//   };
//   setInterval(() => {
//     changeNum();
//   }, 2000);
// }
