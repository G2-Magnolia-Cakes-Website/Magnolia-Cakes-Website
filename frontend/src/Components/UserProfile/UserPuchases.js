import './ProfilePage.css';
import Form from "./ProfileForm"
import React, { useEffect, useState } from "react";

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
                    console.log(res);
                    setPurchases(res.data);
                } else {
                    console.log(res);
                }
            } catch (err) {
                console.log(err);
                console.log(err.response.data);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className='profile-welcome'>Your Purchases</div>
            <div className='purchase-list'>
                {purchases.map(purchase => (
                    <div key={purchase.id} className='purchase-item'>
                        <div>Order ID: {purchase.id}</div>
                        <div>Amount Paid: {purchase.amount_paid}</div>
                        <div>Time Submitted: {purchase.time_submitted}</div>
                        <div>Videos: {purchase.videos.join(', ')}</div>
                        <div>Cakes: {purchase.cakes.join(', ')}</div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default UserPurchases;