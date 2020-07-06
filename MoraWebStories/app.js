

/*-------------------------------------------------------------------------CAROUSEL-----------------------------------------------------------------*/
/*Funcion que crea el carousel de fotos con sus elementos*/

function Carousel(options) {

    /*id= carousel carga todos los elementos en el html*/

    var element = document.getElementById(options.elem || 'carousel'),
        interval = options.interval || 8000,

        btnPlayText = options.btnPlayText || '&#9658',
        btnStopText = options.btnStopText || '&#10074 &#10074',

        arrNextText = options.arrNextText || '&rsaquo;',
        arrPrevText = options.arrPrevText || '&lsaquo;',

        crslClass = 'js-Carousel',
        crslArrowPrevClass = 'js-Carousel-arrowPrev',
        crslArrowNextClass = 'js-Carousel-arrowNext',
        crslDotsClass = 'js-Carousel-dots',
        crslButtonStopClass = 'js-Carousel-btnStop',
        crslButtonPlayClass = 'js-Carousel-btnPlay',

        count = element.querySelectorAll('li').length,
        current = 0,
        cycle = null;

    /**Renderizar para contenido dinámico si hay más de 1 imagen */
    if (count > 1) {
        render();
    }


    /* Renderizar lo elemenentos*/

    function render() {
        var actions = {
            dots: function () {
                return showDots();
            },
            arrows: function () {
                return showArrows();
            },
            buttons: function () {
                return showButtons();
            },
            autoplay: function () {
                return play();
            },
            infinite: function () {
                return moveItem(count - 1, -element.offsetWidth + 'px', 'afterBegin');
            },
            initial: function () {
                var initial = 0 || (options.initial >= count) ? count : options.initial;
                return show(initial);
            }
        };

        for (var key in actions) {
            if (options.hasOwnProperty(key) && options[key]) {
                actions[key]();
            }
        }
    }

    function moveItem(i, marginLeft, position) {
        var itemToMove = element.querySelectorAll('.' + crslClass + ' > ul li')[i];
        itemToMove.style.marginLeft = marginLeft;

        element.querySelector('.' + crslClass + ' > ul')
            .removeChild(itemToMove);

        element.querySelector('.' + crslClass + ' > ul')
            .insertAdjacentHTML(position, itemToMove.outerHTML);
    }

    /*Crea los dots*/
    function showDots() {
        var dotContainer = document.createElement('ul');
        dotContainer.classList.add(crslDotsClass);
        dotContainer.addEventListener('click', scrollToImage.bind(this));

        for (var i = 0; i < count; i++) {
            var dotElement = document.createElement('li');
            dotElement.setAttribute('data-position', i);

            dotContainer.appendChild(dotElement);
        }

        element.appendChild(dotContainer);
        currentDot();
    }


    function scrollToImage(e) {
        if (e.target.tagName === 'LI') {
            show(e.target.getAttribute('data-position'));

            resetInterval();
        }
    }

    /* Selecciona el dot correspondiente con el item actual. */

    function currentDot() {
        [].forEach.call(element.querySelectorAll('.' + crslDotsClass + ' li'), function (item) {
            item.classList.remove('is-active');
        });

        element.querySelectorAll('.' + crslDotsClass + ' li')[current].classList.add('is-active');
    }


    /* Creación de botones*/

    function showButtons() {
        var buttonPlay = document.createElement('button');
        buttonPlay.innerHTML = btnPlayText;
        buttonPlay.classList.add(crslButtonPlayClass);
        buttonPlay.addEventListener('click', play);

        var buttonStop = document.createElement('button');
        buttonStop.innerHTML = btnStopText;
        buttonStop.classList.add(crslButtonStopClass);
        buttonStop.addEventListener('click', stop);

        element.appendChild(buttonPlay);
        element.appendChild(buttonStop);
    }

    function showArrows() {
        var buttonPrev = document.createElement('button');
        buttonPrev.innerHTML = arrPrevText;
        buttonPrev.classList.add(crslArrowPrevClass);
        buttonPrev.addEventListener('click', showPrev);

        var buttonNext = document.createElement('button');
        buttonNext.innerHTML = arrNextText;
        buttonNext.classList.add(crslArrowNextClass);
        buttonNext.addEventListener('click', showNext);

        element.appendChild(buttonPrev);
        element.appendChild(buttonNext);
    }

    /*Animacion para atras*/
    function animatePrev(item) {
        item.style.marginLeft = '';

    }

    /*Animacion para adelante*/
    function animateNext(item) {
        item.style.marginLeft = -element.offsetWidth + 'px';

    }

    /*Muestra el item que se seleccione en los dots*/
    function show(slide) {
        var m = current - slide;

        if (m < 0) {
            moveBy(-m, showNext);

        } else {
            moveBy(m, showPrev);

        }
    }

    /*Selecciona el index al que se mueve por medio de los dots */
    function moveBy(m, direction) {
        for (var i = 0; i < m; i++) {
            direction();
        }
    }

    /*Movimiento hacia atras.*/
    function showPrev() {
        if (options.infinite) {
            showPrevInfinite();
        } else {
            showPrevLinear();
        }

        resetInterval();
        again();

    }

    function showPrevInfinite() {
        animatePrev(element.querySelectorAll('.' + crslClass + ' > ul li')[0]);
        moveItem(count - 1, -element.offsetWidth + 'px', 'afterBegin');

        adjustCurrent(-1);

    }

    /*Movimiento hacia adelante.*/

    function showNext() {
        if (options.infinite) {
            showNextInfinite();

        } else {
            showNextLinear();

        }

        resetInterval();

        /*Hace reset a la barra */
        again();

    }

    function showNextInfinite() {

        animateNext(element.querySelectorAll('.' + crslClass + ' > ul li')[1]);
        moveItem(0, '', 'beforeEnd');

        adjustCurrent(1);
    }

    /*Selecciona el dot lo que hace que cambie el color*/
    function adjustCurrent(val) {
        current += val;

        switch (current) {
            case -1:
                current = count - 1;
                break;
            case count:
                current = 0;
                break;
            default:
                current = current;
        }

        if (options.dots) {
            currentDot();
        }
    }

    /*Reset del intervalo.*/
    function resetInterval() {
        if (cycle) {
            stop();
            play();
        }
    }

    /*Empieza el auto-play y la barra*/
    function play() {
        if (cycle) {
            return;

        }
        cycle = setInterval(showNext.bind(this), interval);
        move();
    }

    /*Detiene el auto-play y la barra*/
    function stop() {
        clearInterval(cycle);
        cycle = null;
        pause();

    }
}

/*-------------------------------------------------------------------------BAR---------------------------------------------------------------------*/
var interval2
var width = 0;


function move() {
    var elem = document.getElementById("bar");

    clearInterval(interval2);
    interval2 = setInterval(frame, 78);

    function frame() {

        if (width >= 100) {
            width = 0;

        } else {
            width++;
            elem.style.width = width + '%';

        }
    }
}

/*reinicia la barra*/
function again() {

    width = 0;

}

/*Detiene la barra*/
function pause() {
    clearInterval(interval2);
}
