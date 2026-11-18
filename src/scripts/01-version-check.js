
        (function () {
            var here = document.documentElement.getAttribute('data-build');
            if (!here || location.protocol === 'file:') return;
            fetch(location.pathname + (location.search || ''), { cache: 'no-store' }).then(function (r) { return r.text() }).then(function (html) {
                var m = /data-build="([^"]+)"/.exec(html);
                if (!m || !m[1] || m[1] === here) return;
                var u = new URL(location.href);
                u.searchParams.set('b', m[1]);
                location.replace(u.toString());
            }).catch(function () { });
        })();
    