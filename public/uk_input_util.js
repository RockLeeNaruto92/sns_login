function inputTo(id, value){
  var element = document.getElementById(id);

  console.log("%c Input to element " + id + " with value: " + value, 'background: #222; color: #bada55');

  if (!element) {
    console.warn("Do not found element with id: " + id);
    return;
  }

  element.focus();
  setTimeout(function(){
    element.value = value;
    var event = createNewEvent('change');

    element.dispatchEvent(event);
  }, 1000);
}

function setCheckBox(id, value) {
  var element = document.getElementById(id);

  console.log("%c Check to checkbox element " + id + " with value: " + value, 'background: #222; color: #bada55');

  if (!element) {
    console.warn("Do not found element with id: " + id);
    return;
  }

  element.focus();
  setTimeout(function(){
    element.checked = value;
    var event = createNewEvent('change');

    element.dispatchEvent(event);
  }, 1000);
}

function selectRadio(name, value) {
  var elements = document.querySelectorAll('[name="' + name + '"][value="' + value + '"]');

  console.log("%c Select radio element " + name + " with value: " + value, 'background: #222; color: #bada55');

  if (elements.length === 0){
    console.warn("Do not found element with name: " + name + " - value: " + value);
    return;
  }
  elements[0].focus();

  setTimeout(function() {
    elements[0].checked = true;

    var event = createNewEvent('change');

    elements[0].dispatchEvent(event);
  }, 1000);
}

function focusTo(id) {
  var element = document.getElementById(id);

  console.log("%c Focus to element  " + id, 'background: #222; color: #bada55');

  if (!element) {
    console.warn("Do not found element with id: " + id);
    return;
  }

  element.focus();
}

function clickBtn(id) {
  var element = document.getElementById(id);

  console.log("%c Click to element " + id, 'background: #222; color: #bada55');

  if (!element) {
    console.log("Do not found element with id: " + id);
    return;
  }

  var event = createNewEvent('click');

  element.dispatchEvent(event);
}

window.index = 0;

var inputFields = [
  "email", "emailConfirmation", "tel", "password", "passwordConfirmation",
  "corporateName", "department", "subTel", "birthMonth", "birthYear",
  "subEmail", "birthDay", "preferredDeliveryTimeZoneId", "preferredDeliveryOn",
  "zipCode", "jobShop", "familyName", "firstName", "familyNameKana", "firstNameKana"
]

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

function fillInputDataToForm(data) {
  var value = data[inputFields[window.index]];
  var name = "jsUk" + inputFields[window.index].capitalize();

  inputTo(name, value);

  window.index ++;

  if (window.index < inputFields.length) {
    setTimeout(function() {
      fillInputDataToForm(data)
    }, 1000);
  } else {
    setTimeout(function() {
      clickZipcodeSearchBtn();
    }, 1000);
  }
}

function fillBirthDayToForm(data) {
  inputTo("birthDay", data.birthDay);
}

function clickZipcodeSearchBtn() {
  clickBtn("jsUkSearchAddressBtn");
  setTimeout(function(){
    focusTo("jsUkStateId");
    setTimeout(function(){
      focusTo("jsUkCity");
      setTimeout(function(){
        focusTo("jsUkAddress");
        setTimeout(function(){
          focusTo("jsUkBuildingName");
          setTimeout(function(){
            fillRadioDataToForm(window.main_data);
            setTimeout(function(){
              setCheckBox("jsUkIsMailAccepted", window.main_data.isMailAccepted);
              setCheckBox("jsUkAgreePrivacyPolicy", true);
              setTimeout(inputToQuantityElements, 5000);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}



function inputToQuantityElements() {
  var quantityElements = document.getElementsByClassName("merchandise-quantity-selector");

  inputToQuantityElement(0, quantityElements);
}

function inputToQuantityElement(index, elements) {
  elements[index].value = window.main_data.quantity || "1";

  console.log("%c Input to quantity element " + index + " with value " + window.main_data.quantity, 'background: #222; color: #bada55');

  var event = createNewEvent('change');

  elements[index].dispatchEvent(event);

  index ++;
  if (index < elements.length) {
    setTimeout(function(){
      inputToQuantityElement(index, elements);
    }, 1000);
  }
}

function fillRadioDataToForm(data) {
  selectRadio("genderShopId", data["genderShopId"]);
  setTimeout(function(){
    selectRadio("payment_method_shop[payment_method_id]", data["payment_method_shop[payment_method_id]"]);
    setTimeout(function(){
      inputTo("jsUkExpiredMonth", window.main_data.expiredMonth);
      setTimeout(function(){
        inputTo("jsUkExpiredYear", window.main_data.expiredYear);
        setTimeout(function(){
          inputTo("jsUkSecurityCode", window.main_data.securityCode);
          setTimeout(function(){
            inputTo("jsUkCardNumber", window.main_data.cardNumber);
            setTimeout(function(){
              inputTo("jsUkHolderName", window.main_data.holderName);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
}

function fillFormWithData(data) {
  fillInputDataToForm(data);
}

function onSubmit() {
  var shopShipingmethodId = document.getElementById("shipping_method_shop_id").value;
  var lp_code = "lp_ssm_" + shopShipingmethodId;

  reAddSdkCode(lp_code);

  setTimeout(function(){
    window.setTimeout(function(){
      setDataForPaymentMethodShop();
      setTimeout(function() {
        fillFormWithData(window.main_data);
      }, 5000)
    }, 1000);
  }, 10000);

  return false;
}

function onProductTestCaseSubmit() {
  var lp_code = document.getElementById("product_test_case").value.split(":")[0];
  var lp_case = document.getElementById("product_test_case").value.split(":")[1];

  reAddSdkCode(lp_code);

  setTimeout(function(){
    window.setTimeout(function(){
      setDataForProductCase(lp_code, lp_case);
      setTimeout(function() {
        fillFormWithData(window.main_data);
      }, 5000)
    }, 1000);
  }, 5000);
}

function reAddSdkCode(lp_code) {
  window.index = 0;
  var sdkScript = document.getElementById("ukokkei-sdk");

  if (sdkScript){sdkScript.remove();}
  document.getElementById("ukokkei-script").innerHTML = "";
  document.getElementById("ukokkei-landing-page-container").innerHTML = "";

  var script = document.createElement("script");
  script.innerHTML = "" +
    "window.ukLpAsyncInit = function() {" +
      "UK.initLp({" +
        "cart_domain: 'http://c29d689c.ngrok.io'," +
        "lp_form_code: '" + lp_code + "'" +
      "});" +
    "};" +
    "(function(d, s, id) {" +
       "var js, hjs = d.getElementsByTagName(s)[0];" +
       "if (d.getElementById(id)) {return;};" +
       "js = d.createElement(s);" +
       "js.async = true;" +
       "js.id = id;" +
       "js.src = 'http://c29d689c.ngrok.io/ukokkei-sdk.js'; " +
       "hjs.parentNode.insertBefore(js, hjs);" +
     "}(document, 'script', 'ukokkei-sdk'));";

  document.getElementById("ukokkei-script").appendChild(script);
}


function createNewEvent(eventName) {
  if(typeof(Event) === 'function') {
    var event = new Event(eventName);
    return event;
  } else{
    var event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
    return event;
  }
}
