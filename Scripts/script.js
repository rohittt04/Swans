    function loadHeader() {
    fetch('header.html')
        .then(res => res.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;

            // Attach SPA navigation
            document.querySelectorAll('.header-nav-link').forEach(link => {
                link.addEventListener('click', e => {
                    e.preventDefault();
                    const page = link.getAttribute('data-page');
                    history.pushState({ page }, '', page); // change URL without reload
                    loadPage(page);
                });
            });
        });
}

    function loadPage(page) {
    let pageFile = '';
    if (page === 'chat') pageFile = 'Pages/chat.html';
    else if (page === 'profile') pageFile = 'Pages/profile.html';

    if (pageFile) {
    fetch(pageFile)
    .then(res => res.text())
    .then(html => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    const main = temp.querySelector('main');
    document.getElementById('page-content').innerHTML = main ? main.outerHTML : html;
});
}
}

    // Handle browser back/forward
    window.addEventListener('popstate', event => {
    if (event.state && event.state.page) {
    loadPage(event.state.page);
}
});

    window.addEventListener('DOMContentLoaded', () => {
    loadHeader();

    // Detect page from URL
    let path = window.location.pathname.split('/').pop();
    let page = path || 'chat';
    loadPage(page);
});
