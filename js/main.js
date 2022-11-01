// Loading Screen Before Gitting Ready
$(document).ready(() => {
    $('.loading-screen').fadeOut(1000, () => {
        $('.loading-screen').remove()
    })
    $('body').css('overflow', 'auto')
})


// Side NavBar Handeling
let navWidth = $('.nav-menu').outerWidth()
$('#openNav').click(() => {
    if ($('nav').css('left') == `${-navWidth}px`) {
        $('nav').animate({ left: 0 }, 500)
        $('.nav-header-mark i').addClass('fa-times')
        $('.nav-menu-links li').eq(0).animate({ opacity: '1', paddingTop: '15px' }, 1200)
        $('.nav-menu-links li').eq(1).animate({ opacity: '1', paddingTop: '0px' }, 1200)
        $('.nav-menu-links li').eq(2).animate({ opacity: '1', paddingTop: '0px' }, 1200)
        $('.nav-menu-links li').eq(3).animate({ opacity: '1', paddingTop: '0px' }, 1200)
        $('.nav-menu-links li').eq(4).animate({ opacity: '1', paddingTop: '0px' }, 1200)
    } else {
        $('nav').animate({ left: `${-navWidth}px` }, 500)
        $('.nav-header-mark i').removeClass('fa-times')
        $('.nav-menu-links li').eq(0).animate({ opacity: '0', paddingTop: '500px' }, 1500)
        $('.nav-menu-links li').eq(1).animate({ opacity: '0', paddingTop: '500px' }, 1500)
        $('.nav-menu-links li').eq(2).animate({ opacity: '0', paddingTop: '500px' }, 1500)
        $('.nav-menu-links li').eq(3).animate({ opacity: '0', paddingTop: '500px' }, 1500)
        $('.nav-menu-links li').eq(4).animate({ opacity: '0', paddingTop: '500px' }, 1500)
    }
})


// Home Display
let finalResult = [];
async function displayHome() {
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    finalResult = await apiResponse.json()
    displayMeals(finalResult.meals)
}
displayHome()

function displayMeals(finalResult) {
    let box = ``;
    for (let i = 0; i < finalResult.length; i++) {
        box += `<div class="col-md-6 col-lg-3 ">
        <div onclick="getMeal('${finalResult[i].idMeal}')" class="item shadow rounded position-relative">
            <img src=${finalResult[i].strMealThumb} class="w-100" alt="">
            <div class="layer">
                <h2 class="ps-2">${finalResult[i].strMeal}</h2>
            </div>
        </div>
      </div>`
    }
    $('#rowData').html(box);
}


// Meals Details
async function getMeal(mealID) {
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    meal = await meal.json()
    displayMeal(meal.meals[0])
}


function displayMeal(meal) {
    let components = ``;
    for (let i = 0; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            components += `<li class="my-3 mx-1 p-1 component rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags;
    if (tags != null) {
        tags = meal.strTags.split(',')
        var tagsStr = ``
        for (let i = 0; i < tags.length; i++) {
            tagsStr += `<li class="tags-style my-3 mx-1 p-1 rounded">${tags[i]}</li>`
        }
    }

    let box =
        `
<div class="col-md-4 text-center pt-3">
                    <img src="${meal.strMealThumb}" class="w-100" alt="">
                    <h1 class="text-white">${meal.strMeal}</h1>
                </div>
                <div class="col-md-8 text-white">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                        <p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
                        <p><b class="fw-bolder">Category  :</b> ${meal.strCategory}</p>
                        <h3>Recipes :</h3>
                        <ul class="d-flex flex-wrap list-unstyled" id="components">
                        </ul>
                        <h3>Tags :</h3>
                        <ul class="d-flex list-unstyled" id="tags"></ul>
                        <a href="${meal.strSource}" target="_blank" class="btn btn-success text-white">Source</a>
                        <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger text-white">Youtub</a>

                </div>
`
    $('#rowData').html(box);
    $('#components').html(components);
    $('#tags').html(tagsStr);
}


// Search display
$('#search').click(() => {
    $('#search-container').addClass('d-block')
    $('#rowData').html('')
    $('nav').animate({ left: `${-navWidth}px` }, 500)
    $('.nav-header-mark i').removeClass('fa-times')
    $('.contact-inputs').removeClass('d-block')
})


// Search By Name
searchByName.addEventListener('keyup', () => {
    getMealByName($('#searchByName').val());
})

let result2;
async function getMealByName(name) {
    let xml = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let result = await xml.json();
    result2 = result.meals
    displayMealByName()
}

function displayMealByName() {
    let box = ''
    for (let i = 0; i < result2.length; i++) {
        box += `<div class="col-md-6 col-lg-3 ">
        <div onclick="getMeal('${result2[i].idMeal}')" class="item shadow rounded position-relative">
            <img src=${result2[i].strMealThumb} class="w-100" alt="">
            <div class="layer">
                <h2 class="ps-2">${result2[i].strMeal}</h2>
            </div>
        </div>
      </div>`
    }
    $('#rowData').html(box);
}


// Search By First Letter
let searchByFirstCar = document.getElementById('searchByFirstLetter');
searchByFirstCar.addEventListener('keyup', () => {

    if (searchByFirstCar.value.length > 1) {
        searchByFirstCar.value.slice(0, 1);
    }
    $("#searchByFirstLetter").val(searchByFirstCar.value.slice(0, 1))

    getMealByFirstName(searchByFirstCar.value);
})

async function getMealByFirstName(char) {
    let xml = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`)
    let result = await xml.json();
    finalResult = result.meals
    displayMealByFirstName()
}

function displayMealByFirstName() {
    let box = ''
    for (let i = 0; i < finalResult.length; i++) {
        box += `<div class="col-md-6 col-lg-3 ">
        <div onclick="getMeal('${finalResult[i].idMeal}')" class="item shadow rounded position-relative">
            <img src=${finalResult[i].strMealThumb} class="w-100 " alt="">
            <div class="layer">
                <h2 class="ps-2">${finalResult[i].strMeal}</h2>
            </div>
        </div>
        </div>`
    }
    $('#rowData').html(box);
}

// categories 
// ِAction Whin Click
$('#categories').click(() => {
    $('#rowData').html(` `);
    $('nav').animate({ left: `${-navWidth}px` }, 500)
    $('.nav-header-mark i').removeClass('fa-times')
    $('#search-container').removeClass('d-block')
    $('.contact-inputs').removeClass('d-block')
    getMealByCategory()
})

// display Categories
async function getMealByCategory() {
    let xml = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let result = await xml.json();
    result2 = result.categories
    displayMealByCategory()
}
function displayMealByCategory() {
    let box = ''
    for (let i = 0; i < result2.length; i++) {
        box += `<div class="col-md-6 col-lg-3 ">
        <div onclick="getMealByFilterCategory('${result2[i].strCategory}')" class="item shadow rounded position-relative">
            <img src=${result2[i].strCategoryThumb} class="w-100 " alt="">
            <div class="layer ">
                <h2 class="p-2">${result2[i].strCategory}</h2>
                <p>${result2[i].strCategoryDescription.split(' ').slice(0, 12).join(' ')}</p>
            </div>
        </div>
        </div>`
    }
    $('#rowData').html(box);
}


// Display Details of Categories
async function getMealByFilterCategory(cat) {
    let xml = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
    let result = await xml.json();
    result2 = result.meals
    displayMealByFilterCategory()
}

function displayMealByFilterCategory() {
    let box = ''
    for (let i = 0; i < result2.length; i++) {
        box += `<div class="col-md-6 col-lg-3 ">
        <div onclick="getMeal('${result2[i].idMeal}')" class="item shadow rounded position-relative">
            <img src=${result2[i].strMealThumb} class="w-100 " alt="">
            <div class="layer">
                <h2 class="ps-2">${result2[i].strMeal}</h2>
            </div>
        </div>
        </div>`
    }
    $('#rowData').html(box);
}


// Area 
// ِAction Whin Click
$('#area').click(() => {
    $('#rowData').html(` `);
    $('nav').animate({ left: `${-navWidth}px` }, 500)
    $('.nav-header-mark i').removeClass('fa-times')
    $('#search-container').removeClass('d-block')
    $('.contact-inputs').removeClass('d-block')
    getArea()
})

// display Categories
async function getArea() {
    let xml = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let result = await xml.json();
    result2 = result.meals.slice(0, 20)
    console.log(result2);
    displayArea()
}
function displayArea() {
    let box = ''
    for (let i = 0; i < result2.length; i++) {
        box += `<div class="col-md-6 col-lg-3 ">
        <div onclick="getFilterArea('${result2[i].strArea}')" class="text-center item-area shadow rounded">
            <i class="fa-solid fa-city fa-3x"></i>
            <h2 class="text-white fw-light">${result2[i].strArea}</h2>
        </div>
        </div>`
    }
    $('#rowData').html(box);
}

// Display Details of Categories
async function getFilterArea(list) {
    let xml = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${list}`)
    let result = await xml.json();
    result2 = result.meals
    console.log(result2);
    displayFilterArea()
}
function displayFilterArea() {
    let box = ''
    for (let i = 0; i < result2.length; i++) {
        box += `<div class="col-md-6 col-lg-3 ">
        <div onclick="getMeal('${result2[i].idMeal}')" class="item shadow rounded position-relative">
            <img src=${result2[i].strMealThumb} class="w-100 " alt="">
            <div class="layer">
                <h2 class="ps-2">${result2[i].strMeal}</h2>
            </div>
        </div>
        </div>`
    }
    $('#rowData').html(box);
}

// Ingredients
// Get Ingredients
$('#ingredients').click(() => {
    $('#rowData').html(` `);
    $('nav').animate({ left: `${-navWidth}px` }, 500)
    $('.nav-header-mark i').removeClass('fa-times')
    $('#search-container').removeClass('d-block')
    $('.contact-inputs').removeClass('d-block')
    getIngredients()
})

// display Ingredients
async function getIngredients() {
    let xml = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let result = await xml.json();
    result2 = result.meals
    displayIngredients()
}
function displayIngredients() {
    let box = ''
    for (let i = 0; i < result2.length; i++) {
        if (result2[i].strDescription == null) {
            break
        } else {


            box += `<div class="col-md-6 col-lg-3 ">
        <div onclick="getFilterIngredients('${result2[i].strIngredient}')" class="text-center item-area shadow rounded">
            <i id="ingredientsIcon" class="fa-solid fa-bowl-food fa-3x""></i>
            <h3 class="text-white fw-light">${result2[i].strIngredient}</h3>
            <p class="text-white">${result2[i].strDescription.split(" ").splice(0, 12).join(" ")}</p>
        </div>
        </div>`
        }
        $('#rowData').html(box);
    }
}


// Display Details of Ingredients
async function getFilterIngredients(ingredients) {
    let xml = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    let result = await xml.json();
    result2 = result.meals
    console.log(result2);
    displayFilterIngredients()
}
function displayFilterIngredients() {
    let box = ''
    for (let i = 0; i < result2.length; i++) {
        box += `<div class="col-md-6 col-lg-3 ">
        <div onclick="getMeal('${result2[i].idMeal}')" class="item shadow rounded position-relative">
            <img src=${result2[i].strMealThumb} class="w-100 " alt="">
            <div class="layer">
                <h2 class="ps-2">${result2[i].strMeal}</h2>
            </div>
        </div>
        </div>`
    }
    $('#rowData').html(box);
}


// Contact
$('#contact').click(() => {
    $('#rowData').html(` `);
    $('nav').animate({ left: `${-navWidth}px` }, 500)
    $('.nav-header-mark i').removeClass('fa-times')
    $('#search-container').removeClass('d-block')
    $('.contact-inputs').addClass('d-block')
})
let userName = document.getElementById('userName')
let userEmail = document.getElementById('userEmail')
let userPhone = document.getElementById('userPhone')
let userAge = document.getElementById('userAge')
let userPassword = document.getElementById('userPassword')
let userRePassword = document.getElementById('userRePassword')

function disabledbtn() {
    // Validation for Name

    if (userNameValidation() == true) {
        $('#userName').addClass('is-valid')
        $('#userName').removeClass('is-invalid')
        $('.alertName').removeClass('d-block')
    } else if (userNameValidation() == false) {
        $('#userName').addClass('is-invalid')
        $('#userName').removeClass('is-valid')
        $('.alertName').addClass('d-block')
    }

    // Validation for Email
    if (userEmailValidation() == true) {
        $('#userEmail').addClass('is-valid')
        $('#userEmail').removeClass('is-invalid')
        $('.alertEmail').removeClass('d-block')
    } else if (userEmailValidation() == false) {
        $('#userEmail').addClass('is-invalid')
        $('#userEmail').removeClass('is-valid')
        $('.alertEmail').addClass('d-block')
    }

    // Validation for Phone
    if (userPhoneValidation() == true) {
        $('#userPhone').addClass('is-valid')
        $('#userPhone').removeClass('is-invalid')
        $('.alertPhone').removeClass('d-block')
    } else if (userPhoneValidation() == false) {
        $('#userPhone').addClass('is-invalid')
        $('#userPhone').removeClass('is-valid')
        $('.alertPhone').addClass('d-block')
    }

    // Validation for Age
    if (userAgeValidation() == true) {
        $('#userAge').addClass('is-valid')
        $('#userAge').removeClass('is-invalid')
        $('.alertAge').removeClass('d-block')
    } else if (userAgeValidation() == false) {
        $('#userAge').addClass('is-invalid')
        $('#userAge').removeClass('is-valid')
        $('.alertAge').addClass('d-block')
    }

    // Validation for Password
    if (userPasswordValidation() == true) {
        $('#userPassword').addClass('is-valid')
        $('#userPassword').removeClass('is-invalid')
        $('.alertPassword').removeClass('d-block')
    } else if (userPasswordValidation() == false) {
        $('#userPassword').addClass('is-invalid')
        $('#userPassword').removeClass('is-valid')
        $('.alertPassword').addClass('d-block')
    }

    // Validation for RePassword
    if (userRePasswordValidation() == true) {
        $('#userRePassword').addClass('is-valid')
        $('#userRePassword').removeClass('is-invalid')
        $('.alertRePassword').removeClass('d-block')
    } else if (userRePasswordValidation() == false) {
        $('#userRePassword').addClass('is-invalid')
        $('#userRePassword').removeClass('is-valid')
        $('.alertRePassword').addClass('d-block')
    }
    
    if (userNameValidation() && userEmailValidation() && userPhoneValidation() && userAgeValidation() && userPasswordValidation() && userRePasswordValidation()) {
        $('#btn').removeAttr('disabled')
    } else {
        $('#btn').attr('disabled', 'true')
    }
}


userName.addEventListener('keyup', disabledbtn)
function userNameValidation() {
    return /^[a-z]{1,}$/ig.test($('#userName').val())
}

userEmail.addEventListener('keyup', disabledbtn)
function userEmailValidation() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($('#userEmail').val())
}

userPhone.addEventListener('keyup', disabledbtn)
function userPhoneValidation() {
    return /^(002)?(01)[0125]{1}[0-9]{8}$/.test($('#userPhone').val())
}

userAge.addEventListener('keyup', disabledbtn)
function userAgeValidation() {
    return /(^[1-9]{1}[0-9]{1}|100)$/.test($('#userAge').val())
}

userPassword.addEventListener('keyup', disabledbtn)
function userPasswordValidation() {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test($('#userPassword').val())
}

userRePassword.addEventListener('keyup', disabledbtn)
function userRePasswordValidation() {
    return userPassword.value == userRePassword.value
}