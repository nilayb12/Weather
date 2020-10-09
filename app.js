window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription=document.querySelector('.temperature-description');
    let temperatureDegree=document.querySelector('.temperature-degree');
    let locationTimezone=document.querySelector('.location-timezone');
    let weatherIcon=document.querySelector('.weather-icon');
    let temperatureSection=document.querySelector('.degree-section');
    let temperatureSpan=document.querySelector('.degree-section span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long=position.coords.longitude;
            lat=position.coords.latitude;
            const proxy='https://cors-anywhere.herokuapp.com/';
            const api= `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1e2bf0500cb7bf36efb799b9ba23e7d9&units=imperial`;

            fetch(api)
            .then(response=>{
                return response.json();
            })
            .then(data=>{
                console.log(data);
                const {temp}=data.main;
                const {main, description, icon}=data.weather[0];
                
                temperatureDegree.textContent=temp;
                temperatureDescription.textContent=main+' - '+description;
                locationTimezone.textContent=data.sys.country+'/'+data.name;

                var iconUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
                weatherIcon.innerHTML="<img src='"+iconUrl+"'>";
                
                temperatureSection.addEventListener('click',()=>{
                    if(temperatureSpan.textContent==="F"){
                        temperatureSpan.textContent="C";
                        temperatureDegree.textContent=(temp-32)*(5/9);
                    } else {
                        temperatureSpan.textContent="F";
                        temperatureDegree.textContent=temp;
                    }
                });
            });
        });
    }
});
