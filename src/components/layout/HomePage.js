import React from 'react';

const HomePage = () => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators mb-3">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active pb-5">
                    {/*<img src="addItems.png" className="d-block w-100" alt="..."/>*/}
                    <div className="card d-md-block text-primary">
                        <div className="card-body">
                            <h5>Создай список покупок</h5>
                            <p>Создай заказ, добавь позиции, укажи количество и цену при необходимости</p>
                        </div>
                    </div>
                </div>
                <div className="carousel-item pb-5">
                    {/*<img src="checkitems.png" className="d-block w-100" alt="..."/>*/}
                    <div className="card d-md-block text-primary">
                        <div className="card-body">
                            <h5>Отмечай</h5>
                            <p>Когда будешь в магазине открой заказ и одним кликом отмечай выполненные товары</p>
                        </div>
                    </div>
                </div>
                <div className="carousel-item pb-5">
                    {/*<img src="shareOrder.png" className="d-block w-100" alt="..."/>*/}
                    <div className="card d-md-block text-primary">
                        <div className="card-body">
                            <h5>Сохрани и поделись</h5>
                            <p>Отправь заказ в шаблоны и используй еще раз. Отправь друзьям ссылку и
                                отмечайте
                                 вместе</p>
                        </div>
                    </div>
                </div>
            </div>
            <a className="carousel-control-prev text-primary" href="#carouselExampleIndicators" role="button"
               data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
               data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    );
};

export default HomePage;