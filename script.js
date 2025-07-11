document.addEventListener('DOMContentLoaded', function() {
    function loadHeader() {
        fetch('header.html')
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.text();
            })
            .then(function(headerHtml) {
                var headerPlaceholder = document.getElementById('header-placeholder');

                if (headerPlaceholder) {
                    headerPlaceholder.innerHTML = headerHtml;

                    var currentPage = window.location.pathname.split('/').pop();

                    document.querySelectorAll('.header-nav-link').forEach(function(link) {
                        link.classList.remove('active');
                    });

                    if (currentPage.includes('profile.html')) {
                        document.getElementById('nav-profile')?.classList.add('active');
                    } else if (currentPage.includes('index.html') || currentPage === '') {
                        document.getElementById('nav-matches')?.classList.add('active');
                    }

                } else {
                    console.error("Error: Header placeholder not found. Make sure you have a <div id='header-placeholder'> in your HTML.");
                }
            })
            .catch(function(error) {
                console.error('There was a problem loading the header:', error);
            });
    }

    loadHeader();
});
 