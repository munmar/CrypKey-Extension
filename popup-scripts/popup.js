// Hides analyze button
function hide_button() {
  let btn = document.querySelector(".box")
  btn.style.visibility = 'hidden'
}
// Make prediction element appear
function prediction_appear() {
  let preddiv = document.querySelector(".box1")
  preddiv.style.visibility = 'visible'
}
// changes to loader element once analyze clicked.
function loader_change() {
  document.getElementById("loader").className =
    document.getElementById("loader").className.replace
      (/(?:^|\s)active(?!\S)/g, 'disabled')
}

// When analyze pressed, send-data to content script, and execute hide_button and prediction_appear functions.
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
// listen for prediction from content-script and add to inner HTML by using chrome message passing.
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  document.getElementById('prediction').innerHTML = parseFloat(parseFloat(message['mean_proba']*100).toFixed(1)) + '%'
  loader_change()
  console.log(message)
  sendResponse()
})

