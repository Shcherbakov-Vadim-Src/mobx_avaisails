import { observable, action, computed } from 'mobx';
import json_data from '../components/api/flights.json';

class Store {
    @observable fligts = json_data.result.flights;

    @observable companys = this.titlesCompanys(this.fligts);

    @observable checkBox = {                   
        firstCheck: false,              
        secondCheck: false,             
        all: true,
    };

    @observable checkBoxTitle = {                   
        firstCheck: false,              
        secondCheck: false,
        all: true             
    };

    @observable title = 'Air France';
    
    @action handleSortPriceDown() {
        let arr = [...this.fligts];
        const clone = arr.sort((a, b) => b.flight.price.total.amount - a.flight.price.total.amount);
        this.fligts = clone;
    }

    @action handleSortPriceUp() {
        let arr = [...this.fligts];
        const clone = arr.sort((a, b) => a.flight.price.total.amount - b.flight.price.total.amount);
        this.fligts = clone;
    }

    @action handleSortDurationFlight() {
        let arr = [...this.fligts];
        let addTime = arr.map((elem) => {
            let dateDeparture = this.reformat(elem.flight.legs[0].segments[0].arrivalDate);
            let dateArrival = this.reformat(elem.flight.legs[0].segments[0].departureDate);
            let diff = this.different(dateDeparture, dateArrival);
            let timeDuration = this.msToTime(diff);
            let durationToMms = this.checkDuration(timeDuration);
            elem.duration = durationToMms;
        })
        const clone = arr.sort((a, b) =>  a.duration - b.duration);
        this.fligts = clone;
        this.companys = this.titlesCompanys(this.clone);
    }

    @action titlesCompanys(arr){
        let titles = [];
        let result = [];
        for (let elem of arr){
            titles.push(elem.flight.legs[0].segments[0].airline.caption);
        }
        let set = new Set(titles);
        for (let elem of set){
            result.push(elem)
        }
        return result;   
    }

    @action reformat(elem){
        let arr = elem.split('T');
        let time = arr[1].split(':');
        let date = arr[0].split('-');
        let result = date.concat(time);
        let resultToNumber = result.map((elem) => (Number(elem)));
        return resultToNumber;
    }

    @action different(elem0, elem1){
        let dateFirst = new Date(...elem0);
        let dateSecond = new Date(...elem1);
        let result = dateFirst.getTime() - dateSecond.getTime();
        return result;
    }

    @action msToTime(duration) {
        let minutes = parseInt((duration/(1000*60))%60)
        let hours = parseInt((duration/(1000*60*60))%24);
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        return `${hours}:${minutes}`;
    }

    @action weekDay(elem){
        let date = new Date(...elem);
        let day = date.getDay();
        let week = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
        return week[day];
    }

    @action reformatDate(elem){
        let arr = elem.split('T');
        let date = arr[0];
        let newArr = date.split('-');
        let day = newArr[2];
        let month;
        switch (newArr[1]) {
        case '01':
            month = 'января';            
            break;
        case '02':
            month = 'февраля';
            break;
        case '03':
            month = 'марта';
            break;
        case '04':
            month = 'апреля';
            break;
        case '05':
            month = 'мая';
            break;
        case '06':
            month = 'июня';
            break;
        case '07':
            month = 'июля';
            break;
        case '08':
            month = 'августа';
            break;
        case '09':
            month = 'сентября';
            break;
        case '10':
            month = 'октября';
            break;
        case '11':
            month = 'ноября';
            break;
        case '12':
            month = 'декабря';
        break;	
    }
        let res = [];
        res.push(day, month);
    
        let newFormat = res.join(' ')
        return newFormat;
    }

    @action reformatHour(elem){
        let arr = elem.split('T');
        let time = arr[1];
        let newTime = time.split(':');
        let deleteSecond = newTime.pop();
        let newFormat = newTime.join(':')
        return newFormat;
    }

    @action checkDuration(time){
        let arr = time.split(":");
        let minutes = arr[0] * 60000;
        let seconds = arr[1] * 1000;
        let result = minutes + seconds;
        return result;
    }

    @action handleGetFilterSegmentsOne = (event) => {
        if(event.target.checked) {
            this.checkBox.firstCheck = true;
            this.checkBox.secondCheck = false;
            this.checkBox = this.checkBox.firstCheck;
            let arr = [...this.fligts];
            const clone = arr.filter((elem) => {
                return elem.flight.legs[0].segments.length == 2
            });
            this.fligts = clone;
            this.companys = this.titlesCompanys(clone);
            return this.checkBox;
        }
        this.fligts = json_data.result.flights; 
        this.companys = this.titlesCompanys(json_data.result.flights);                                                                 
        this.checkBox = {};
        event.target.checked = this.checkBox.firstCheck;
        return this.checkBox;
    }

    @action handleGetFilterWithoutSegments = (event) => {
        if(event.target.checked) {
            this.checkBox.secondCheck = true;
            this.checkBox.firstCheck = false;
            this.checkBox = this.checkBox.secondCheck;
            let arr = [...this.fligts];
            const clone = arr.filter((elem) => {
                return elem.flight.legs[0].segments.length == 1
            });
            this.fligts = clone;
            this.companys = this.titlesCompanys(clone);
            return this.checkBox;
        }
        this.fligts = json_data.result.flights; 
        this.companys = this.titlesCompanys(json_data.result.flights);                                                                 
        this.checkBox = {};
        event.target.checked = this.checkBox.firstCheck;
        return this.checkBox;
    }

    @action handleChangeInputFrom = (event) => { 
        event.preventDefault();
        let arr = [...this.fligts];
        const clone = arr.filter((elem) => {
            return Number(elem.flight.price.total.amount) > Number(event.target.value)
        });
        this.fligts = clone;
        this.companys = this.titlesCompanys(clone);
        if (this.fligts.length === 0 || this.fligts.length === null){
            this.fligts = json_data.result.flights; 
            this.companys = this.titlesCompanys(json_data.result.flights); 
        }
    }

    @action handleChangeInputTo = (event) => { 
        event.preventDefault();
        let arr = [...this.fligts];
        const clone = arr.filter((elem) => {
            return Number(elem.flight.price.total.amount) < Number(event.target.value)
        });
        this.fligts = clone;
        this.companys = this.titlesCompanys(clone);
        if (this.fligts.length === 0 || this.fligts.length === null){
            this.fligts = json_data.result.flights; 
            this.companys = this.titlesCompanys(json_data.result.flights); 
        }
    }

    @action handleFilterTitleCompany = (event) => {
        if (event.target.checked) {
            this.title = event.target.name;
            this.checkinput(event.target.name);  
            this.checkBoxTitle.firstCheck = true;
            this.checkBoxTitle.secondCheck = false;
            this.checkBoxTitle = this.checkBoxTitle.firstCheck;
            let arr = [...this.fligts];
            const clone = arr.filter((elem) => {
                return elem.flight.legs[0].segments[0].airline.caption == this.title;
            });
            this.fligts = clone;                                  
            return this.checkBoxTitle;
        }
        this.fligts = json_data.result.flights; 
        this.companys = this.titlesCompanys(json_data.result.flights); 
        this.title = '';
        this.undisabled();
        this.titlereset();
        this.checkBoxTitle = {};
        event.target.checked = this.checkBoxTitle.firstCheck;
        return this.checkBoxTitle;
    }

    @action titlereset(){
        return this.title = '';
    }

    @action checkinput(event){
        let elems = document.querySelectorAll('.checktitle');
        for (let i = 0; i < elems.length; i++){
            if (elems[i].name !== event){
                elems[i].disabled = true;
            }
        }
    }

    @action undisabled(){
        let elems = document.querySelectorAll('.checktitle');
        for (let i = 0; i < elems.length; i++){
            elems[i].disabled = false;
        }
    }

}


const storeInstance = new Store()

export default storeInstance;