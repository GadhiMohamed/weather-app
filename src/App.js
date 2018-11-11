import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = "bda4c33250a7cfad7eaccb68b60a95b2";


class App extends React.Component {

    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        icon: undefined,
        error: undefined,
    };

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
        const data = await api_call.json();
        if (city && country && data.cod !== "404") {
            console.log(data);
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: ""
            });
        } else if (city && country && data.message === "city not found" && data.cod === "404") {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "City not found"
            });
        } else {
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: "Please enter values"
            });
        }
    }


    render() {
        return (
            <div>
                <div className='wrapper'>
                    <div className='main'>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-md-5 d-none d-md-flex title-container img-fluid'>
                                    <Titles />
                                </div>
                                <div className='col-md-7 col-xs-12 form-container ' >
                                    <Form getWeather={this.getWeather} />
                                    <br />
                                    <Weather
                                        temperature={this.state.temperature}
                                        city={this.state.city}
                                        country={this.state.country}
                                        humidity={this.state.humidity}
                                        description={this.state.description}
                                        error={this.state.error}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default App;