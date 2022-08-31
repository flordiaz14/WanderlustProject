import React, { useEffect, useState } from "react";


export default function CardCategory({data, total}) {
    const [totalTotal, setTotalTotal] = useState();
    const categories =data;
    useEffect(() => {
        const [totalByCategories]= total?.filter(e => (e[0] === data?.title) && e);
        setTotalTotal(
            totalByCategories
        )
    }, [total, data])

    return(
    <div className="cardCategory">
        <div className="cardCategory--img">
            <img src={categories?.url_image} alt={categories?.title} />
        </div>
        <div className="cardCategory--info">
            <h2>{categories?.title}</h2>
            <h4>{totalTotal && totalTotal[1]} {categories?.title}</h4>
        </div>
    </div>
    );
}