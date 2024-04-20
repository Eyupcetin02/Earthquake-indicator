import React, { useState, useEffect } from 'react';
import './navbar.css';
import axios from "axios";

interface State {
  lat: number ;
  lon: number ;
  siddet: number ;
}

const Navbar: React.FC = () => {
  const [state, setState] = useState<State>({ lat: 0, lon: 0, siddet: 0 });

  const addDataBase = async () => {
    try {
      const addData = await axios.post("http://express-app:5000/send", state);
      console.log(addData);
    } catch (error) {
      console.error('Error adding data to database:', error);
    }
  }

  const onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value 
    }));
  }

  return (
    <div className="heading">
      <div className='logo'>
        LOGO
      </div>
      <div className='input'>
        <input value={state.lat} type="text" name='lat' onChange={onChangeFunc} placeholder='enlem' />
        <input value={state.lon} type="text" name='lon' onChange={onChangeFunc} placeholder='boylam' />
        <input value={state.siddet} type="text" name='siddet' onChange={onChangeFunc} placeholder='şiddet' />
        <button onClick={addDataBase}>
          add
        </button>
      </div>
    </div>
  );
}

export default Navbar;
