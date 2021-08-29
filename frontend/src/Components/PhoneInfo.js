import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {SpinnerLoader} from "./SpinnerLoader";

export const PhoneInfo = () => {

    const url = "http://localhost:8080"
    const [phone, setPhone] = useState([])
    const [loading, setLoading] = useState(true)
    const {phoneId} = useParams();

    useEffect(function () {
        setLoading(true)
        setTimeout(() => fetch(url + "/" + phoneId)
            .then(res => res.json())
            .then(res => {
                setPhone(res)
                setLoading(false)
            }), 200)
        }, [phoneId]
    )

    return (
        <div className="container">
            {loading? <SpinnerLoader loading={loading}/> :
                <div className="row">
                <Link className="returnButton" to={"/phones"}>Return to catalog</Link>
                <h1>{phone.name}</h1>
                <div className="imageSection col-lg-5 col-md align-content-center">
                <h4 className="imageTitle">Product image</h4>
                <img className="phoneLogo" src={url+"/"+phoneId+"/image"} alt="" />
                <Link to={`/phones/${phone.id}/edit`} type="button" className="btn btn-primary">Edit</Link>
                </div>
                <div className="col-lg-7">
                <div className="row">
                <h2>Price: <span className="price">{phone.price} €</span></h2>
                <h3 className="align-content-center">Other specifications</h3>
                <h3>Manufacturer : {phone.manufacturer} </h3>
                <h3>Screen size : {phone.screen}" </h3>
                <h3>RAM : {phone.ram} GB</h3>
                <h3>Year : {phone.year} </h3>
                </div>
                </div>
                </div>
            }
        </div>
    )
}
