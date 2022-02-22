const basket = {
    items: [],
    subTotal: 0,
    totalPrice: 0,
    amountToReach: 0,
    itemCounter: 0,
    getItemAmountPrice: (item) => {
        return item.amount * item.price;
    },

    getIndexOf: (item) => {
        return basket.items.indexOf(item);
    },

    setSubTotal: () => {
        let subTotal = 0;
        basket.items.forEach(item => {
            subTotal += basket.getItemAmountPrice(item);
        });
        basket.subTotal = subTotal;
        document.getElementById("subtotal-price").innerHTML = basket.subTotal;
    },

    setTotal: () => {
        basket.totalPrice = basket.items.length == 0 ? basket.subTotal : basket.subTotal + restaurant.deliveryPrice;
        document.getElementById("total-price").innerHTML = basket.totalPrice;
        document.getElementById("basket-opener-price").innerHTML = basket.totalPrice;
    },

    setAmountToReach: () => {
        basket.amountToReach = basket.items.length == 0 ? 0 : restaurant.deliveryPrice - basket.subTotal;
        document.getElementById("remain-price").innerHTML = basket.amountToReach;
    },

    updatePrices: () => {
        basket.setSubTotal();
        basket.setTotal();
        basket.setAmountToReach();
        basket.setItemsCounter();
    },

    setItemsCounter: () => {
        let counter = 0;
        basket.items.forEach(item => {
            counter += item.amount;
        });
        basket.itemCounter = counter;
        document.getElementById("basket-opener-items").innerHTML = basket.itemCounter;
    },

    init: () => {
        document.getElementById("minimumprice-reached").innerHTML = restaurant.minimumAmount;
        document.getElementById("minimumprice-required").innerHTML = restaurant.minimumAmount;
    }
}

const restaurant = {
    minimumAmount: 20,
    deliveryPrice: 50,
    mealCategories: {
        favoriteMeals: {
            meals: [
                {
                    category: 'favoriteMeals',
                    name: 'Some Name Some Name',
                    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non deserunt itaque enim cumque natus maxime ea vero dignissimos ratione, maiores autem magni ullam quia error possimus odio quibusdam vel repellendus.',
                    price: 15,
                    extras: ''
                },
                {
                    category: 'favoriteMeals',
                    name: 'Some Name Some',
                    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non deserunt itaque enim cumque natus maxime ea vero dignissimos ratione, maiores autem magni ullam quia error possimus odio quibusdam vel repellendus.',
                    price: 15,
                    extras: ''
                }
            ],
            name: 'Favorite Meals',
            img: '',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non deserunt itaque enim cumque natus maxime ea vero dignissimos ratione, maiores autem magni ullam quia error possimus odio quibusdam vel repellendus.'
        },
        softDrinks: {
            meals: [
                {
                    category: 'softDrinks',
                    name: 'Some Name Name',
                    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non deserunt itaque enim cumque natus maxime ea vero dignissimos ratione, maiores autem magni ullam quia error possimus odio quibusdam vel repellendus.',
                    price: 20,
                    extras: ''
                }
            ],
            name: 'Soft Drinks',
            img: '',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non deserunt itaque enim cumque natus maxime ea vero dignissimos ratione, maiores autem magni ullam quia error possimus odio quibusdam vel repellendus.'
        },
        pizzas: {
            meals: [
                {
                    category: 'pizzas',
                    name: 'Some Name',
                    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non deserunt itaque enim cumque natus maxime ea vero dignissimos ratione, maiores autem magni ullam quia error possimus odio quibusdam vel repellendus.',
                    price: 12,
                    extras: ''
                }
            ],
            name: 'Pizzas',
            img: '',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non deserunt itaque enim cumque natus maxime ea vero dignissimos ratione, maiores autem magni ullam quia error possimus odio quibusdam vel repellendus.'
        },
        burgers: {
            meals: [
                {
                    category: 'burgers',
                    name: 'Some Name',
                    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non deserunt itaque enim cumque natus maxime ea vero dignissimos ratione, maiores autem magni ullam quia error possimus odio quibusdam vel repellendus.',
                    price: 10,
                    extras: ''
                }
            ],
            name: 'Burgers',
            img: '',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non deserunt itaque enim cumque natus maxime ea vero dignissimos ratione, maiores autem magni ullam quia error possimus odio quibusdam vel repellendus.'
        }
    }
}

const createMeal = (name, info, description, extras, price, img) => {
    return {
        name: name,
        info: info,
        description: description,
        extras: extras,
        price: price,
        img: img
    };
}

const createBasketItem = (mealName, mealPrice, mealCategory) => {
    return {
        name: mealName,
        price: mealPrice,
        amount: 1,
        category: mealCategory
    };
}

const generateMealCardHTML = (meal, index) => {
    const mealString = JSON.stringify(meal);
    return `
    <div class="meal-container pointer">
                            <div class="meal-wraper">
                                <div class="meal-name-container">
                                    <span class="meal-name">${meal.name}</span>
                                    <span onclick="openDialog("data")" class="meal-info-btn">Product info</span>
                                </div>
                                <div class="meal-description-additional">${meal.description}</div>
                                <div class="meal-description">${meal.extras}</div>
                                <div class="meal-price">
                                ${meal.price} €
                                </div>
                            </div>
                            <div class="meal-img d-none">
                            <!--HERE IMG MEAL-->
                            </div>
                            <div class="add-to-basket-container">
                                <button onclick='addToBasket(${JSON.stringify(meal)})' class="btn pointer add-to-basket">
                                    <img class="icon" src="img/plus-8-48.png" alt="">
                                </button>
                            </div>
    </div>
    `;
}

const generateCategoryCardHTML = (categoryValue) => {
    return `
    <div class="category-title">
                        <!--<img src="" alt="">-->
                        <div class="category-descrition">
                            <h3 class="category-name margin-0">${categoryValue.name}</h3>
                            <p>${categoryValue.description}</p>
                        </div>
                    </div> 
    `;
}

const generateBasketItem = (item) => {
    return `
    <div class="basket-meal ">
                            <div class="basket-meal-row">
                                <span class="meal-amount">${item.amount}x</span>
                                <span class="meal-name">${item.name}</span>
                                <div class="basket-meal-edit">
                                    <button onclick='decreaseMeal(${basket.getIndexOf(item)})' class="btn-edit-meal btn-meal pointer">-</button>
                                    <button onclick='increaseMeal(${basket.getIndexOf(item)})' class="btn-edit-meal btn-meal pointer">+</button>
                                    <button class="btn-edit-comment btn-icon-basket btn-meal pointer">
                                        <img class="icon " src="img/pencil-2-48.png" alt="">
                                    </button>
                                </div>
                                <span class="basket-meal-price">${basket.getItemAmountPrice(item)} €</span>
                                <button  onclick='deleteFromBasket(${JSON.stringify(item)})' class="btn-delete-meal btn-icon-basket btn-meal pointer">
                                    <img class="icon" src="img/trash-2-48.png" alt="">
                                </button>
                            </div>
                        </div>
    `;
}

const init = () => {
    showCategoriesSwiper();
    showCategories();
    basket.init();
    showBasket();
}

const showCategoriesSwiper = () => {
    const swiperContainer = document.getElementById("categories-swiper");
    swiperContainer.innerHTML = "";
    const categorieLinks = [];

    for (const [key, value] of Object.entries(restaurant.mealCategories)) {
        categorieLinks.push({ name: value.name, key });
    }

    categorieLinks.forEach(cat => {
        swiperContainer.innerHTML += `<a href="#${cat.key}" class="category">${cat.name}</a>`;
    });
}

const showCategories = () => {
    const categoryCard = document.getElementById("category-card");
    categoryCard.innerHTML = "";

    for (const [key, value] of Object.entries(restaurant.mealCategories)) {
        categoryCard.innerHTML += generateCategoryCardHTML(value);
        showCategorieMeals(value.meals, categoryCard);
    }
}

const showCategorieMeals = (meals, categoryCardRef) => {
    meals.forEach((meal, index) => {
        categoryCardRef.innerHTML += generateMealCardHTML(meal, index);
    });
}

const addToBasket = (meal) => {
    const basketItem = basket.items.find(item => item.name == meal.name && item.price == meal.price && item.category == meal.category);
    if (basketItem) {
        const basketItemIndex = basket.items.indexOf(basketItem);
        basket.items[basketItemIndex].amount++;
    } else {
        const newItem = createBasketItem(meal.name, meal.price, meal.category);
        basket.items.push(newItem);
    }
    showBasket();
}

const showBasket = () => {
    const products = document.getElementById("products");
    products.innerHTML = "";

    basket.updatePrices();

    if (basket.items.length == 0) {
        showEmptyBasket();

    } else {
        showBasketInfo();
        basket.items.forEach(item => {
            products.innerHTML += generateBasketItem(item);
        });
    }
}

const showBasketInfo = () => {

    document.getElementById("mobile-basket-opener").classList.remove("d-none");
    document.getElementById("basket-btn-mobile").classList.add("hightlight");

    setTimeout(() => {
        document.getElementById("basket-btn-mobile").classList.remove("hightlight");
    }, 500);

    document.getElementById("basket-empty").classList.add("d-none");

    document.getElementById("delivery-container").classList.remove("d-none");
    document.getElementById("delivery-price").innerHTML = restaurant.deliveryPrice;

    if (basket.amountToReach > 0) {
        document.getElementById("amount-to-reach").classList.remove("d-none");
        document.getElementById("minimumamount-required").classList.remove("d-none");

        document.getElementById("minimumamount-reached").classList.add("d-none");
        document.getElementById("order-btn").classList.add("btn-disable");
    } else {
        document.getElementById("amount-to-reach").classList.add("d-none");
        document.getElementById("minimumamount-required").classList.add("d-none");

        document.getElementById("minimumamount-reached").classList.remove("d-none");
        document.getElementById("order-btn").classList.remove("btn-disable");
    }
}

const showEmptyBasket = () => {
    document.getElementById("basket-empty").classList.remove("d-none");
    document.getElementById("delivery-container").classList.add("d-none");
    document.getElementById("amount-to-reach").classList.add("d-none");
    document.getElementById("minimumamount-required").classList.add("d-none");
    document.getElementById("minimumamount-reached").classList.add("d-none");
    document.getElementById("order-btn").classList.add("btn-disable");
    document.getElementById("mobile-basket-opener").classList.add("d-none");
}

const increaseMeal = (itemIndex) => {
    if (basket.items[itemIndex].amount < 10)
        basket.items[itemIndex].amount++;
    showBasket();
}

const decreaseMeal = (itemIndex) => {
    if (basket.items[itemIndex].amount > 1) {
        basket.items[itemIndex].amount--;
        showBasket();
    }
    else
        deleteFromBasket(itemIndex);

}

const deleteFromBasket = (itemIndex) => {
    basket.items.splice(itemIndex, 1);
    showBasket();
}

const openBasket = () => {
    document.getElementById("basket").classList.add("basket-container--opened");
}

const closeBasket = () => {
    document.getElementById("basket").classList.remove("basket-container--opened");
}

const animateBasketOpener = () => {

}

const getItemAmountPrice = (index) => {
    return shoppingBasketPrices[index] * shoppingBasketAmounts[index];
}

const swipeLeft = () => {
    // document.getElementById("categories-list").scrollLeft -= 100;
    let swiperBox = document.getElementById("categories-swiper").getBoundingClientRect();
    console.log(swiperBox);
    document.getElementById("categories-swiper").style.transform = `translate( -50px , 0)`;

}

const swipeRight = () => {
    let swiperBox = document.getElementById("categories-swiper").getBoundingClientRect();
    console.log(swiperBox);
    // document.getElementById("categories-list").scrollLeft += 100;
    document.getElementById("categories-swiper").style.transform = `translate( 50px , 0)`;
}

window.onscroll = () => {
    document.getElementById("to-top").style.display = window.scrollY > 0 ? "block" : "none";
}


function loadMeals() {
    let mealGroup = document.getElementById('meal-group');
    mealGroup.innerHTML = '';
    let mealGroupContainer;
    for (i = 0; i < restaurant.mealGroup.length; i++) {
        let categoryImage = restaurant.mealGroup[i].categoryImage;
        let categoryName = restaurant.mealGroup[i].categoryName;
        mealGroup.innerHTML +=
            `<div id="meal-group-container-${i}" class="meal-group-container"></div>`
        mealGroupContainer = document.getElementById(`meal-group-container-${i}`);
        if (categoryImage != '') {
            mealGroupContainer.innerHTML += `<img class="meal-group-img" src="${categoryImage}" alt="">`
        }
        mealGroupContainer.innerHTML +=
            `<div class="meal-group-text">${categoryName}</div>`

        for (j = 0; j < restaurant.mealGroup[i].meals.length; j++) {
            let mealName = restaurant.mealGroup[i].meals[j].mealName;
            let mealDescription = restaurant.mealGroup[i].meals[j].mealDescription;
            let mealPrice = restaurant.mealGroup[i].meals[j].mealPrice.toFixed(2);

            mealGroup.innerHTML +=
                `
          <div class="dish-container">
            <div class="meal-name">${mealName}<span class="product-info">Produktinfo</span></div>
            <div class="meal-description">${mealDescription}</div>
            <div class="price">${mealPrice}</div>
            <img onclick="addToBasket('${mealName}', ${mealPrice})" class="add-icon" src="src/img/plus.png">
          </div>
        `
        }
    }
}