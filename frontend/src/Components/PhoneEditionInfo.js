import React, {useEffect, useState} from "react";
import {EditPhoneInfo} from "./EditPhoneInfo";
import {SpinnerLoader} from "./SpinnerLoader";
import {useParams} from "react-router-dom";

export const PhoneEditionInfo = () => {

    const url = "http://localhost:8080"
    const {phoneId} = useParams()
    const [loading, setLoading] = useState(false)
    const [phone, setPhone] = useState([])

    useEffect(() => {
        setLoading(true)
            fetch(url + "/" + phoneId)
                .then(res => res.json())
                .then(res => {
                    setPhone(res)
                    setLoading(false)
                })
        }, [phoneId]
    )

    return loading ? <SpinnerLoader/> : <EditPhoneInfo preloadedData={phone}/>

}
