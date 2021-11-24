function fetchData() {
  const title = document.querySelector('article').innerText;
  const url = window.location.href;

  return {
    title: title,
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
      "content": `${data.title} on ${data.url}`
    })
  })
}

sendData(fetchData());
