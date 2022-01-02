// function fetches data from current webpage by looking for article tags.
function fetchData() {
  const text = document.querySelector('article').innerText;
  const url = window.location.href;
  console.log(text)
  return {
    text: text,
    url: url
  }
}
// function sends data to back-end api which then runs through model.
function sendData(data) {
  const url = 'https://detect-fake-news-api-ztj5atks2q-ew.a.run.app/predict_all_post';
  fetch(url, {
    method: 'POST',
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "author": "Fake News Team",
      "content": `${data.text}`,
      "url": `${data.url}`
    })
    // send result via chrome message passing.
  }).then(res => res.json())
    .then(data => {
      chrome.runtime.sendMessage(data, function(receiversResponse){
        console.log('Popup working!')
      })
  })
}

sendData(fetchData());
