import React from "react"
import ContentLoader from "react-content-loader"


const Skeleton: React.FC = (props: any) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={275}
        height={455}
        viewBox="0 0 275 455"
        backgroundColor="#cbc8c8"
        foregroundColor="#ecebeb"
    >
        <rect x="2" y="255" rx="17" ry="17" width="263" height="27" />
        <rect x="13" y="393" rx="2" ry="2" width="84" height="27" />
        <rect x="122" y="390" rx="25" ry="25" width="152" height="45" />
        <rect x="-1" y="297" rx="13" ry="13" width="275" height="77" />
        <circle cx="127" cy="123" r="120" />
    </ContentLoader>
)

export default Skeleton