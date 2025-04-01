document.getElementById('dataForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const message = document.getElementById('message').value;
  
    const res = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
  
    if (res.ok) {
      loadMessages();
      document.getElementById('message').value = '';
    }
  });
  
  async function loadMessages() {
    const res = await fetch('/api/data');
    const data = await res.json();
    const list = document.getElementById('messageList');
    list.innerHTML = '';
    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.message;
      list.appendChild(li);
    });
  }
  
  loadMessages();
  