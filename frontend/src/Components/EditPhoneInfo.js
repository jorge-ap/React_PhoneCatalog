import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import {SpinnerLoader} from "./SpinnerLoader";

const url = "http://localhost:8080"

export const EditPhoneInfo = () => {
    const {phoneId} = useParams()
    const [loading, setLoading] = useState(true)


    const [phone, setPhone] = useState([])
    const [image, setImage] = useState([])

    useEffect(function () {
        setLoading(true)
            fetch(url + "/" + phoneId)
                .then(res => res.json())
                .then(res => {
                    setPhone(res)
                    setLoading(false)
                })
        }, [phoneId]
    )

    const preloadedValues = {
        "name" : phone.name,
        manufacturer : phone.manufacturer
    }

    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues : preloadedValues});

    const onSubmit = data => {
        setLoading(true)
        fetch(url+"/"+phoneId ,  {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        }).then((response) => response.json()
            .then(response => {
                setLoading(false)
                console.log(image)
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
            })
        )
    }


    function changeImage(event){
        console.log(event.target.files[0].name)
        setImage(event.target.files[0])
    }

   return(

       <div>
           {loading ?
               <SpinnerLoader loading={loading}/>
               :
               <div>
                   <form onSubmit={handleSubmit(onSubmit)}>
                       {/* register your input into the hook by invoking the "register" function */}
                       <input type="text" value={phone.name} placeholder="Name" name="name"
                              onChange={e => {
                                  setPhone({ ...phone, [e.target.name]: e.target.value });
                              }}
                              required={true} {...register('name')}/>
                       <input type="text" placeholder="Manufacturer" name="manufacturer"
                              required={true} {...register('manufacturer')} />
                       <input type="number" placeholder="" name="price" required={true} {...register('price')}/>
                       <input type="text" placeholder="5.6" name="screen" required={true} {...register('screen')}/>
                       <input type="number" placeholder="" name="ram" required={true} {...register('RAM')}/>
                       <input type="number" placeholder="" name="year" required={true} {...register('year')}/>

                       {/* errors will return when field validation fails  */}
                       {errors.exampleRequired && <span>This field is required</span>}

                       <input type="submit"/>
                   </form>
                   <form onChange={changeImage}>
                       <input type="file" onChange={changeImage} {...register('imageFile')}/>
                   </form>
               </div>
           }
       </div>
    );
}
