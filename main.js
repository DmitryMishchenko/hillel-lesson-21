// MVC Model View Controller

// Model - хранит данные

// View - отображает данные на странице, подписывается на события DOM элементов


class CounterModel {
    value = 0;

    subscribers = [];

    increment() {
        this.value++;
        this.notify();
    }

    decrement() {
        this.value--;
        this.notify();
    }

    setValue(n = 0) {
        this.value = n || this.value;
        this.notify();
    }

    subscribe(fn) {
        if (typeof fn === 'function') {
            this.subscribers.push(fn);
        }
    }

    notify() {
        this.subscribers.forEach((subscriber) => {
            subscriber(this.value);
        });
    }
}

class CounterView {
    constructor(container, model) {
        this.container = container;
        this.model = model;
        
        this.container.addEventListener('click', this.handleContainerClick);
        this.render();
    }

    setHandlers(handlers) {
        this.handlers = handlers;
    }

    handleContainerClick = ({ target }) => {
        // console.log('container click', target);
        const btn = target.closest('.counter-btn');
        // console.log(btn);
        if (btn) {
            const action = btn.dataset.action;
            if (action === 'increment') {
                this.handlers.onIncrement();
            } else if (action === 'decrement') {
                this.handlers.onDecrement();
            }
        }
    };

    render() {
        this.container.innerHTML = `
            <button class="counter-btn" data-action="increment">+</button>
            <div class="counter-value">${this.model.value}</div>
            <button class="counter-btn" data-action="decrement">-</button>
        `;
    }
}

class CounterController {
    constructor(model, v) {
        this.model = model;
        this.view = v;

        this.view.setHandlers({
            onDecrement: () => {
                this.model.decrement();
            },
            onIncrement: () => {
                this.model.increment();
            }
        });

        this.model.subscribe(() => {
            this.view.render();
        });
    }
}

const counterModel = new CounterModel();
const counterView = new CounterView(document.getElementById('counter'), counterModel);
const controller = new CounterController(counterModel, counterView);
window.counterModel = counterModel;
// counterModel.increment();
counterModel.decrement();
counterModel.setValue(90);

// console.log(counterModel.value);


const CATEGORIES = {
    PHONE: 'phone',
    PC: 'personal_computer',
    LAPTOP: 'laptop',
    NEW_YEAR: 'new_year',
};

const products = [
    {
        id: 1,
        category: CATEGORIES.LAPTOP,
        year: 2019,
        name: 'Macbook pro 2019 space gray',
        price: 2000,
    },
    {
        id: 2,
        category: CATEGORIES.PHONE,
        year: 2016,
        name: 'Iphone 7',
        price: 600,
    },
    {
        id: 3,
        category: CATEGORIES.PHONE,
        year: 2015,
        name: 'Iphone 6S',
        price: 580,
    },
    {
        id: 4,
        category: CATEGORIES.PHONE,
        year: 2015,
        name: 'Iphone 6',
        price: 550,
    },
    {
        id: 5,
        category: CATEGORIES.NEW_YEAR,
        year: 2021,
        name: 'fir-tree',
        price: 100,
    },
    {
        id: 6,
        category: CATEGORIES.PC,
        year: 2014,
        name: 'Lenovo',
        price: 400,
    },
];

class ProductsList {
    list = products;

    getProductById(id) {
        return this.list.find((product) => product.id === id);
        // return this.list.reduce((elementToFind, item) => {
        //     if (item.id === id) {
        //         return item;
        //     }
        //     return elementToFind;
        // }, null);
    }

    getProductsByName(name) {
        return this.list.filter((product) => {
            return product.name.toLowerCase().includes(name.toLowerCase());
        });
    }

    getProductsByCategory(category) {
        return this.list.filter((product) => product.category === category);
    }

    getSortedByName() {
        return this.list.slice().sort((a, b) => {
            let aName = a.name.toLowerCase();
            let bName = b.name.toLowerCase();

            if (aName < bName) return -1;
            if (aName > bName) return 1;
            return 0;
        });
    }

    getSortedByPrice() {
        return this.list.slice().sort((a, b) => {
            if (a.price < b.price) return -1;
            if (a.price > b.price) return 1;
            return 0;
        });
    }

    removeProductById(id) {
        const indexOfElement = this.list.indexOf(this.getProductById(id));

        console.log(indexOfElement);
        this.list.splice(indexOfElement, 1);
        // this.list = this.list.filter((product) => product.id !== id);
    }

    removeProductsCategory(category) {
        this.list = this.list.filter((product) => product.category !== category);
    }

    updateProductById(id, toUpdate) {
        const product = this.getProductById(id);

        // if (product) {
        Object.assign(product || {}, toUpdate);
        // }
        
        // Object.keys(toUpdate).forEach(key => {
        //     product[key] = toUpdate[key];
        // });

        console.log(product);
    }

    getProductsCountMap() {
        return this.list.reduce((acc, product) => {
            acc[product.category] = (acc[product.category] || 0) + 1;
            return acc;
        }, {});
    }

    getTotalPrice() {
        return this.list.reduce((acc, product) => {
            return acc + product.price;
        }, 0);
    }

    getInRange(start, end) {
        return this.list.filter(product => 
            product.year >= start && product.year <= end)
    }
}

const list = new ProductsList();
// console.log(list.getProductsByName('Iphone'));
// console.log(list.getProductsByName('hon'));
// console.log(list.getProductsByCategory(CATEGORIES.PC));

// list.removeProductById(2);
// list.removeProductsCategory(CATEGORIES.PHONE);

list.updateProductById(0, { price: 1400, name: 'imac' });

console.log(list.getInRange(2000, 2020));

// console.log(list.getSortedByPrice());

// console.log(list.list);

// посчитать сколько товаров какой категории
// общая стоимость
// найти в диапазоне дат


// Удалить товар, по id, имени, категориии

// Реализовать список продуктов
// 1 Поиск товара по id
// 2 Поиск товаров по имени
// 3 Поиск товаров по категории


// Сортировка товаров
// по имени, по дате, по цене


// именить товар по id