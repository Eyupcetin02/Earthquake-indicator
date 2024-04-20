import { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';
import axios from "axios";

const Map: React.FC = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maptilersdk.Map | null>(null);
    const [zoom] = useState<number>(1.5);
    const [datas, setDatas] = useState<any[]>([]);
    const [distances, setDistances] = useState<any[]>([]);
    maptilersdk.config.apiKey = 'hkHwrP1IPDiwwZzNbBFI';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allData = await axios.get("http://localhost:5000/get")                
                setDatas(allData.data.data);
                console.log(datas);
            } catch (error) {
                console.error("Bir hata oluştu:", error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        console.log(datas, "datas");
        calculateDistances();
        map.current = new maptilersdk.Map({
            container: mapContainer.current!,
            style: maptilersdk.MapStyle.STREETS,
            center: [41, 28],
            zoom: zoom
        });
        datas.forEach((coord, index) => {
            const marker = new maptilersdk.Marker({ color: "#FF0000" })
                .setLngLat([coord.lon, coord.lat])
                .addTo(map.current!);

            marker.getElement().setAttribute("title", `Şiddet: ${coord.siddet}`);
            setTimeout(() => {
                marker.remove();
            }, 5000 * (index + 1));
        });
        distances.forEach(coord => {
            const marker = new maptilersdk.Marker({ color: "black" })
                .setLngLat([coord.lon, coord.lat])
                .addTo(map.current!);
            console.log(coord);
            marker.getElement().setAttribute("title", `Şiddet: ${coord.siddet}`);
        });

    }, [zoom, datas]);

    const getDistanceBetweenPoints = (latitude1: number, longitude1: number, latitude2: number, longitude2: number, unit: string = 'kilometers'): number => {
        const theta = longitude1 - longitude2;
        let distance = 60 * 1.1515 * (180 / Math.PI) * Math.acos(
            Math.sin(latitude1 * (Math.PI / 180)) * Math.sin(latitude2 * (Math.PI / 180)) +
            Math.cos(latitude1 * (Math.PI / 180)) * Math.cos(latitude2 * (Math.PI / 180)) * Math.cos(theta * (Math.PI / 180))
        );
        if (unit === 'kilometers') {
            distance *= 1.609344;
        }
        return Math.round(distance * 100) / 100;
    }

    const calculateDistances = () => {

        for (let i = 0; i < datas.length; i++) {
            for (let j = i + 1; j < datas.length; j++) {
                const distance = getDistanceBetweenPoints(datas[i].lat, datas[i].lon, datas[j].lat, datas[j].lon, 'kilometers');
                if (distance < 50) {
                    const middlelon = (datas[i].lon + datas[j].lon) / 2
                    const middlelat = (datas[i].lat + datas[j].lat) / 2
                    const middlesiddet = (datas[i].siddet + datas[j].siddet) / 2
                    const errorItem = {
                        data1: {
                            lat: datas[i].lat,
                            lon: datas[i].lon,
                            siddet: datas[i].siddet
                        },
                        data2: {
                            lat: datas[j].lat,
                            lon: datas[j].lon,
                            siddet: datas[j].siddet
                        }
                    };
                    axios.post("http://express-app:5000/error", errorItem)
                    datas.splice(i, 1)
                    datas.splice(j, 1)

                    setDistances(prevDistances => [...prevDistances, { lat: middlelat, lon: middlelon, siddet: middlesiddet }]);
                }
                console.log(distances, "distances");
            }
        }
    }
    return (
        <div className="map-wrap">
            <div ref={mapContainer} className="map" />
        </div>
    );
}

export default Map;
