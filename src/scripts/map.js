   function init(){
        // Создание карты.
        var myMap = new ymaps.Map("map", {
            center: [55.751123, 37.612779],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 15,
            controls: []
        });

        var myPlacemark = new ymaps.Placemark([55.751123, 37.612779], {}, {
            iconLayout: 'default#image',
            iconImageHref: '../src/img/map-pin.png',
            iconImageSize: [58, 73],
            iconImageOffset: [-3, -42]
        });

        myMap.geoObjects.add(myPlacemark)

        myMap.behaviors.disable("scrollZoom")
    }

    ymaps.ready(init)