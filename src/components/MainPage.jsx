import React, { useContext } from "react";
import { useObserver } from "mobx-react";
import { StoreContext } from '../main';
import Tools from "./Tools";

export default function Mainpage() {
    
    const store = useContext(StoreContext);

    return useObserver(() => (
        <div className="main_conteiner">
            <Tools />
            <div className="render_data_box">
                {store.fligts
                        .map((elem) => {
                            let price = elem.flight.price.total.amount;
                            let key = elem.flightToken;
                            let carrier = elem.flight.legs[0].segments[0].airline.caption;
                            let carrierBack = elem.flight.legs[1].segments[0].airline.caption;           
                            let arrivalAirport = elem.flight.legs[0].segments[0].arrivalAirport.caption;       
                            let uidAirportArrival = elem.flight.legs[0].segments[0].arrivalCity.uid; 
                            let departureAirport = elem.flight.legs[0].segments[0].departureAirport.caption;    
                            let uidDepartureCity = elem.flight.legs[0].segments[0].departureCity.uid; 
                            let arrivalAirportBack = elem.flight.legs[1].segments[0].arrivalAirport.caption;;   
                            let uidAirportArrivalBack = elem.flight.legs[1].segments[0].arrivalCity.uid; 
                            let departureAirportBack = elem.flight.legs[1].segments[0].departureAirport.caption;  
                            let uidDepartureCityBack = elem.flight.legs[0].segments[0].departureCity.uid;         
                            let dateDeparture = store.reformat(elem.flight.legs[0].segments[0].arrivalDate);
                            let dateArrival = store.reformat(elem.flight.legs[0].segments[0].departureDate);
                            let diff = store.different(dateDeparture, dateArrival);
                            let flightDuration = store.msToTime(diff);
                            let weekDayDeparture = store.weekDay(dateDeparture);
                            let weekDayArrival = store.weekDay(dateArrival);
                            let dateDepartureBack = store.reformat(elem.flight.legs[1].segments[0].arrivalDate);
                            let dateArrivalBack = store.reformat(elem.flight.legs[1].segments[0].departureDate);
                            let diffBack = store.different(dateDepartureBack, dateArrivalBack);
                            let flightDurationBack = store.msToTime(diffBack);
                            let weekDayDepartureBack = store.weekDay(dateDepartureBack);
                            let weekDayArrivalBack = store.weekDay(dateArrivalBack);
                            let arrivalTime = store.reformatHour(elem.flight.legs[1].segments[0].departureDate);
                            let arrivalDate = store.reformatDate(elem.flight.legs[1].segments[0].departureDate);
                            let departureTime = store.reformatHour(elem.flight.legs[1].segments[0].departureDate);
                            let departureDate = store.reformatDate(elem.flight.legs[1].segments[0].departureDate);
                            let arrivalDateBack = store.reformatDate(elem.flight.legs[1].segments[0].arrivalDate);
                            let arrivalTimeBack = store.reformatHour(elem.flight.legs[1].segments[0].arrivalDate);
                            let departureTimeBack = store.reformatHour(elem.flight.legs[1].segments[0].departureDate);
                            let departureDateBack = store.reformatDate(elem.flight.legs[1].segments[0].departureDate);

                            return   <div key={key} className="flight_conteiner">
                                            <div className="price_box">
                                                <p className="price"> {price} ₽</p>
                                                <p className="price-text">стоимость для одного взрослого пассажира</p>
                                            </div>
                                            <div className="airport_box">
                                                <p className="aeroport"> {departureAirport} 
                                                    <span className="date_blue"> ({uidDepartureCity}) </span>
                                                </p>
                                                <p className="aeroport">→</p>
                                                <p className="aeroport"> {arrivalAirport} 
                                                    <span className="date_blue"> ({uidAirportArrival}) </span>
                                                </p>
                                            </div>
                                            <div className="date_box">
                                                <p className="date"> 
                                                    {arrivalTime} 
                                                    <span className="date_blue"> {arrivalDate} </span> 
                                                    <span className="date_blue"> {weekDayArrival} </span> 
                                                </p>
                                                <p className="date">⏱ {flightDuration} </p>
                                                <p className="date">  
                                                    <span className="date_blue">{departureDate} </span> 
                                                    <span className="date_blue"> {weekDayDeparture} </span> 
                                                    {departureTime} 
                                                </p>
                                            </div>
                                            {elem.flight.legs[0].segments.length == 1 ? <hr className="hr"/> : 
                                                <div className="flex_row">
                                                    <hr className="hr_mini"/>
                                                    <p className="transfer">1 пересадка</p>
                                                    <hr className="hr_mini"/>
                                                </div>}
                                            <p className="reis">рейс выполняет: {carrier} </p>
                                            <hr/>
                                            <div className="airport_box">
                                                <p className="aeroport"> {departureAirportBack} 
                                                    <span className="date_blue"> ({uidDepartureCityBack}) </span>
                                                </p>
                                                <p className="aeroport">→</p>
                                                <p className="aeroport"> {arrivalAirportBack} 
                                                    <span className="date_blue"> ({uidAirportArrivalBack}) </span>
                                                </p>
                                            </div>
                                            <div className="date_box">
                                                <p className="date"> 
                                                    {arrivalTimeBack} 
                                                    <span className="date_blue"> {arrivalDateBack} </span> 
                                                    <span className="date_blue"> {weekDayArrivalBack} </span> 
                                                </p>
                                                <p className="date">⏱ {flightDurationBack} </p>
                                                <p className="date"> 
                                                    <span className="date_blue">{departureDateBack} </span> 
                                                    <span className="date_blue"> {weekDayDepartureBack} </span> 
                                                    {departureTimeBack} 
                                                </p>
                                            </div>
                                            {elem.flight.legs[1].segments.length == 1 ? <hr className="hr"/> : 
                                                <div className="flex_row">
                                                    <hr className="hr_mini"/>
                                                    <p className="transfer">1 пересадка</p>
                                                    <hr className="hr_mini"/>
                                                </div>}
                                            <p className="reis">рейс выполняет: {carrierBack} </p>
                                            <button className="submit">ВЫБРАТЬ</button>
                                    </div>            
                        })
                    }
            </div>
        </div>
  ))
}