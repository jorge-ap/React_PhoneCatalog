import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useHistory, useParams} from "react-router-dom";
import {SpinnerLoader} from "./SpinnerLoader";
import '../App.css'
import './PhoneInfo.css'

const url = "http://localhost:8080"

export const EditPhoneInfo = ({preloadedData}) => {
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    const {register, handleSubmit} = useForm({
        defaultValues: preloadedData
    })

    const {phoneId} = useParams()

    const [image, setImage] = useState([])


    const onSubmit = data => {
        setLoading(true)
        fetch(url + "/" + phoneId, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        }).then((response) => response.json()
            .then(response => {
                if (response.status === 500) {
                    alert("Exists already a phone with this name")
                }
                setLoading(false)
                if (image.length !== 0) {
                    const fd = new FormData();
                    fd.append("imageFile", image, image.name)
                    setLoading(true)
                    fetch(url + "/" + response.id + "/image", {
                            method: "POST",
                            body: fd
                        }
                    ).then(() => {
                        setLoading(false)
                    })
                }
                history.push("/" + phoneId)
            })
        )
    }


    function changeImage(event) {
        setImage(event.target.files[0])
    }

    return (

        <div>
            {loading ?
                <SpinnerLoader loading={loading}/>
                :
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-lg-1 col-md-1 col-sm-1">
                        </div>

                        <div className="col-lg-10 col-md-10 col-sm-10 content">
                            <Link className="returnButton" to={"/phones"}> &lt;  Catalog </Link>
                            <div className="row d-flex justify-content-center">
                                <div className="profile-background">
                                    <img className="phoneLogo" src={url + "/" + phoneId + "/image"} alt=""/>
                                </div>
                            </div>
                            <form className="mt-5" onChange={changeImage}>
                                <input type="file" onChange={changeImage} {...register('imageFile')}/>
                            </form>

                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="row">

                                    <div className="col-lg-6 col-sm-6">
                                        <label htmlFor="name" className="form-label">
                                            Name
                                        </label>
                                        <input placeholder={preloadedData.name} type="text" autoComplete="true"
                                               name="name"
                                               className="form-control"
                                               required={true} {...register('name')}/>
                                    </div>

                                    <div className="col-lg-6 col-sm-6">
                                        <label htmlFor="manufacturer" className="form-label">
                                            Manufacturer
                                        </label>
                                        <input placeholder={preloadedData.manufacturer} autoComplete="true" type="text"
                                               name="manufacturer"
                                               className="form-control"
                                               required={true} {...register('manufacturer')} />
                                    </div>

                                    <div className="col-lg-6 col-sm-6">
                                        <label htmlFor="price" className="form-label">
                                            Price
                                        </label>
                                        <input placeholder={preloadedData.price} type="number" name="price"
                                               autoComplete="true"
                                               className="form-control"
                                               required={true} {...register('price')} />
                                    </div>

                                    <div className="col-lg-6 col-sm-6">
                                        <label htmlFor="screen" className="form-label">
                                            Screen
                                        </label>
                                        <input placeholder={preloadedData.screen} type="text" name="screen"
                                               autoComplete="true"
                                               className="form-control"
                                               required={true} {...register('screen')} />
                                    </div>

                                    <div className="col-lg-6 col-sm-6">
                                        <label htmlFor="ram" className="form-label">
                                            RAM
                                        </label>
                                        <input placeholder={preloadedData.ram} type="number"
                                               autoComplete="true"
                                               className="form-control"
                                               required={true} {...register('ram')} />
                                    </div>

                                    <div className="col-lg-6 col-sm-6">
                                        <label htmlFor="year" className="form-label">
                                            Year
                                        </label>
                                        <input placeholder={preloadedData.year} type="number" name="year"
                                               autoComplete="true"
                                               className="form-control"
                                               required={true} {...register('year', {pattern: /20[0-9]{2}/})}
                                        />
                                    </div>
                                    <div>
                                        <input className="btn btn-success submit" value="Submit" type="submit"/>
                                    </div>
                                </div>

                            </form>


                        </div>
                    </div>

                    <div className="col-lg-1 col-md-1 col-sm-1">
                    </div>

                </div>
            }
        </div>
    );
}
