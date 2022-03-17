import {useState} from "react";
import {Slider} from "@mui/material";

function RangeSlider({setFilter}) {
    const [value, setValue] = useState([0, 5])

    function valuetext(value) {
        return `${value}`;
    }

    function handleChange(event) {
        setValue(event.target.value)
        setFilter(value)
    }


    return (
        <div style={{display: 'flex', width: '199px'}}>
            <Slider
                getAriaLabel={() => 'Rating Range'}
                value={value}
                min={0}
                max={5}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                color="secondary"
            />
        </div>

    );
}

export default RangeSlider;