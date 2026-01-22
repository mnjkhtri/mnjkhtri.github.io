(function () {
    const rootPath = `${window.location.origin}`;

    function loadFragment(targetId, fragmentPath, onload) {
        const host = document.getElementById(targetId);
        if (!host) return;
        fetch(`${rootPath}/${fragmentPath}`)
            .then((res) => {
                if (!res.ok) throw new Error(res.statusText);
                return res.text();
            })
            .then((html) => {
                host.innerHTML = html;
                if (onload) onload(host);
            })
            .catch((err) => {
                console.error(`Failed to load ${fragmentPath}:`, err);
            });
    }

    loadFragment('site-header', 'header.html', (root) => {
        const segments = window.location.pathname.replace(/^\/+/, '').split('/');
        const section = segments[0] || 'index.html';
        root.querySelectorAll('.nav-links a').forEach((link) => {
            const href = link.getAttribute('href').replace(/^\/+/, '');
            const linkSection = href.split('/')[0] || 'index.html';
            const isHome = section === '' || section === 'index.html';
            if ((isHome && linkSection === 'index.html') || linkSection === section) {
                link.classList.add('active');
            }
        });
    });

    loadFragment('site-footer', 'footer.html');
})();
