import {ClipLoader} from "react-spinners";
import '../App.css'

export const SpinnerLoader = ({loading}) => {
    return(<div className="loading">
    <ClipLoader
        size={150}
        color={"#e58800"}
        loading={loading}
        />
    </div>
    )
}
