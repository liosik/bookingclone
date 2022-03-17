import {useState} from "react";
import {Slider} from "@mui/material";

function RangeSlider({setFilter}) {
    const [value, setValue] = useState([0, 200])

    function valuetext(value) {
        return `${value}`;
    }

    function handleChange(event) {
        setValue(event.target.value)
        setFilter(value)
    }


    return (
        <div className='d-flex column' style={{display: 'flex', width: '199px'}}>
            <h3>Price Range</h3>
            <Slider
                getAriaLabel={() => 'Rating Range'}
                value={value}
                min={0}
                max={200}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                color="secondary"
            />
        </div>

    );
}

export default RangeSlider;