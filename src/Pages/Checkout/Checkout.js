import React from 'react';
import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const { _id, title, price } = useLoaderData();
    const { user } = useContext(AuthContext);

    const handlePlaceOrder = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregisterd';
        const phone = form.phone.value;
        const massage = form.massage.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            massage
        }

        
        if (phone.length < 11) {
            alert('Your phone number shoud be 11 charecter')
        }
        fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                form.reset()
            })
            .catch(er => console.error(er))
    }
    return (
        <div>
            
            <form onSubmit={handlePlaceOrder}>
                <h2 className='text-4xl'>You are about to: {title}</h2>
                <h4 className='text-3xl'>price: { price}</h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <input name='firstName' type="text" placeholder="First Name" className="input input-bordered w-full input-borderd" />
                    <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered w-full input-borderd" />
                    <input name='phone' type="text" placeholder="Your Phone" className="input input-bordered w-full input-borderd" required />
                    <input name='email' type="text" placeholder="Your Email" defaultValue={user?.email} className="input input-bordered w-full input-borderd"  readOnly/>
                </div>
                <textarea name='massage' className="textarea textarea-bordered h-24 w-full" placeholder="Your Massage" required></textarea>
            <input className='btn' type="submit"  value='Place Your Order'/>
            </form> 
        </div>
    );
};

export default Checkout;