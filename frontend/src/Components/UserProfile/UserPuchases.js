import './ProfilePage.css';
import './UserPurchases.css';
import Form from "./ProfileForm"
import React, { useEffect, useState } from "react";

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.toLocaleString('en', { day: 'numeric' });
    const month = date.toLocaleString('en', { month: 'long' });
    const year = date.toLocaleString('en', { year: 'numeric' });
    return `${day} ${month} ${year}`;
}

function formatTime(timestamp) {
    const time = new Date(timestamp);
    const hour = time.getHours();
    const minute = time.getMinutes().toString().padStart(2, '0');
    const period = hour >= 12 ? 'pm' : 'am';
    const formattedHour = (hour % 12 || 12).toString();
    return `${formattedHour}:${minute}${period}`;
}

function UserPurchases({ api }) {
    const [purchases, setPurchases] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/api/user/get/purchases/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    },
                    withCredentials: true,
                });

                if (res.status === 200) {
                    setPurchases(res.data);
                    displayPurchaseDetails(res.data);
                } else {
                    console.log(res);
                }
            } catch (err) {
                console.log(err);
                console.log(err.response.data);
            }
        };

        const displayPurchaseDetails = async (purchases) => {
            if (purchases.length === 0) {
                return; // If purchases is empty, exit the function
            }

            const fetchVideoDetails = async (videoId) => {
                try {
                    const res = await api.get(`/api/videos/${videoId}/`);

                    if (res.status === 200) {
                        return res.data; // Return the video details
                    } else {
                        console.log(res);
                        return null; // Return null if there's an error
                    }
                } catch (err) {
                    console.log(err);
                    console.log(err.response.data);
                    return null; // Return null if there's an error
                }
            };

            const fetchCakeDetails = async (cakeId) => {
                try {
                    const res = await api.get(`/api/cakes/${cakeId}/`);

                    if (res.status === 200) {
                        return res.data; // Return the cake details
                    } else {
                        console.log(res);
                        return null; // Return null if there's an error
                    }
                } catch (err) {
                    console.log(err);
                    console.log(err.response.data);
                    return null; // Return null if there's an error
                }
            };

            const purchasesWithDetails = await Promise.all(
                purchases.map(async (purchase) => {
                    const videoDetailsPromises = purchase.videos.map((videoId) => fetchVideoDetails(videoId));
                    const cakeDetailsPromises = purchase.cakes.map((cakeId) => fetchCakeDetails(cakeId));

                    const videoDetails = await Promise.all(videoDetailsPromises);
                    const cakeDetails = await Promise.all(cakeDetailsPromises);

                    const purchaseWithDetails = {
                        ...purchase,
                        videos: videoDetails.filter((video) => video !== null),
                        cakes: cakeDetails.filter((cake) => cake !== null),
                    };

                    return purchaseWithDetails;
                })
            );

            console.log('Purchases with Details:', purchasesWithDetails);

            setPurchases(purchasesWithDetails);
        };

        fetchData();
    }, []);

    return (
        <div>
          <div className='profile-welcome'>Your Purchases</div>
          <table className='purchase-table'>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Items</th>
                <th>Price</th>
                <th>Amount Paid</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map(purchase => (
                <tr key={purchase.id}>
                  <td>{purchase.id}</td>
                  <td>
                    {purchase.videos.map(video => (
                      <div key={video.id} className='item-row'>
                        <span className='item-name'>{video.title}</span>
                      </div>
                    ))}
                    {purchase.cakes.map(cake => (
                      <div key={cake.id} className='item-row'>
                        <span className='item-name'>{cake.name}</span>
                      </div>
                    ))}
                  </td>
                  <td>
                    {purchase.videos.map(video => (
                      <div key={video.id} className='item-row'>
                        <span className='item-price'>${video.price}</span>
                      </div>
                    ))}
                    {purchase.cakes.map(cake => (
                      <div key={cake.id} className='item-row'>
                        <span className='item-price'>${cake.price}</span>
                      </div>
                    ))}
                  </td>
                  <td>${purchase.amount_paid}</td>
                  <td>
                    {formatDate(purchase.time_submitted)}, {formatTime(purchase.time_submitted)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    );
}

export default UserPurchases;