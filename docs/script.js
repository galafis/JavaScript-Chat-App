document.addEventListener('DOMContentLoaded', function() {
    fetch('../README.md')
        .then(response => response.text())
        .then(markdown => {
            const converter = new showdown.Converter();
            const html = converter.makeHtml(markdown);
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => console.error('Error fetching README.md:', error));
});
