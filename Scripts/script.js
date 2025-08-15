// Load header
fetch('header.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;

        // Attach click listeners after header loads
        document.querySelectorAll('.header-nav-link').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                loadPage(page);
            });
        });
    });

// Function to load page without refresh
function loadPage(page) {
    let pageFile = '';
    if (page === 'chat') pageFile = 'chat.html';
    else if (page === 'profile') pageFile = 'Profile.html';

    if (pageFile) {
        fetch(pageFile)
            .then(res => res.text())
            .then(html => {
                // Extract only main content from fetched HTML
                const temp = document.createElement('div');
                temp.innerHTML = html;
                const main = temp.querySelector('main');
                document.getElementById('page-content').innerHTML = main.outerHTML;
            });
    }
}
