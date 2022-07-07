import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={246}
    height={300}
    viewBox="0 0 246 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#d8d4d4"
    {...props}
  >
    <rect x="225" y="73" rx="0" ry="0" width="1" height="0" /> 
    <rect x="121" y="133" rx="0" ry="0" width="0" height="1" /> 
    <rect x="5" y="197" rx="0" ry="0" width="102" height="0" /> 
    <rect x="89" y="210" rx="0" ry="0" width="1" height="3" /> 
    <rect x="135" y="221" rx="0" ry="0" width="3" height="0" /> 
    <rect x="0" y="0" rx="0" ry="0" width="246" height="150" /> 
    <rect x="3" y="168" rx="0" ry="0" width="142" height="18" /> 
    <rect x="2" y="195" rx="0" ry="0" width="204" height="18" /> 
    <rect x="3" y="228" rx="0" ry="0" width="146" height="18" /> 
    <rect x="3" y="300" rx="0" ry="0" width="128" height="16" /> 
    <rect x="5" y="260" rx="0" ry="0" width="143" height="18" />
  </ContentLoader>
)

export { MyLoader};