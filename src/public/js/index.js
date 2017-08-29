(function (global, dom) {
  function init() {
    const $API_ROOT = '//localhost/api';
    const routeHash = () => window.location.hash ? window.location.hash.slice(1) : '';

    fetch(`${$API_ROOT}${routeHash()}`)
      .then(data => data.text())
      .then(text => {
        const h1 = (text) => () => {
          const h = document.createElement('h1');
          h.innerText = text;
          return h;
        }
        render(h1(text), document.getElementById('root'));
      });
  }
  function render(what, where) {
    if (!what || !where) return;

    where.appendChild(what());
  }
  dom.addEventListener('DOMContentLoaded', init);
})(window, document)
