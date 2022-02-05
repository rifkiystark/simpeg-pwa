import { ThreeDots } from 'react-loading-icons'

function LoadingIcon({primary}) {
    return (
        <ThreeDots
            fill={primary ? "#206bc4" : "#fff"}
            fillOpacity={1}
            height="1em"
            speed={1}
            strokeOpacity={1}
            style={{
                margin: 2
            }}
        />
    )
}

export default LoadingIcon