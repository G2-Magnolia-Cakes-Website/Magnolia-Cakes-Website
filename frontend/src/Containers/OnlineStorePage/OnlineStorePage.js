import React, { useState, useEffect } from 'react';
import './OnlineStore.css';

function OnlineStore({ api }) {
    const [cakes, setCakes] = useState([]);

    useEffect(() => {
      // Fetch cakes data from the API
      const fetchCakes = async () => {
        try {
          const response = await api.get("api/cakes/");
          setCakes(response.data);
        } catch (error) {
          console.error("Error fetching cakes:", error);
        }
      };
  
      fetchCakes();
    }, [api]);
  
    return (
      <div>
        <div className="cakes-list">
          {cakes.map((cake) => (
            <div key={cake.id} className="cake-item">
              <h3>{cake.name}</h3>
              <img
                src={cake.image}
                alt={cake.name}
                className="image" 
              />
              <br></br>
              <p>Price: ${cake.price}</p>
              <p>Flavour: {cake.flavor}</p>
              <p>Description: {cake.description}</p>

            </div>
          ))}
        </div>
      </div>
    );
}

export default OnlineStore;
