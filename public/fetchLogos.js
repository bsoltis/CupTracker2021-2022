function fetchTeamLogoSVGSymbols() {
    // Adapted from https://css-tricks.com/ajaxing-svg-sprite/
    const ajax = new XMLHttpRequest();
    ajax.open(
        'GET',
        'https://www-league.nhlstatic.com/images/logos/team-sprites/20202021.svg',
        true
    );
    ajax.send();
    ajax.onload = () => {
        const div = document.createElement('div');
        div.style.display = 'none';
        div.innerHTML = ajax.responseText;
        document.body.insertBefore(div, document.body.childNodes[0]);
    };
}

fetchTeamLogoSVGSymbols()