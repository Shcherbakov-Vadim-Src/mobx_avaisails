import React, { useContext } from "react";
import { useObserver } from "mobx-react";
import { StoreContext } from '../main';

export default function Tools() {
    
    const store = useContext(StoreContext);

    return useObserver(() => (
        <div className="main_conteiner">
            <div className="fixed">
                <p className="filter_name">Сортировать:</p>
                <button onClick={() => store.handleSortPriceDown()} type="click" className="button">
                Сортировка ▲ по убыванию цены
                </button>
                <button onClick={() => store.handleSortPriceUp()} type="click" className="button">
                Сортировка ▼ по возрастанию цены
                </button>
                <button onClick={() => store.handleSortDurationFlight()} type="click" className="button">
                Сортировка ▼ по времени полета
                </button>
                <p className="filter_name">Фильтровать:</p>
                <div className="checkbox_conteiner">
                    <input type="checkbox" name="checkbox" onChange={(e) => store.handleGetFilterSegmentsOne(e)} />
                    <p className="checkbox">с пересадкой</p>
                </div>
                <div className="checkbox_conteiner">
                    <input type="checkbox" name="checkbox" onChange={(e) => store.handleGetFilterWithoutSegments(e)} /> 
                    <p className="checkbox">без пересадок</p>
                </div>
                <p className="filter_name">Цена:</p>
                <div className="checkbox_conteiner">
                    <p className="input_name">oт</p>
                    <input className="input" type="number" onChange={(e) => store.handleChangeInputFrom(e)} />
                </div>
                <div className="checkbox_conteiner">
                    <p className="input_name">до</p>
                    <input className="input" type="number" onChange={(e) => store.handleChangeInputTo(e)} />
                </div>
                <p className="filter_name">Авиакомпании:</p>
                <div className="">
                    {store.companys.map((elem, index) => {
                        return  <div key={index} className="checkbox_conteiner">
                                    <input type="checkbox" className="checktitle" 
                                        name={elem} onChange={(e) => store.handleFilterTitleCompany(e)} />
                                    <p className="title_name">{elem}</p>
                                </div>
                    })}
                </div>
            </div>
        </div>
  ))
}