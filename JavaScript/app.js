async function getRandomUser() {
    const response = await fetch('https://randomuser.me/api//?results=8');
    const data = await response.json();

    const user1 = data.results[0];
    displayUser1(user1);
    console.log(user1);

    const user2 = data.results[1];
    displayUser2(user2);
    console.log(user2);

}
function displayUser1(user1) {
    image1.setAttribute('src', `${user1.picture.large}`);
    name1.innerText = `${user1.name.title} ${user1.name.first} ${user1.name.last}`;
    email1.innerText = `${user1.email}`;
    phone1.innerText = `${user1.phone}`;
    city1.innerText = `${user1.location.city}`;
}
function displayUser2(user2) {
    image2.setAttribute('src', `${user2.picture.large}`);
    name2.innerText = `${user2.name.title} ${user2.name.first} ${user2.name.last}`;
    email2.innerText = `${user2.email}`;
    phone2.innerText = `${user2.phone}`;
    city2.innerText = `${user2.location.city}`;
}
getRandomUser();


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    var hireButtons = document.getElementsByClassName('hire-button')
    for (var i = 0; i < hireButtons.length; i++) {
        var button = hireButtons[i]
        button.addEventListener('click', hireClicked)
    }
}
function removeProfile(event) {
     let confirmation = confirm('Are you sure? Do you really wanna Delete the Profile!', '');
        if(confirmation) {
            var buttonClicked = event.target
            buttonClicked.parentElement.parentElement.remove()
        }
        else {
            return;
        }
}



function hireClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('hire-name')[0].innerText
    var email = shopItem.getElementsByClassName('hire-email')[0].innerText
    var phone = shopItem.getElementsByClassName('hire-phone')[0].innerText
    var city = shopItem.getElementsByClassName('hire-city')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('hire-image')[0].src
    hireProfile(title, email, phone, city, imageSrc)
}
function hireProfile(title, email, phone, city, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('title')

    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `<div class="card">
                            <div class="image" title="Profile Pic">
                                <img id="image1" class="hire-image" src="${imageSrc}" alt="">
                            </div>
                            <div class="text">
                                <h3 id="name1" class="title">${title}</h3>
                                <p id="email1" class="hire-email">${email}</p>
                                <p id="phone1" class="hire-phone">${phone}</p>
                                <p id="city1" class="hire-city">${city}</p>
                                <button id="butn" class="remove" title="Delete the Profile">Remove</button>
                            </div>
                           </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('remove')[0].addEventListener('click', removeProfile)
}