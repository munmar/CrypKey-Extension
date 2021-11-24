function hide_button() {
  button = document.getElementById('send-data').style.visibility = 'hidden'
}

function listenClick() {
  const button = document.getElementById('send-data');
  button.addEventListener('click',() => {
    chrome.tabs.executeScript({
      file: 'scripts/send-data.js'
    });
    hide_button(button)
  })
}


listenClick();
