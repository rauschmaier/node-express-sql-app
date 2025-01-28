window.onload = function() {
   // Fetch-Request, um den Benutzernamen vom Server zu erhalten
   fetch('/get-username')
   .then(response => {
     if (!response.ok) {
       throw new Error('Benutzer nicht angemeldet');
     }
     return response.json();
   })
   .then(data => {
     // Setze den Benutzernamen in das HTML-Element
     document.getElementById('username').textContent = data.username;
   })
   .catch(error => {
     document.getElementById('username').textContent = 'Unbekannt';
     console.error('Fehler:', error);
   });
}
