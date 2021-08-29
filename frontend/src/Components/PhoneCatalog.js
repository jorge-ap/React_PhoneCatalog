import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {SpinnerLoader} from "./SpinnerLoader";



export const PhoneCatalog = () => {

    const url = "http://localhost:8080"
    const [phones, setPhones] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(function () {
        getPhones()
        }, []
    )


    function getPhones(){
        setLoading(true)
        setTimeout(() => {
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    setPhones(res)
                    setLoading(false)
                })
        }, 200)
    }

    function deletePhone(id){
        setLoading(true)
        fetch(url+"/"+id, {
            method: "DELETE"
        }).then((result) => result.json()
            .then(()=> {
                getPhones()
                setLoading(false)
            })
        )
    }

    return (
        <div className="container-fluid">
            {loading?
                <SpinnerLoader loading={loading}/>
                :
                <div className="row">
                    <div className="col-lg-1 background">
                    </div>
                    <div className="col-lg-10 col-sm-12 list">
                        <h1 className="title">Phone Catalog</h1>
                        <Link to={`/phones/newPhone`} type="button" className="btn btn-success">Create new phone</Link>
                        <div className="container-fluid">
                            <div className="row">
                                {phones.map(phone =>
                                    <div key={phone.id} className="col-lg-4 itemCatalog">
                                        <Link to={"/" + phone.id}>
                                            <img className="phoneLogo" src={url + "/" + phone.id + "/image"} alt=""/>
                                            <h3 className="App-link">{phone.name}</h3>
                                        </Link>
                                        <button onClick={() => deletePhone(phone.id)} className="btn btn-danger">Delete</button>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-1 background">
                    </div>
                </div>
            }
        </div>
    )
}
