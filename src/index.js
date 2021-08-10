import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import L from "leaflet"
import { MapContainer, TileLayer, Popup, Tooltip, GeoJSON } from "react-leaflet"
import ReactLeafletDriftMarker from "react-leaflet-drift-marker"
import ReactLeafletGoogleLayer from "react-leaflet-google-layer"

import geojson from "./building_data.json"
import "./styles.css"

var myicon = L.divIcon({ html: '<div class="pin"></div>', iconSize: [18, 18] }),
  myicon2 = L.divIcon({ html: '<div class="pin2"></div>', iconSize: [18, 18] }),
  myicon3 = L.divIcon({ html: '<div class="pin3"></div>', iconSize: [18, 18] }),
  index = -1,
  loop2index = 22,
  highroadIndex = -1,
  reverse = false

const timeout = 2000

const getPoints = () => {
  const highroad = [
    [30.341442112227067, -97.61458396007917],
    [30.339636557667372, -97.61432323124303],
  ]
  const austin2 = [
    [30.341442112227067, -97.61458396007917],
    // [30.339636557667372, -97.61432323124303],
    [30.34619857848444, -97.61380331166963],
    [30.354598592961544, -97.61679736973723],
    [30.36299805236565, -97.6138011124856],
    [30.368570930144152, -97.61323866418894],
    [30.373401404169503, -97.61141609812128],
    [30.37808451151697, -97.60845485933885],
    [30.38052937099933, -97.61256595138528],
    [30.3859324445324, -97.61550705693176],
    [30.38818749545086, -97.62013677661665],
    [30.390536365216136, -97.6250391225743],
    [30.392415485099733, -97.62787182997349],
    [30.394153858323463, -97.62858026510112],
    [30.396455129245833, -97.63277235959694],
    [30.40134095819363, -97.63402588762904],
    [30.404162556176402, -97.63875024518767],
    [30.40625199955565, -97.64211051162185],
    [30.409487067816954, -97.64883144285378],
    [30.413351252460263, -97.6529921480912],
    [30.41750719428983, -97.65820650388953],
    [30.41935011502279, -97.66111679058913],
    [30.42452127431796, -97.66210189454922],

    // [30.248380201531102, -97.7278183741435],
    // [30.248380201531102, -97.7278183741435],
    // [30.24856142687041, -97.7278106460728],
    // [30.248799206565398, -97.72830906309198],
    // [30.249225536074817, -97.72865237946228],
    // [30.249577720458067, -97.72894205479427],
    // [30.250473331642713, -97.72973982698623],
    // [30.250717679319536, -97.73029389582783],
    // [30.25098644062715, -97.73132388086313],
    // [30.251042037440413, -97.732021267666],
    // [30.25157956516298, -97.73344820240878],
    // [30.252237586307626, -97.73490730965509],
    // [30.25353507523504, -97.73554031574886],
    // [30.254471126320578, -97.73511116815898],
    // [30.255333036055028, -97.73473565764463],
    // [30.25487891417893, -97.7333086732922],
    // [30.25436917242015, -97.73184951654875],
    // [30.25399844322099, -97.7308409894978],
    // [30.25323842136111, -97.7286844702828],
    // [30.252404333584927, -97.72909221893924],
    // [30.251727706227022, -97.72730050870115],
    // [30.250828736544545, -97.72750441667517],
    // [30.24985574782459, -97.7291673569684],
    // [30.24868799666211, -97.72809446575994],
  ]

  if (austin2.length - 1 === index) reverse = true
  if (0 === index) reverse = false
  if (reverse) {
    index = index - 1
  } else {
    index = index + 1
  }
  if (0 !== loop2index) loop2index = loop2index - 1
  if (highroad.length - 1 !== highroadIndex) highroadIndex = highroadIndex + 1
  return { loop1: austin2[index], loop2: austin2[loop2index], loop3: highroad[highroadIndex] }
}
const App = () => {
  const [state, setState] = useState({ loop1: [30.341442112227067, -97.61458396007917], loop3: [30.339636557667372, -97.61432323124303], loop2: [30.42452127431796, -97.66210189454922] })

  useEffect(() => {
    const timer = setInterval(() => {
      const { loop1, loop2, loop3 } = getPoints()
      setState({ loop1, loop2, loop3 })
    }, timeout)
    return () => clearInterval(timer)
  }, [])
  return (
    <div>
      <MapContainer
        bounds={[
          [30.341442112227067, -97.61458396007917],
          [30.339636557667372, -97.61432323124303],
          [30.42452127431796, -97.66210189454922],
        ]}
        zoom={17}>
        {/* <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">GoogleMaps</a> contributors'
          url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        /> */}
        <ReactLeafletGoogleLayer apiKey="YOUR_API_KEY" type={"roadmap"} />
        <GeoJSON data={geojson} />
        <ReactLeafletDriftMarker position={state.loop1} duration={timeout} icon={myicon}>
          <Popup>
            Hello, This is to know the details about the car :). <br /> Name - Green. <br /> Always running
          </Popup>
          <Tooltip>Carl L. West</Tooltip>
        </ReactLeafletDriftMarker>
        <ReactLeafletDriftMarker position={state.loop2} duration={timeout} icon={myicon2}>
          <Tooltip>Point 1</Tooltip>
        </ReactLeafletDriftMarker>
        <ReactLeafletDriftMarker position={state.loop3} duration={1000} icon={myicon3}>
          <Popup>Hello, This is to know the details about the point :).</Popup>
          <Tooltip>Point 2 with popup</Tooltip>
        </ReactLeafletDriftMarker>
      </MapContainer>
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
