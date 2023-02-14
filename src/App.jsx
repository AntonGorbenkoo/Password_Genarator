import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { 
  FormGroup, 
  FormControlLabel, 
  Slider, 
  Checkbox,
  Button
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function App() {

  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'dark'
    );

  const toggleTheme = () => {
    if(theme === 'light'){
      setTheme('dark');
    }else{
      setTheme('light');
    }
  }

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.className = theme;
  }, [theme]);

  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  
    const [password, setPassword] = useState('');
    // const [passwordLength, setPasswordLength] = useState(value)
    const [lowercase, setLowercase] = useState(true);
    const [uppercase, setUppercase] = useState(true);
    const [numbers, setNumbers] = useState(true);

    const handleChangeNum = (event) => {
      setNumbers(event.target.checked);
    } 

    const genPass = () => {

      let password = '';
      for(let i = 0; i < value; i++){
        if(uppercase){
          password += randomUpper();
        }
        if(lowercase){
          password += randomLower();
        }
         if(numbers){
          password += random(0, 9);
        }
      }

      function shuffle(array) {
        array.sort(() => Math.random() - 0.5);// функция перемешки массива
      }
      let arr = password.split('');

      shuffle(arr);

      let finishPass = arr.slice(0, value);

      setPassword(finishPass);
    }
    
    const handleClipboard = async () => {
      if (password) {
        await navigator.clipboard.writeText(password)
      }
    }
    
    
  const random = (min = 0, max = 1) => {
    return Math.floor(Math.random() * (max + 1 - min) + min)
  }

  const randomLower = () => {
    return String.fromCharCode(random(97, 122)) //abc 
  }

  const randomUpper = () => {
    return String.fromCharCode(random(65, 90)); //ABC
  }

  useEffect(()=>{
    genPass()
  }, [
    value,
    lowercase,
    uppercase,
    numbers
  ]);



  return (
    <div id="App" className={`App-${theme}`}>
        <h1>Password Generator</h1>
        <div id="output">
          <p id="outP">{password}</p>
          <Button onClick={handleClipboard} id="copyBtn"> 
            <ContentCopyIcon/>
          </Button>
          </div>
        <FormGroup id="fg">
          <FormControlLabel  control={<Checkbox defaultChecked onChange={(e) => setLowercase(e.target.checked)}/>} label="abc" />
          <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => setUppercase(e.target.checked)}/>} label="ABC" />
          <FormControlLabel control={<Checkbox defaultChecked onChange={handleChangeNum}/>} label="0-9" />
        </FormGroup>
        <Slider id="sl"
            aria-label="Temperature"
            defaultValue={1}
            // getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
            value={value}
            onChange={handleChange}
        />
        <Brightness4Icon onClick={toggleTheme}/>
    </div>
  );
}

export default App;
