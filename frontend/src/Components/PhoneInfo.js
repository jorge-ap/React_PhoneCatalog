import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {SpinnerLoader} from "./SpinnerLoader";
import '../App.css'
import './PhoneInfo.css'

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

        <div className="container-fluid phoneDetails">
            {loading ? <SpinnerLoader loading={loading}/> :
                <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-1">
                    </div>

                    <div className="col-lg-10 col-md-10 col-sm-10 content">
                        <div className="row">
                            <Link className="returnButton" to={"/phones"}>Return to catalog</Link>
                            <h1>{phone.name}</h1>
                            <div className="imageSection col-lg-5 col-md-6 col-sm-6  ">
                                <h4 className="imageTitle">Product image</h4>
                                <img className="phoneLogo" src={url+"/"+phoneId+"/image"} alt="" />
                                <div className="row">
                                    <Link to={`/phones/${phone.id}/edit`} type="button" className="btn btn-primary edit">Edit</Link>
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-6 col-sm-6">
                                <div className="row info">
                                    <h2>Price: <span className="price">{phone.price} €</span></h2>
                                    <h3>Manufacturer : {phone.manufacturer} </h3>
                                    <h3>Screen size : {phone.screen}" </h3>
                                    <h3>RAM : {phone.ram} GB</h3>
                                    <h3>Year : {phone.year} </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-1 col-md-1 col-sm-1">
                    </div>
                </div>
            }
        </div>
    )
}
