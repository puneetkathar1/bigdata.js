import React, {
  useState,
  useEffect
} from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";
import axios from 'axios'
import "./styles.css";
import Navbar from './Navbar'
import {Button} from '@material-ui/core'
import { Link, animateScroll as scroll } from "react-scroll";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


function App() {
   
  const options = [
    {
      value: "none",
      label: "None"
    },
    {
      value: "likelihood",
      label: "Likelihood"
    },
    {
      value: "relevance",
      label: "Relevance"
    },
    {
      value: "sector",
      label: "Sector"
    },
    {
      value: "topic",
      label: "Topic"
    },
    {
      value: "country",
      label: "Country"
    },
    {
      value: "region",
      label: "Region"
    },
    {
      value: "end_year",
      label: "End-Year"
    },
    {
      value: "start_year",
      label: "Start-Year"
    },
    {
      value: "pestle",
      label: "Pestle"
    },
    {
      value: "source",
      label: "Source"
    },
    {
      value: "intensity",
      label: "Intensity"
    }



  ]
  const [field, setField] = useState();
  const [options2, setoptions2] = useState([]);


  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [chartData, setChartData] = useState([]);


  async function req() {
    return axios.get('https://datanal.herokuapp.com/get', {
      params: {
        field: data,
        field2: data2,
        field3: data3
      }
    }).then(res => {
      console.log(res.data);
      setChartData(res.data);
      return (res.data)
    })
  }

  async function req2() {
    return axios.get('https://datanal.herokuapp.com/getfilter', {
      params: {
        field2: data2
      }
    }).then(res => {
      console.log(res.data);
      setoptions2(res.data);
      return (res.data)
    })
  }





    function handleChange(e){
      e.preventDefault()
      setData(e.target.value)
      console.log(e.target.value)
    }
    function handleChange2(e){
      e.preventDefault()
      setData2(e.target.value)
      console.log(e.target.value)

    }
    function handleChange3(e){
      e.preventDefault()
      setData3(e.target.value)
      console.log(e.target.value)
    }




  const changeData = async (e) => {
   if(data.length > 3 && data2.length > 3){
    e.preventDefault()
    req();
    await console.log(data)
    await console.log(data2)
    await console.log(data3.length)
  }
    else{
      alert("Select the Values!")
  }

  }



  useEffect(
    async () => {
console.log(data2)
      req2()
    }, [data2]
  );



  const outerRadius = 380
  const innerRadius = 200



  const margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
  };

  const width = 2 * outerRadius + margin.left + margin.right;
  const height = 2 * outerRadius + margin.top + margin.bottom;

 

  useEffect(() => {
    drawChart();
  }, [chartData]);

  function drawChart() {

    const sum = chartData.reduce(function (s, a) {
      return s + a.value;
  }, 0);

     const colorScale = d3
    .scaleSequential()
    .interpolator(d3.interpolateCool)
    .domain([0, chartData.length]);

    // Remove the old svg
    d3.select('#pie-container')
      .select('svg')
      .remove();

    // Create new svg
    const svg = d3
      .select('#pie-container')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arcGenerator = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const pieGenerator = d3
      .pie()
      .padAngle(0)
      .value((d) => d.value);

    const arc = svg
      .selectAll()
      .data(pieGenerator(chartData))
      .enter();

    // Append arcs
    arc
      .append('path')
      .attr('d', arcGenerator)
      .style('fill', (_, i) => colorScale(i))
      .style('stroke', '#ffffff')
      .style('stroke-width', 0);

    // Append text labels
    arc
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text((d) => d.data.label +" "+"("+Math.round(100*d.data.value/sum) + "%" +")")
      .style('fill', (_, i) => "#ffffff")
      .attr('transform', (d) => {
        const [x, y] = arcGenerator.centroid(d);
        return `translate(${x}, ${y})`;
      });
  }



  return (
    <div className = "App" >
      <Navbar />
      
     
     <div className = "option" >
     <FormControl variant="outlined">
        
     <InputLabel id="demo-simple-select-outlined-label">Field</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={data}
          onChange={handleChange}
          label="Field"
          required
        >
            {
        options.map((user, i) =>
            <MenuItem value={options[i].value}>{options[i].label}</MenuItem>)
    }
        </Select>
        <br />
        <div  className="filter"><FormControl style={{marginRight:"10px"}} variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={data2}
          label="Filter"
          required
          onChange={handleChange2}
        >
            {
        options.map((user, i) =>
            <MenuItem value={options[i].value}>{options[i].label}</MenuItem>)
    }
        </Select></FormControl>
        <br />
        <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={data3}
          label="Filter"
          onChange={handleChange3}
        >
        <MenuItem value="none">None</MenuItem>
            {
        options2.map((user, i) =>
        
            <MenuItem value={options2[i].label}>{options2[i].label}</MenuItem>)
    }
        </Select></FormControl></div>
        <Link
    activeClass="active"
    to="pie-container"
    spy={true}
    smooth={true}
    offset={50}
    duration={500}
><Button onClick = {
      (e) => changeData(e)
    } type="submit" variant="contained" color="primary" style={{marginTop:"50px", marginLeft:"40%", marginRight:"40%", padding: "0"}} disableElevation>
Submit
</Button></Link>
      </FormControl> </div> 
 

   
 <div >

    <div id = "pie-container" / > ;
    </div>
     </div>
  );
}

export default App;