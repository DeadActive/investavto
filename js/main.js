const setIntroSize = () => {
    const windowHeight = $(window).height()

    if (windowHeight < 900) {
        $('.intro').height($(window).height() - $('.header').height())
        $('.intro-cover').height($(window).height() - $('.header').height())
    } else {
        $('.intro').height(780)
        $('.intro-cover').height(780)
    }
}

const selectCountry = event => {
    const feature = features[event.target.dataset.country]
    
    feature.setStyle({
        fill: true,
        fillColor: '#26cf6a',
        fillOpacity: 0.5
    })
}

$(document).ready(() => {
    //get location
    geoip2.city(
        (location) => {
            $('#location').text(location.city.names.ru)
        },
        (error) => {
            $('#location').text('Москва')
        }
    )

    setIntroSize()

    $('.news-carousel').owlCarousel({
        loop:true,
        margin:30,
        responsiveClass:true,
        nav: false,
        responsive:{ 
            0:{
                items:1,
            },
            768:{
                items:2,
                loop: false,
            },
            992:{
                items:3,
                loop:false
            }
        }
    })
})

$(window).resize(() => {
    //debounce
    setTimeout(() => {
        setIntroSize()
    }, 0)
})

let map = L.map('map', {
    center: [45, 80],
    zoom: 3,
    scrollWheelZoom: false,
    zoomControl: false
});

$('.leaflet-control-attribution').hide()

const geoJsonPath = '/js/countries.json'
const geoStyles = {
    stroke: true,
    color: '#26cf6a',
    fill: false
}
const features = {}

L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    {
        maxZoom: 3,
        minZoom: 3
    }
).addTo(map)

$.getJSON(geoJsonPath, (data) => {
    L.geoJson(data, {
        style: geoStyles,
        onEachFeature: (feature, layer) => {
            features[feature.properties.name] = layer
        }
    }).addTo(map);
})

//events

$('.map-button').hover(event => selectCountry(event), () => {
    Object.values(features).forEach(feature => {
        feature.setStyle(geoStyles)
    })
})