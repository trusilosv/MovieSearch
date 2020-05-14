'use strict';

var _transform = 0;

let multiItemSlider = (function() {
    return function() {
        let
            _mainElement = document.querySelector('.slider'), // основный элемент блока
            _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
            _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
            _step = 100;

        let _transformItem = function(direction) {
            if (direction === 'right') {
                _transform -= _step;
            }
            if (direction === 'left') {
                _transform += _step;
            }
            _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
        }

        // обработчик события click для кнопок "назад" и "вперед"

        let _controlClick = function(e) {
            if (e.target.classList.contains('slider__control')) {
                e.preventDefault();
                let direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
                _transformItem(direction);

            }
        };

        let _setUpListeners = function() {
            // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
            _sliderControls.forEach(function(item) {
                item.addEventListener('click', _controlClick);
            });
        }

        // инициализация
        _setUpListeners();

        return {
            right: function() { // метод right
                _transformItem('right');

            },
            left: function() { // метод left
                _transformItem('left');
            },

        }

    }
}());