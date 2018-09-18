// main_data
window.main_data = {
  familyName: "Bui",
  firstName: "Minh Thu",
  zipCode: "1790084", // click btn search
  email: "test2345678@gmail.com",
  emailConfirmation: "test2345678@gmail.com",
  tel: "0982347884",
  password: "test1234@gmail.com",
  passwordConfirmation: "test1234@gmail.com",
  familyNameKana: "ブイ",
  firstNameKana: "トゥ",
  corporateName: "テモナ",
  department: "テクニカル",
  subTel: "0982347884",
  genderShopId: 1, // radio
  jobShop: "1", //select
  birthYear: "1992",//select
  birthMonth: "10",//select
  birthDay: "10",//select
  subEmail: "subEmail@gmail.com",
  preferredDeliveryOn: "2018-09-30",
  preferredDeliveryTimeZoneId: "100",// select
  "payment_method_shop[payment_method_id]": 11,
  isMailAccepted: true,
  quantity: 1
}

/* Check shop_shipping_method */
// is_scheduled_delivery_on == true && is_time_zone_available == true
// →  shop_shipping_method will be 1 of below shipping_method
// 飛脚宅配便, 飛脚航空便, 飛脚クール便, 飛脚クール便(冷凍), 宅急便, 宅急便コンパクト, クール宅急便, クール宅急便(冷凍), ゆうパック, チルドゆうパック, チルドゆうパック(冷凍), 飛脚クール便, 飛脚クール便(冷凍), ゆうパック, チルドゆうパック, チルドゆうパック(冷凍), 飛脚航空便, 宅急便, 宅急便コンパクト, クール宅急便, クール宅急便(冷凍)
// → Can use main_data for test
/*--------------------------------------------------------------------------------*/


// is_scheduled_delivery_on == true && is_time_zone_available == false
// →  shop_shipping_method will be 1 of below shipping_method
// 飛脚宅配便
// → Can use main_data for test

/*--------------------------------------------------------------------------------*/

// is_scheduled_delivery_on == false && is_time_zone_available == false
// →  shop_shipping_method will be 1 of below shipping_method
// "飛脚メール便, ゆうパケット, レターパック, スマートレター, ゆうメール, ネコポス, クロネコDM便, テスト"
// → Can use main_data for test

/* Check for payment_method_shop */
var PAYMENT_METHOD_IDS = {
  zeus: 1,
  gmo: 2,
  np: 4,
  amazon_pay: 13,
  bank_transfer: 15
}

function setDataForZeus() {
  window.main_data["payment_method_shop[payment_method_id]"] = 1;
  window.main_data.expiredMonth = "1";
  window.main_data.expiredYear = "2019";
  window.main_data.securityCode = window.securityCode || "111";
  window.main_data.cardNumber = window.cardNumber || "4111111111111111";
  window.main_data.holderName = window.holderName || "HATA";
}

function setDataForGMO() {
  window.main_data["payment_method_shop[payment_method_id]"] = 2;
  window.main_data.expiredMonth = "2";
  window.main_data.expiredYear = "2019";
  window.main_data.securityCode = window.securityCode || "111";
  window.main_data.cardNumber = window.cardNumber || "4290221691131597";
  window.main_data.holderName = window.holderName || "HATA";
}

function setDataForNp() {
  window.main_data["payment_method_shop[payment_method_id]"] = 4;
}

function setDataForBankTransfer() {
  window.main_data["payment_method_shop[payment_method_id]"] = 15;
}

function setDataForPaymentMethodShop() {
  var paymentMethodId = document.getElementById("payment_method_shop_id").value;
  var name = "payment_method_shop[payment_method_id]";
  var elements = document.querySelectorAll('[name="' + name + '"][value="' + paymentMethodId + '"]');
  if (elements.length === 0) {
    console.error("Do not support selected paymentMethod");
    return;
  }

  switch (parseInt(paymentMethodId)) {
    case PAYMENT_METHOD_IDS.zeus:
      setDataForZeus();
      break;
    case PAYMENT_METHOD_IDS.gmo:
      setDataForGMO();
      break;
    case PAYMENT_METHOD_IDS.np:
      setDataForNp();
      break;
    case PAYMENT_METHOD_IDS.bank_transfer:
      setDataForBankTransfer();
      break;
    default:
      console.error("Do not support paymentMethod: " + paymentMethodId);
      break;
  }
}

function setDataForProductCase(lp_code, lp_case) {
  console.log("setDataForProductCase " + lp_code);
  switch (lp_code) {
    case "lp_product_age_limit":
      console.log("case "  + lp_case);
      if (lp_case === "invalid") {window.main_data.birthYear = "2010";}
      break;
    case "lp_product_max_quantity_for_user":
      if (lp_case === "invalid") {
        window.main_data.quantity = 3;
      } else {
        window.main_data.quantity = 1;
      }
      break;
    case "lp_product_min_quantity_per_purchase":
      if (lp_case === "invalid") {
        window.main_data.quantity = 1;
      } else {
        window.main_data.quantity = 3;
      }
      break;
    default:
      break;
  }
}
