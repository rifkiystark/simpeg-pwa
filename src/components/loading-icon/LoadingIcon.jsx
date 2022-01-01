import { ThreeDots } from 'react-loading-icons'

function LoadingIcon() {
    return (
        <ThreeDots
            fill="#fff"
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