import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/order?email=${user?.email}`)
        .then((res) => res.json())
        .then(data => setOrders(data))
    }, [user?.email])
  
    const handleDelete = (id) => {
      const proceed = window.confirm('Are your sure, You cancel this order');
      if (proceed) {
          fetch(`http://localhost:5000/order/${id}`, {
              method: 'DELETE'
              })
              .then((res) => res.json())
              .then((data) => {
              console.log(data);
              if (data.deletedCount > 0) {
                alert('user deleted succesfully');
                const remainingUsers = orders.filter(odr =>odr._id !==id);
                
                setOrders(remainingUsers)
            }
        })
      } 
      }

  
  const handleStatusUpdate = (id) => {
    fetch(`http://localhost:5000/order/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({status: 'Approved'})
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.modifiedCount > 0) {
            const remaining = orders.filter(odr => odr._id !== id);
            const approving = orders.find(odr => odr._id === id);
            approving.status = 'Approved'

            const newOrder = [approving, ...remaining ];
            setOrders(newOrder);
          }
  })
  }
    return (
        <div>
            <h2 className="text-5xl">You Have {orders.length} Orders</h2>
            <div className="overflow-x-auto w-full">
  <table className="table w-full">
   
    <thead>
      <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    
    {
     orders.map(order => <OrderRow
         key={order?._id}
       order={order}
       handleDelete={handleDelete}
       handleStatusUpdate={handleStatusUpdate}
     ></OrderRow>)                       
    }
     
      
    </tbody>
    
  </table>
</div>
        </div>
    );
};

export default Orders;