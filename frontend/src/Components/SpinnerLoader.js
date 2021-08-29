import {ClipLoader} from "react-spinners";

export const SpinnerLoader = ({loading}) => {
    return(<div>
    <ClipLoader
        size={150}
        color={"#e58800"}
        loading={loading}
        />
    </div>
    )
}
