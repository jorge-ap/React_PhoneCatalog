import React, {useState} from "react";
import { useForm } from "react-hook-form";

const url = "http://localhost:8080"

export const PhoneCreationForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const[image, setImage] = useState([])

    const onSubmit = data => {
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers : {
                'Content-type' : 'application/json'
            }
        }).then((response) => response.json()
            .then(response => {
                console.log(image)
                const fd = new FormData();
                fd.append("imageFile", image, image.name)
                fetch(url+"/"+response.id + "/image", {
                        method: "POST",
                        body: fd
                    }
                ).then(() => {
                })
            })
        )
    }


    function changeImage(event){

        console.log(event.target.files[0].name)
        setImage(event.target.files[0])
    }

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <input type="text" placeholder="Name" name="name" required={true} {...register('name')}/>
                <input type="text" placeholder="Manufacturer" name="manufacturer" required={true} {...register('manufacturer')} />
                <input type="number" placeholder="" name="price" required={true} {...register('price')}/>
                <input type="text" placeholder="5.6" name="screen" required={true} {...register('screen')}/>
                <input type="number" placeholder="" name="ram" required={true} {...register('RAM')}/>
                <input type="number" placeholder="" name="year" required={true} {...register('year')}/>

                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}

                <input type="submit" />
            </form>
            <form onChange={changeImage}>
                <input type="file" onChange={changeImage} {...register('imageFile')}/>
            </form>
        </div>
    );
}
