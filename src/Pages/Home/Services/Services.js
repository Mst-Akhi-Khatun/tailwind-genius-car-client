import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services, setServices] = useState([]);
    useEffect( () => {
        fetch('services.json')
	    .then(res => res.json())
	    .then(data => setServices(data))
    },[])
    return (
        <div>
            <div className='text-center'>
                <p className="text-2xl font-bold text-orange-600">
                    Services
                </p>
                <h2 className="text-5xl text-semibold">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable. </p>
                <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    {
                    services.map(service => <ServiceCard key={service?._id} service = {service}></ServiceCard>)
                }
                
               </div>
            </div>
        </div>
    );
};

export default Services;