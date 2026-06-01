(function () {
    const NAV_LINKS = [
        { href: 'dashboard.html', label: 'Dashboard', pageId: 'dashboard' },
        { href: 'methodology.html', label: 'Methodology', pageId: 'methodology' },
        { href: 'background.html', label: 'Background', pageId: 'background' },
    ];

    const CTA = {
        href: 'index.html#explorer',
        label: 'Start Exploring →',
        pageId: 'index',
    };

    function getCurrentPageId() {
        const fromBody = document.body && document.body.dataset.page;
        if (fromBody) return fromBody;

        const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
        if (file === '' || file === 'index.html') return 'index';
        if (file === 'dashboard.html') return 'dashboard';
        if (file === 'explain.html') return 'explain';
        if (file === 'methodology.html') return 'methodology';
        if (file === 'background.html') return 'background';
        return file.replace(/\.html$/, '');
    }

    function isNarrowLayout() {
        return document.body.classList.contains('layout-narrow');
    }

    function renderTopNav(currentPageId) {
        const narrowClass = isNarrowLayout() ? ' nav-inner--narrow' : '';
        const ctaHref = currentPageId === 'index' ? '#explorer' : CTA.href;

        const linksHtml = NAV_LINKS.map(function (link) {
            const isActive = link.pageId === currentPageId;
            const activeClass = isActive ? ' nav-lk--active' : '';
            const aria = isActive ? ' aria-current="page"' : '';
            return (
                '<a href="' +
                link.href +
                '" class="nav-lk' +
                activeClass +
                '"' +
                aria +
                '>' +
                link.label +
                '</a>'
            );
        }).join('\n            ');

        return (
            '<nav class="top-nav" aria-label="Site">' +
            '<div class="nav-inner' +
            narrowClass +
            '">' +
            '<a href="index.html" class="nav-logo" aria-label="Go to Heat &amp; Health NL homepage">' +
            '<img src="favicon.svg" alt="" class="nav-logo-img">' +
            '<span>Heat &amp; Health NL</span>' +
            '</a>' +
            '<div class="nav-links">' +
            linksHtml +
            '<a href="' +
            ctaHref +
            '" class="nav-btn">' +
            CTA.label +
            '</a>' +
            '</div>' +
            '</div>' +
            '</nav>'
        );
    }

    function initNav() {
        const currentPageId = getCurrentPageId();
        const mount = document.querySelector('[data-nav-mount]');
        const html = renderTopNav(currentPageId);

        if (mount) {
            mount.outerHTML = html;
        } else {
            document.body.insertAdjacentHTML('afterbegin', html);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNav);
    } else {
        initNav();
    }
})();
