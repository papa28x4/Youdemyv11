import React, { Component } from 'react';
import Business from './Business';
import Design from './Design';
import Photography from './Photography'
import Development from './Development';
import Marketing from './Marketing';
import ITSoftware from './ITSoftware';
import Personal from './Personal';
import './Slider.css';

class Slider extends Component {
    render() {

        return (
          
            <div className="container-2" style={{padding: "0 100px"}}>
            
                <ul className="nav nav-tabs py-3 mb-3">
                    <li className="active"><a data-toggle="tab" className="active" href="#business">Business</a></li>
                    <li><a data-toggle="tab" href="#design">Design</a></li>
                    <li><a data-toggle="tab" href="#photography">Photography</a></li>
                    <li><a data-toggle="tab" href="#development">Development</a></li>
                    <li><a data-toggle="tab" href="#marketing">Marketing</a></li>
                    <li><a data-toggle="tab" href="#software">IT & Software</a></li>
                    <li><a data-toggle="tab" href="#personal">Personal Development</a></li>
                </ul>

                <div className="tab-content">
                    <Business />
                    <Design />
                    <Photography />
                    <Development />
                    <Marketing />
                    <ITSoftware />
                    <Personal />
                </div>
            </div>
        )
    }
}

export default Slider
