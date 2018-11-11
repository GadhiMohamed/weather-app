import React from 'react';

const Form = props => (
    <div className='text-center'>
        <form onSubmit={props.getWeather}>
            <br />
            <input type='text' name='city' placeholder='city' />
            <input type='text' name='country' placeholder='country' />
            <button>Get Weather</button>
        </form>
    </div>
);
export default Form;