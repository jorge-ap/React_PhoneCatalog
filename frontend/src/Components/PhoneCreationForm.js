import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";
import {SpinnerLoader} from "./SpinnerLoader";


const url = "http://localhost:8080"

export const PhoneCreationForm = () => {
    const {register, handleSubmit} = useForm();

    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState([])

    const onSubmit = data => {
        setLoading(true)
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        }).then((response) => {
                if (response.status !== 201) {
                    alert("There was an error")
                }
                if (response.status === 400) {
                    alert("Bad request")
                }
                if (response.status === 500) {
                    alert("Exists already a phone with this name")
                }
                response.json()
                    .then(response => {
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
                    })
            }
        ).catch((error) => {
            alert(error.status)
        })
    }


    function changeImage(event) {
        setImage(event.target.files[0])
    }

    return (
        <div>
            {loading ? <SpinnerLoader/> :
                <div className="container-fluid">
                    <div className="row">

                        <div className="col-lg-1 col-md-1 col-sm-1">
                        </div>

                        <div className="col-lg-10 col-md-10 col-sm-10 content">
                            <Link className="returnButton" to={"/phones"}>Return to catalog</Link>

                            <form className="mt-5" onChange={changeImage}>
                                <input type="file" onChange={changeImage} {...register('imageFile')}/>
                            </form>

                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="row">

                                    <div className="col-lg-6 col-sm-6">
                                        <label htmlFor="name" className="form-label">
                                            Name
                                        </label>
                                        <input type="text" placeholder="Name" name="name"
                                               className="form-control"
                                               required={true} {...register('name')}/>
                                    </div>

                                    <div className="col-lg-6 col-sm-6">
                                        <label htmlFor="manufacturer" className="form-label">
                                            Manufacturer
                                        </label>
                                        <input type="text" placeholder="Manufacturer" name="manufacturer"
                                               className="form-control"
                                               required={true} {...register('manufacturer')} />
                                    </div>

                                    <div className="col-lg-6 col-sm-6">
                                        <label htmlFor="price" className="form-label">
                                            Price
                                        </label>
                                        <input type="number" placeholder="1000" name="price"
                                               className="form-control"
                                               required={true} {...register('price')} />
                                    </div>

                                    <div className="col-lg-6 col-sm-6">
                                        <label htmlFor="screen" className="form-label">
                                            Screen
                                        </label>
                                        <input type="text" placeholder="5.6" name="screen"
                                               className="form-control"
                                               required={true} {...register('screen')} />
                                    </div>

                                    <div className="col-lg-6 col-sm-6">
                                        <label htmlFor="ram" className="form-label">
                                            RAM
                                        </label>
                                        <input type="number" placeholder="5" name="ram"
                                               className="form-control"
                                               required={true} {...register('RAM')} />
                                    </div>

                                    <div className="col-lg-6 col-sm-6">
                                        <label htmlFor="year" className="form-label">
                                            Year
                                        </label>
                                        <input type="number" placeholder="2021" name="year"
                                               className="form-control"
                                               required={true} {...register('year')} />
                                    </div>

                                </div>
                                <input className="submit btn btn-success" value="Submit" type="submit"/>
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
