import {ClipLoader} from "react-spinners";

export const SpinnerLoader = ({loading}) => {
    return(<div>
    <ClipLoader
        size={150}
        color={"#123abc"}
        loading={loading}
        />
    </div>
    )
}
