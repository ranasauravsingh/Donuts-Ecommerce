function localStorage_setitem(list) {
	localStorage.setItem("Cart", JSON.stringify(list));
}

function localStorage_getitem() {
	if (localStorage.getItem("Cart") == null) {
		var list = [];
		var id = 1;
	} else {
		var list = JSON.parse(localStorage.getItem("Cart"));
		var id = list[list.length - 1].cId + 1;
	}
	return { list, id };
}

var productList = [
	{
		pId: 1,
		pName: "chesse deluxe",
		pImg: "./saurav_donutsImages/burger.webp",
		price: "$9.00",
		cPrice: "$11.00",
	},
	{
		pId: 2,
		pName: "orange juice",
		pImg: "./saurav_donutsImages/orange juice.webp",
		price: "$2.00",
		cPrice: "$5.00",
	},
	{
		pId: 3,
		pName: "french toast",
		pImg: "./saurav_donutsImages/donut.jpg",
		price: "$3.00",
		cPrice: "$5.00",
	},
	{
		pId: 4,
		pName: "butter croissants",
		pImg: "./saurav_donutsImages/croissants.webp",
		price: "$12.00",
		cPrice: "$15.00",
	},
	{
		pId: 5,
		pName: "pommes frites",
		pImg: "./saurav_donutsImages/fries.webp",
		price: "$10.00",
		cPrice: "$13.00",
	},
	{
		pId: 6,
		pName: "paneer burrito",
		pImg: "./saurav_donutsImages/paneer wrap.webp",
		price: "$12.00",
		cPrice: "$15.00",
	},
];

function viewCard() {
	var outPut = "";
	for (var p in productList) {
		outPut +=
			"<div class='foodCard'><div class='foodImage'><img id='foodImg" +
			(parseInt(p) + 1) +
			"' src='" +
			productList[p].pImg +
			"' alt='' /> <div class='cardFunction mainFlex spaceE'> <i class='fa fa-light fa-heart hideIcon' onclick='wish(this)'></i> <div onclick=" +
			"insert('foodName" +
			(parseInt(p) + 1) +
			"','price" +
			(parseInt(p) + 1) +
			"','foodImg" +
			(parseInt(p) + 1) +
			"')" +
			" class='add' id='card" +
			(parseInt(p) + 1) +
			"'> <h5>add to cart</h5> </div> <i class='fa fa-light fa-eye hideIcon'></i> </div> </div> <div class='foodDetails'> <h2 id='foodName" +
			(parseInt(p) + 1) +
			"'>" +
			productList[p].pName +
			"</h2> <h3 class='foodPrice' id='price" +
			(parseInt(p) + 1) +
			"'>" +
			productList[p].price +
			" <span>" +
			productList[p].cPrice +
			"</span></h3> </div> </div>";
	}

	$("#mainCart").html(outPut);
}

function wish(val) {
	var curWish = $("#wishCnt").html();
	if (val.style.color == "red") {
		val.style.color = "#f2b33d";
		curWish--;
	} else {
		val.style.color = "red";
		curWish++;
	}
	val.style.transition = "all 0.5s ease";

	$("#wishCnt").html(curWish);
}
function insert(fName, price, fImg) {
	var cardPrice = $("#" + price + "").html();
	cardPrice = parseFloat(cardPrice.substr(1, 5));

	var cartPrice = $("#priceCnt").html();
	cartPrice = parseFloat(cartPrice.substr(1));

	var cartCnt = $("#foodCnt").html();
	cartCnt++;

	var dummy = {
		cId: cId++,
		cName: $("#" + fName + "").html(),
		cPrice: cardPrice,
		cImg: $("#" + fImg + "").attr("src"),
	};
	cartList.push(dummy);
	localStorage_setitem(cartList);

	cartPrice += cardPrice;
	cartPrice = cartPrice.toFixed(2);
	// console.log(cartPrice);

	$("#priceCnt").html("$" + cartPrice);
	$("#foodCnt").html(cartCnt);

	localStorage.setItem("Grand Total", JSON.stringify($("#priceCnt").html()));
}

function createRow() {
	var row = [];
	for (var c in cartList) {
		row += [
			"<div class='cartRow'><div class='cartItem'><div class='mainFlex spaceB'><div class='cartImage'><img src='",
			cartList[c].cImg,
			"' alt='' /></div><div class='cartDes'><a href=''><h4>",
			cartList[c].cName,
			"</h4></a><h5>size: s</h5><h5 id='singleCartPrice",
			c,
			"'>$ ",
			cartList[c].cPrice,
			".00</h5></div></div></div><div class='cartQuantity'><div class='cnt'><span id='incItem' onclick=",
			"incCartItem('cartQuantity",
			c,
			"','cartSubtotal",
			c,
			"','singleCartPrice",
			c,
			"')>+</span><input onchange=",
			"updateTotPrice('cartQuantity",
			c,
			"','cartSubtotal",
			c,
			"','singleCartPrice",
			c,
			"') type='text' value=1 id='cartQuantity",
			c,
			"'/><span id='decItem' onclick=",
			"decCartItem('cartQuantity",
			c,
			"','cartSubtotal",
			c,
			"','singleCartPrice",
			c,
			"',",
			c,
			")>-</span></div><input onclick=",
			"removeCard('cartQuantity",
			c,
			"','cartSubtotal",
			c,
			"',",
			c,
			") type='button' value='remove' id='removeBtn' /> </div> <div class='cartTotal'><h5 id='cartSubtotal",
			c,
			"'>$ ",
			cartList[c].cPrice,
			".00</h5></div></div>",
		].join("");
	}
	$("#midCart").html(row);
	// console.log(row);
}

function switchWish() {
	$("#currPage").html("your wish list");
	$("#homePage").css("display", "none");
	$("#cartPage").css("display", "none");
	$("#wishPage").css("display", "block");
}

function switchCart() {
	createRow();
	$("#totalItems").html(cartList.length + " item");
	$("#currPage").html("your shopping cart");
	$("#homePage").css("display", "none");
	$("#cartPage").css("display", "block");
	$("#wishPage").css("display", "none");
}

function switchHome() {
	$("#currPage").html("donuts");
	$("#homePage").css("display", "block");
	$("#cartPage").css("display", "none");
	$("#wishPage").css("display", "none");
}

function incCartItem(inpVal, totalPrice, singlePrice) {
	var inc = parseInt($("#" + inpVal + "").val()) + 1;
	$("#" + inpVal + "").val(inc);

	var tItems = $("#totalItems").html();
	tItems = parseInt(tItems.substr(0, 2));
	tItems++;
	$("#totalItems").html(tItems + " item");

	updateTotPrice(inpVal, totalPrice, singlePrice);
}

function decCartItem(inpVal, totalPrice, singlePrice, fId) {
	if (parseInt($("#" + inpVal + "").val()) > 1) {
		var dec = parseInt($("#" + inpVal + "").val()) - 1;
		$("#" + inpVal + "").val(dec);

		var tItems = $("#totalItems").html();
		tItems = parseInt(tItems.substr(0, 2));
		tItems--;
		$("#totalItems").html(tItems + " item");

		updateTotPrice(inpVal, totalPrice, singlePrice);
	} else {
		removeCard(inpVal, totalPrice, fId);
	}
}

function updateTotPrice(inpVal, totalPrice, singlePrice) {
	var sPrice = $("#" + singlePrice + "").html();
	sPrice = parseFloat(sPrice.substr(1));

	var tPrice = $("#" + totalPrice + "").html();
	tPrice = parseFloat(tPrice.substr(1));

	var cartPrice = $("#priceCnt").html();
	cartPrice = parseFloat(cartPrice.substr(1));
	cartPrice -= tPrice;

	var prod = parseFloat(sPrice * parseFloat($("#" + inpVal + "").val()));
	cartPrice += prod;
	prod = prod.toFixed(2);
	cartPrice = cartPrice.toFixed(2);
	$("#" + totalPrice + "").html("$" + prod);
	$("#priceCnt").html("$" + cartPrice);
}

function removeCard(inpVal, totalPrice, fId) {
	var tItems = $("#totalItems").html();
	tItems = parseFloat(tItems.substr(0, 2));
	tItems = parseInt(tItems - parseFloat($("#" + inpVal + "").val()));
	$("#totalItems").html(tItems + " item");

	var pCnt = $("#priceCnt").html();
	pCnt = parseFloat(pCnt.substr(1));

	var tPrice = $("#" + totalPrice + "").html();
	tPrice = parseFloat(tPrice.substr(1));
	pCnt = parseFloat(pCnt - tPrice);
	pCnt = pCnt.toFixed(2);
	$("#priceCnt").html("$" + pCnt);

	localStorage.setItem("Grand Total", JSON.stringify($("#priceCnt").html()));
	cartList.splice(fId, 1);
	localStorage_setitem(cartList);
	$("#foodCnt").html(cartList.length);
	createRow();
}

function clrCart() {
	if (confirm("Are you sure, you want to Clear the Cart ?")) {
		localStorage.clear();
		switchHome();
		createRow();
		$("#priceCnt").html("$0.00");
		$("#foodCnt").html("0");
	}
}

var cartList = localStorage_getitem().list;
var cId = localStorage_getitem().id;
$("#foodCnt").html(cartList.length);
if (cartList.length != 0) {
	$("#priceCnt").html(JSON.parse(localStorage.getItem("Grand Total")));
} else {
	$("#priceCnt").html("$0.00");
}
viewCard();
// console.log($);

/*



	var cartImg = document.createElement('img');     		// creating a IMG tag
	cartImg.src = 'cartList[0].cImg';						// adding the location to img src attribute from cartList[];

	var cImage = document.createElement('div');				// creating a div
	cImage.classList.add('cartImage');						// adding a class named 'cartImage'

	cImage.appendChild(cartImg);							// finally appending the img to the div





*/
