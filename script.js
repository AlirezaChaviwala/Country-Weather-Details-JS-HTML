function setAttr(val1, val2, element) {
    for (var i = 0; i < val1.length; i++) {
        element.setAttribute(val1[i], val2[i]);
    }
}

let header = document.createElement('h1');
setAttr(['class'], ['jumbotron bg-transparent text-center'], header)
header.innerText = 'Rest Countries using Async/Await';
document.body.append(header);



async function getRestData() {
    try {
        var restResponse = await fetch('https://restcountries.eu/rest/v2/all');
        var restData = await restResponse.json();

        let container = document.createElement('div');
        setAttr(['class'], ['container'], container);
        document.body.append(container);

        let row = document.createElement('div');
        setAttr(['class'], ['row'], row);
        container.append(row);
        for (let i = 0; i < restData.length; i++) {
            let col = document.createElement('div');
            setAttr(['class'], ['col-lg-4 col-sm-12'], col);
            row.append(col);

            let card = document.createElement('div');
            setAttr(['class'], ['card mb-3'], card);
            col.append(card);

            let cardheader = document.createElement('div');
            setAttr(['class'], ['card-header bg-dark text-white'], cardheader);
            cardheader.innerText = `${restData[i].name}`;
            card.append(cardheader);

            let cardbody = document.createElement('div');
            setAttr(['class'], ['card-body d-flex flex-column align-items-center'], cardbody);
            card.append(cardbody);
            let flag = document.createElement('img');
            flag.src = restData[i].flag;
            setAttr(['class', 'style'], ['m-3 card-img', 'height:150px;'], flag)
            cardbody.append(flag);
            let capital = document.createElement('p');
            capital.innerText = `Capital: ${restData[i].capital}`
            cardbody.append(capital);
            let region = document.createElement('p');
            region.innerText = `Region: ${restData[i].region}`
            cardbody.append(region);
            let countryCode = document.createElement('p');
            countryCode.innerText = `Country Code: ${restData[i].alpha3Code}`
            cardbody.append(countryCode);
            let latlong = document.createElement('p');
            latlong.innerText = `Lat/Long: ${restData[i].latlng[0]}/${restData[i].latlng[1]}`
            cardbody.append(latlong);

            let butt = document.createElement('div');
            cardbody.append(butt);



            try {
                $(function() {
                    $('[data-toggle="popover"]').popover()
                })
                var weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${restData[i].capital}&units=metric&appid=9b23c74551ba0264b9587dc8837da0e3`)
                var weatherData = await weatherResponse.json();
                butt.innerHTML = `<a role="button" tabindex="0" class="btn btn-primary" data-trigger="focus" data-toggle="popover" title="Forecast: ${weatherData.weather[0].description}" data-content="Temperature: ${weatherData.main.temp}℃ | Feels like: ${weatherData.main.feels_like}℃ | Max. Temperature: ${weatherData.main.temp_max}℃ | Min. Temperature: ${weatherData.main.temp_min}℃ | Humidity: ${weatherData.main.humidity}%">Click for Weather</a>`


            } catch (err2) {
                butt.title = `Weather not available for this city`
                continue;
            }



        }
    } catch (err) {
        console.error(err);
    }
}

getRestData();