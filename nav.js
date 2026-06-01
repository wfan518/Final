(function () {
    const NAV_LINKS = [
        { href: 'dashboard.html', label: 'Dashboard', pageId: 'dashboard' },
        { href: 'methodology.html', label: 'Methodology', pageId: 'methodology' },
        { href: 'background.html', label: 'Background', pageId: 'background' },
        { href: 'sources.html', label: 'Sources', pageId: 'sources' },
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
        if (file === 'methodology.html') return 'methodology';
        if (file === 'background.html') return 'background';
        return file.replace(/\.html$/, '');
    }

    function ensureNavStyles() {
        if (document.getElementById('shared-nav-styles')) return;

        const style = document.createElement('style');
        style.id = 'shared-nav-styles';
        style.textContent = `
            nav.top-nav {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                height: 58px;
                background: #fdfff7 !important;
                backdrop-filter: saturate(1.2) blur(16px);
                border-bottom: 1px solid rgba(58,46,57,.18);
                z-index: 1000;
                display: flex;
                align-items: center;
                box-shadow: 0 1px 2px rgba(58,46,57,.08);
            }
            nav.top-nav .nav-inner {
                max-width: 1180px !important;
                margin: 0 auto !important;
                padding: 0 32px !important;
                width: 100% !important;
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
            }
            nav.top-nav .nav-logo {
                display: inline-flex;
                align-items: center;
                gap: 10px;
                font-family: var(--serif);
                font-size: 1.05rem;
                font-weight: 700;
                letter-spacing: -0.015em;
                text-transform: none;
                color: var(--ink);
                text-decoration: none;
                cursor: pointer;
                transition: color .18s ease;
            }
            nav.top-nav .nav-logo:hover { color: var(--accent-strong); }
            nav.top-nav .nav-logo-img {
                width: 26px;
                height: 26px;
                display: block;
                flex-shrink: 0;
                transition: transform .18s ease;
            }
            nav.top-nav .nav-logo:hover .nav-logo-img { transform: scale(1.06); }
            nav.top-nav .nav-links {
                display: flex !important;
                gap: 20px !important;
                align-items: center !important;
            }
            nav.top-nav .nav-lk {
                font-family: var(--mono);
                font-size: 0.65rem;
                font-weight: 600;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                color: var(--light);
                text-decoration: none;
                transition: .2s;
            }
            nav.top-nav .nav-lk:hover { color: var(--ink); }
            nav.top-nav .nav-lk--active {
                color: var(--accent-strong);
                box-shadow: inset 0 -2px 0 var(--accent);
            }
            nav.top-nav .nav-lk--active:hover { color: var(--accent-strong); }
            nav.top-nav .nav-btn {
                font-family: var(--mono);
                font-size: 0.65rem;
                font-weight: 600;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                background: var(--ink);
                color: var(--paper);
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 999px;
                transition: .2s;
                box-shadow: 0 1px 2px rgba(58,46,57,.08);
            }
            nav.top-nav .nav-btn:hover {
                background: var(--accent-strong);
                transform: translateY(-1px);
            }
            @media (max-width: 680px) {
                nav.top-nav .nav-inner { padding: 0 20px !important; }
                nav.top-nav .nav-links { gap: 12px !important; }
                nav.top-nav .nav-lk { display: none !important; }
            }
        `;
        document.head.appendChild(style);
    }

    function renderTopNav(currentPageId) {
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
            '<div class="nav-inner">' +
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
        ensureNavStyles();
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
