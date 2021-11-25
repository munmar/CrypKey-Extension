function fetchData() {
  const text = document.querySelector('article').innerText;
  const url = window.location.href;

  return {
    text: text,
    url: url
  }
}


function sendData(data) {
  const url = 'https://wagon-chat.herokuapp.com/engineering/messages';
  fetch(url, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "author": "Fake News Team",
      "content": `${data.text} on ${data.url}`,
    })
  })
}

sendData(fetchData());
