import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import L from "leaflet"
import { Map, TileLayer, Popup, Tooltip, Marker, GeoJSON } from "react-leaflet"
import ReactLeafletDriftMarker from "react-leaflet-drift-marker"
import geojson from "./building_data.json"
import "./styles.css"

var myicon = L.icon({
    iconUrl: "https://i.stack.imgur.com/oQJuO.png",

    //       shadowUrl: "//leafletjs.com/docs/images/leaf-shadow.png",
    iconSize: [38, 40], // size of the icon
    //       shadowSize: [50, 64], // size of the shadow
    //       iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    //       shadowAnchor: [4, 62], // the same for the shadow
    //       popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  }),
  parkingCar = L.icon({ iconUrl: "./greyCar.png", iconSize: [21, 40] }),
  availableCar = L.icon({ iconUrl: "./greenCar.png", iconSize: [21, 40] }),
  index = -1,
  ladybirdLakeIndex = -1,
  highroadIndex = -1,
  reverse = false
const timeout = 2000

const getPoints = () => {
  const ladybirdLake = [
    // [30.24788317794715, -97.72405794590846],
    // [30.247992078270297, -97.72399625466734],
    // [30.2484948742885, -97.72378436066589],
    // [30.248494875358098, -97.72370657647703],
    // [30.2484948742885, -97.72378436066589],
    // [30.24863621275131, -97.72372803321156],
    // [30.249092665054217, -97.72354296069632],
    // [30.249646427921935, -97.72367170721915],
    // [30.250297502346925, -97.72325596430944],
    // [30.249699716861407, -97.72154739894312],
  ]
  const highroad = [
    // [30.246136711149454, -97.73460499706769],
    // [30.247177736795607, -97.73474678799832],
    // [30.247615145669897, -97.73455438555624],
    // [30.247440188788058, -97.73370373036116],
    // [30.246565375674276, -97.73251889946454],
    // [30.24562931505179, -97.73132396323885],
    // [30.24477197739979, -97.73026068852482],
    // [30.2448507579338, -97.72680745034108],
    // [30.244807014351988, -97.72548088444962],
    // [30.24473688852949, -97.72339481748863],
    // [30.24430829287298, -97.72211880257291],
    // [30.242129993520457, -97.72329355408458],
  ]
  const austin2 = [
    [30.341442112227067, -97.61458396007917],
    [30.339636557667372, -97.61432323124303],
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
  if (reverse) {
    index = index + 1
  } else {
    index = index + 1
  }
  if (ladybirdLake.length - 1 !== ladybirdLakeIndex) ladybirdLakeIndex = ladybirdLakeIndex + 1
  if (highroad.length - 1 !== highroadIndex) highroadIndex = highroadIndex + 1

  return { loop1: austin2[index], loop2: ladybirdLake[ladybirdLakeIndex], loop3: highroad[highroadIndex] }
}
const App = () => {
  const [state, setState] = useState({ loop1: [30.341442112227067, -97.61458396007917], loop2: [30.339636557667372, -97.61432323124303], loop3: [30.42452127431796, -97.66210189454922] })

  useEffect(() => {
    console.log("call")
    const timer = setInterval(() => {
      const { loop1, loop2, loop3 } = getPoints()
      setState({ loop1, loop2, loop3 })
    }, timeout)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <Map
        bounds={[
          [30.341442112227067, -97.61458396007917],
          [30.339636557667372, -97.61432323124303],
          [30.42452127431796, -97.66210189454922],
        ]}
        zoom={17}>
        <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <GeoJSON data={geojson} />
        <ReactLeafletDriftMarker
          position={state.loop1}
          duration={2000} //keepAtCenter={true}
          // icon={myicon}
        >
          <Popup>
            Hello, This is to know the details about the car :). <br /> Name - Yellow car. <br /> Phone - 781-835-5258
            <br />
            444 Hillcrest Avenue
            <br /> Cambridge, MA 02141
          </Popup>
          <Tooltip>Carl L. West</Tooltip>
        </ReactLeafletDriftMarker>

        {/* <Marker position={[30.341442112227067, -97.61458396007917]} icon={parkingCar}>
          <Popup>Parking Car.</Popup>
          <Tooltip>Parking Car.</Tooltip>
        </Marker>
        <Marker position={[30.339636557667372, -97.61432323124303]} icon={parkingCar}>
          <Popup>Parking Car.</Popup>
          <Tooltip>Parking Car.</Tooltip>
        </Marker>
        <Marker position={[30.42452127431796, -97.66210189454922]} icon={parkingCar}>
          <Popup>Parking Car.</Popup>
          <Tooltip>Parking Car.</Tooltip>
        </Marker> */}
      </Map>
    </div>
  )
}

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
