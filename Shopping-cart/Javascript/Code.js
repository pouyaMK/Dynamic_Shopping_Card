window.onload = function () {
  LoadSave();
  CreateShoppingCart();
  UpdateShoppingCartDOM();
};
let ItemsArray = [
  { ID: "Item-1", Name: "واکی تاکی", Image: "Images/WalkiTalki.jpg", Price: 1500000, Weight: 250, AvailableAmount: 16 },
  { ID: "Item-2", Name: "رادیو قدیمی", Image: "Images/Radio.jpg", Price: 300000, Weight: 1200, AvailableAmount: 25 },
  { ID: "Item-3", Name: "فنجان قوه خوری سفید", Image: "Images/CoffeCup.jpg", Price: 90000, Weight: 100, AvailableAmount: 100 },
  { ID: "Item-4", Name: "عطر زنانه", Image: "Images/FemalePerfume.jpg", Price: 600000, Weight: 400, AvailableAmount: 140 },
  { ID: "Item-5", Name: "تبر ایران پتک", Image: "Images/Axe.jpg", Price: 450000, Weight: 3000, AvailableAmount: 15 },
  { ID: "Item-6", Name: "بافور ناصرالدین شاهی", Image: "Images/Bafoor.jpg", Price: 700000, Weight: 300, AvailableAmount: 10 },
];
let UserCart = [
  { ID: "Item-1", Count: 1 },
  { ID: "Item-2", Count: 1 },
  { ID: "Item-3", Count: 1 },
  { ID: "Item-4", Count: 1 },
  { ID: "Item-5", Count: 1 },
  { ID: "Item-6", Count: 1 },
];
let ShoppingCart = {
  ItemsCost: 0,
  ItemsCount: 0,
  ItemsWeight: 0,
  ShipmentCost: 0,
  Discount: 0,
  FinalPrice: 0,
  AppliedRedeemCode: [],
};
let User = {
  UsedRedeemCodes: [],
};
let RedeemsCodes = [
  { Key: "arash_js", Discount: 20, Remains: 10, Expires: "2024-00-14T23:00:00" },
  { Key: "jill_valentine", Discount: 10, Remains: 5, Expires: "2024-03-14T23:00:00" },
  { Key: "im_gonna_fly_away", Discount: 5, Remains: 4, Expires: "2024-02-17T23:00:00" },
  { Key: "hello_world", Discount: 9, Remains: 3, Expires: "2024-01-16T23:00:00" },
];
function CreateListOfItems() {
  let ItemsList = document.getElementById("items-list");
  ItemsArray.forEach((Item) => {
    let ItemElement = document.createElement("section");
    ItemElement.className = "item";
    ItemsList.appendChild(ItemElement);
    let AddToCartButton = document.createElement("button");
    AddToCartButton.id = Item.ID;
    AddToCartButton.className = "add-to-cart-button";
    AddToCartButton.innerHTML = "<img src='Icons/ShoppingIcon.png'>";
    AddToCartButton.addEventListener("click", () => {
      AddToCart(Item.ID);
    });
    ItemElement.appendChild(AddToCartButton);
    let ItemInfoContainer = document.createElement("section");
    ItemInfoContainer.className = "item-info-container";
    ItemElement.appendChild(ItemInfoContainer);
    let Name = document.createElement("h2");
    Name.className = "item-name";
    Name.innerText = Item.Name;
    ItemInfoContainer.appendChild(Name);
    let Price = document.createElement("span");
    Price.className = "item-price";
    Price.innerText = `${Item.Price} T`;
    ItemInfoContainer.appendChild(Price);
  });
}
//
function CreateShoppingCart() {
  const ShoppingCart = document.createElement("section");
  const ShoppingCartHeader = document.createElement("header");
  const ShoppingCartTitle = document.createElement("span");
  const ShoppingCartIcon = document.createElement("img");
  const ShoppingCartRow = document.createElement("div");
  const ShoppingCartItems = document.createElement("div");
  const ShoppingCartCalcSection = document.createElement("div");
  const ShoppingCartInfos = document.createElement("div");
  const NumberOfItems = document.createElement("span");
  const PriceOfItems = document.createElement("span");
  const WeightOfItems = document.createElement("span");
  const ShipmentCost = document.createElement("span");
  const Discount = document.createElement("span");
  const FinalPrice = document.createElement("span");
  const DiscountSection = document.createElement("div");
  const DiscountInput = document.createElement("input");
  const DiscountBtn = document.createElement("button");
  const ProceedBtn = document.createElement("button");
  //
  ShoppingCart.id = "shopping-cart";
  ShoppingCartHeader.id = "shopping-cart-header";
  ShoppingCartTitle.id = "shopping-cart-title";
  ShoppingCartIcon.id = "shopping-cart-icon";
  ShoppingCartRow.id = "shopping-cart-row";
  ShoppingCartItems.id = "shopping-cart-items";
  ShoppingCartCalcSection.id = "shopping-cart-calc-section";
  ShoppingCartInfos.id = "shopping-cart-infos";
  NumberOfItems.id = "number-of-items";
  PriceOfItems.id = "price-of-items";
  WeightOfItems.id = "weight-of-items";
  ShipmentCost.id = "shipment-cost";
  Discount.id = "discount";
  FinalPrice.id = "final-price";
  DiscountSection.id = "discount-section";
  DiscountInput.id = "discount-input";
  DiscountBtn.id = "discount-btn";
  ProceedBtn.id = "proceed-btn";
  //
  ShoppingCartTitle.innerText = "سبد خرید";
  NumberOfItems.innerText = "تعداد محصولات : 6";
  PriceOfItems.innerText = "قیمت محصولات : 2،750،000";
  WeightOfItems.innerText = "وزن محموله : 2500 گرم";
  ShipmentCost.innerText = "هزینه پست : 87،000 تومان";
  Discount.innerText = "تخفیف : 0%";
  FinalPrice.innerText = "هزینه نهایی : 2،850،000";
  DiscountInput.placeholder = "کد تخفیف";
  DiscountBtn.innerText = "اعمال کد";
  ShoppingCartIcon.src = "Icons/ShoppingCartIcon.png";
  ProceedBtn.innerText = "ادامه خرید";
  //
  DiscountBtn.addEventListener("click", () => {
    RedeemeCodeValidator(DiscountInput.value);
  });
  //
  ShoppingCart.append(ShoppingCartHeader, ShoppingCartRow);
  ShoppingCartRow.append(ShoppingCartItems, ShoppingCartCalcSection);
  ShoppingCartHeader.append(ShoppingCartTitle, ShoppingCartIcon);
  ShoppingCartCalcSection.append(ShoppingCartInfos, DiscountSection, ProceedBtn);
  ShoppingCartInfos.append(NumberOfItems, PriceOfItems, WeightOfItems, ShipmentCost, Discount, FinalPrice);
  DiscountSection.append(DiscountInput, DiscountBtn);
  document.body.append(ShoppingCart);
}
function UpdateShoppingCartDOM() {
  if (UserCart.length === 0) {
    DisplayEmptyCart();
    return;
  }
  const ShoppingCartItems = document.getElementById("shopping-cart-items");
  ShoppingCartItems.innerHTML = "";
  UserCart.forEach((Item) => {
    let ItemData = {
      ...ItemsArray.find((OriginialItem) => {
        return OriginialItem.ID === Item.ID;
      }),
    };
    const ItemElement = document.createElement("section");
    const RemoveItemBtn = document.createElement("button");
    const RemoveItemBtnIcon = document.createElement("img");
    const ItemImage = document.createElement("img");
    const Name = document.createElement("h2");
    const ItemCountAndPriceContainer = document.createElement("div");
    const ItemCount = document.createElement("div");
    const ItemCountInput = document.createElement("input");
    const IncreaseItemCountBtn = document.createElement("button");
    const DecreaseItemCountBtn = document.createElement("button");
    const IncreaseItemCountBtnIcon = document.createElement("img");
    const DecreaseItemCountBtnIcon = document.createElement("img");
    const Price = document.createElement("span");
    //
    ItemElement.id = Item.ID;
    RemoveItemBtn.className = "remove-item-btn";
    RemoveItemBtnIcon.className = "remove-item-btn-icon";
    ItemElement.className = "item";
    Name.className = "item-name";
    ItemCountAndPriceContainer.id = "item-count-and-price-container";
    ItemCount.className = "item-count";
    ItemCountInput.className = "item-count-input";
    ItemCountInput.type = "number";
    ItemCountInput.lang = "fa";
    ItemCountInput.min = 1;
    ItemCountInput.max = FindItemInItemsArray(Item.ID).AvailableAmount;
    ItemImage.className = "item-image";
    IncreaseItemCountBtn.className = "increase-item-count-btn";
    DecreaseItemCountBtn.className = "decrease-item-count-btn";
    IncreaseItemCountBtnIcon.className = "item-count-btn-icon";
    DecreaseItemCountBtnIcon.className = "item-count-btn-icon";
    Price.className = "item-price";
    Price.setAttribute("lang", "fa");
    //
    RemoveItemBtnIcon.src = "Icons/DeleteIcon.png";
    ItemImage.src = ItemData.Image;
    IncreaseItemCountBtnIcon.src = "Icons/PlusIcon.png";
    DecreaseItemCountBtnIcon.src = "Icons/MinusIcon.png";
    Name.innerText = ItemData.Name;
    ItemCountInput.value = Item.Count;
    Price.innerText = `${NumberSeperator(ItemData.Price)} تومان`;
    //
    IncreaseItemCountBtn.addEventListener("click", () => {
      if (IncreaseItemCountBtn.className.includes("disabled")) return;
      IncreaseItemCount(Item.ID);
    });
    DecreaseItemCountBtn.addEventListener("click", () => {
      if (DecreaseItemCountBtn.className.includes("disabled")) return;
      DecreaseItemCount(Item.ID);
    });
    RemoveItemBtn.addEventListener("click", () => {
      RemoveFromCart(Item.ID);
    });
    ItemCountInput.addEventListener("input", () => {
      GetItemCount(Item.ID, ItemCountInput.value);
    });
    //
    ShoppingCartItems.appendChild(ItemElement);
    RemoveItemBtn.append(RemoveItemBtnIcon);
    ItemCount.append(DecreaseItemCountBtn, ItemCountInput, IncreaseItemCountBtn);
    ItemCountAndPriceContainer.append(Price, ItemCount);
    IncreaseItemCountBtn.append(IncreaseItemCountBtnIcon);
    DecreaseItemCountBtn.append(DecreaseItemCountBtnIcon);
    ItemElement.append(RemoveItemBtn, ItemImage, Name, ItemCountAndPriceContainer);
    DisableCountBtns(Item.ID);
  });
  UpdateCalcSection();
}
function DisplayEmptyCart() {
  const ShoppingCartRow = document.getElementById("shopping-cart-row");
  ShoppingCartRow.innerHTML = "";
  // Define
  const EmptyCartContainer = document.createElement("div");
  const EmptyCartIcon = document.createElement("img");
  const EmptyCartText = document.createElement("span");
  const GoToShopBtn = document.createElement("button");
  const GoToShopBtnText = document.createElement("span");
  const GoToShopBtnIcon = document.createElement("img");
  // ID
  EmptyCartContainer.id = "empty-cart-container";
  EmptyCartIcon.id = "empty-cart-icon";
  EmptyCartText.id = "empty-cart-text";
  GoToShopBtn.id = "go-to-shop-btn";
  GoToShopBtnText.id = "go-to-shop-btn-text";
  GoToShopBtnIcon.id = "go-to-shop-btn-icon";
  // InnerText and Src
  EmptyCartIcon.src = "Icons/EmptyCartIcon.png";
  EmptyCartText.innerText = "سبد خریدت خالیه یه سر به جنسامون بزن";
  GoToShopBtnText.innerText = "مشاهده محصولات";
  GoToShopBtnIcon.src = "Icons/LeftArrowIcon.png";
  // Append
  GoToShopBtn.append(GoToShopBtnText, GoToShopBtnIcon);
  EmptyCartContainer.append(EmptyCartIcon, EmptyCartText, GoToShopBtn);
  ShoppingCartRow.append(EmptyCartContainer);
}
function AddToCart(ID) {
  let DoesItemExist = UserCart.some((Item) => {
    return Item.ID === ID;
  });
  if (DoesItemExist) return;
  let Index = ItemsArray.findIndex((Item) => {
    return Item.ID === ID;
  });
  UserCart.push(ItemsArray[Index]);
  localStorage.setItem("UserCart", JSON.stringify(UserCart));
  UpdateShoppingCartDOM();
}
function RemoveFromCart(ID) {
  let ItemIndex = UserCart.findIndex((Item) => {
    return Item.ID === ID;
  });
  if (!UserCart[ItemIndex]) return;
  UserCart.splice(ItemIndex, 1);
  Save();
  UpdateShoppingCartDOM();
}
function FindItemInItemsArray(ID) {
  return {
    ...ItemsArray.find((Item) => {
      return Item.ID === ID;
    }),
  };
}
//
function IncreaseItemCount(ID) {
  const ItemCountInput = document.querySelector(`#${ID}  .item-count-input`);
  let ItemInUserCart = UserCart.find((Item) => {
    return Item.ID === ID;
  });
  let OriginalItem = FindItemInItemsArray(ID);
  if (ItemInUserCart.Count < OriginalItem.AvailableAmount) ItemInUserCart.Count++;
  ItemCountInput.value = ItemInUserCart.Count;
  DisableCountBtns(ID);
  UpdateItemPrice(ID);
  UpdateCalcSection();
  Save();
}
function DecreaseItemCount(ID) {
  const ItemCountInput = document.querySelector(`#${ID} .item-count .item-count-input`);
  let ItemInUserCart = UserCart.find((Item) => {
    return Item.ID === ID;
  });
  if (ItemInUserCart.Count > 1) ItemInUserCart.Count--;
  ItemCountInput.value = ItemInUserCart.Count;
  DisableCountBtns(ID);
  UpdateItemPrice(ID);
  UpdateCalcSection();
  Save();
}
function GetItemCount(ID, Value) {
  const ItemCountInput = document.querySelector(`#${ID} .item-count-input`);
  let ItemInUserCart = UserCart.find((Item) => {
    return Item.ID === ID;
  });
  let OriginalItem = FindItemInItemsArray(ID);
  if (+Value <= OriginalItem.AvailableAmount && +Value > 0) ItemInUserCart.Count = +Value;
  if (+Value > OriginalItem.AvailableAmount) {
    ItemCountInput.value = OriginalItem.AvailableAmount;
    alert(`حداکثر موجودی این محصول ${OriginalItem.AvailableAmount} عدد میباشد!`);
  }
  if (+Value < 1) {
    ItemCountInput.value = 1;
    alert(`حداقل تعداد سفارش یک عدد است!`);
  }
  DisableCountBtns(ID);
  UpdateItemPrice(ID);
  UpdateCalcSection();
  Save();
}
function UpdateItemPrice(ID) {
  const ItemPriceElement = document.querySelector(`#${ID} .item-price`);
  let ItemInUserCart = UserCart.find((Item) => {
    return Item.ID === ID;
  });
  let OriginalItem = FindItemInItemsArray(ID);
  ItemPriceElement.innerText = `${NumberSeperator(OriginalItem.Price * ItemInUserCart.Count)} تومان`;
}
function DisableCountBtns(ID) {
  const IncreaseItemCountBtn = document.querySelector(`#${ID} .increase-item-count-btn`);
  const DecreaseItemCountBtn = document.querySelector(`#${ID} .decrease-item-count-btn`);
  const Value = +document.querySelector(`#${ID} .item-count-input`).value;
  let OriginalItem = FindItemInItemsArray(ID);
  if (Value === OriginalItem.AvailableAmount) IncreaseItemCountBtn.classList.add("disabled");
  if (Value < OriginalItem.AvailableAmount) IncreaseItemCountBtn.classList.remove("disabled");
  if (Value === 1) DecreaseItemCountBtn.classList.add("disabled");
  if (Value > 1) DecreaseItemCountBtn.classList.remove("disabled");
}
//
function UpdateCalcSection() {
  const NumberOfItems = document.getElementById("number-of-items");
  const PriceOfItems = document.getElementById("price-of-items");
  const WeightOfItems = document.getElementById("weight-of-items");
  const ShipmentCost = document.getElementById("shipment-cost");
  const Discount = document.getElementById("discount");
  const FinalPrice = document.getElementById("final-price");
  UpdateShoppingCartObj();
  NumberOfItems.innerText = `تعداد محصولات : ${NumberSeperator(CalcNumberOfItems(UserCart))}`;
  PriceOfItems.innerText = `قیمت محصولات :  ${NumberSeperator(ShoppingCart.ItemsCost)} تومان`;
  WeightOfItems.innerText = `وزن محموله :  ${NumberSeperator(ShoppingCart.ItemsWeight)} کیلوگرم`;
  ShipmentCost.innerText = ShoppingCart.ShipmentCost > 0 ? `هزینه پست : ${NumberSeperator(ShoppingCart.ShipmentCost)} تومان` : "هزینه پست : رایگان";
  Discount.innerText = ShoppingCart.Discount ? `تخفیف : ${NumberSeperator(ShoppingCart.Discount)} درصد` : "تخفیف : ندارد";
  FinalPrice.innerText = `هزینه نهایی : ${NumberSeperator(ShoppingCart.FinalPrice)} تومان`;
}
//
function UpdateShoppingCartObj() {
  ShoppingCart.ItemsCost = CalcItemsCost(UserCart);
  ShoppingCart.ItemsCount = CalcNumberOfItems(UserCart);
  ShoppingCart.ItemsWeight = CalcWeightOfItems(UserCart);
  ShoppingCart.ShipmentCost = CalcShipmentCost(UserCart);
  ShoppingCart.Discount = GetDiscountValueFromAppliedRedeemCode();
  ShoppingCart.FinalPrice = CalcFinalPrice();
}
function CalcItemsCost(UserCart) {
  let ItemsCost = 0;
  ItemsArray.forEach((OriginalItem) => {
    UserCart.forEach((Item) => {
      if (OriginalItem.ID === Item.ID) ItemsCost += OriginalItem.Price * Item.Count;
    });
  });
  return ItemsCost;
}
function CalcNumberOfItems(UserCart) {
  let NumberOfItems = 0;
  UserCart.forEach((Item) => {
    NumberOfItems += Item.Count;
  });
  return NumberOfItems;
}
function CalcWeightOfItems(UserCart) {
  let WeightOfItems = 0;
  ItemsArray.forEach((OriginalItem) => {
    UserCart.forEach((Item) => {
      if (OriginalItem.ID === Item.ID) WeightOfItems += OriginalItem.Weight * Item.Count;
    });
  });
  return (WeightOfItems /= 1000).toFixed(2);
}
function CalcShipmentCost() {
  if (ShoppingCart.ItemsWeight >= 10000000) return 0;
  return Math.floor(ShoppingCart.ItemsWeight / 1000) * 5000;
}
function CalcFinalPrice() {
  if (!ShoppingCart.Discount) return (ShoppingCart.ItemsCost + ShoppingCart.ShipmentCost).toFixed(0);
  return (ShoppingCart.ItemsCost + ShoppingCart.ShipmentCost) * ((100 - ShoppingCart.Discount) / 100).toFixed(0);
}
function GetDiscountValueFromAppliedRedeemCode() {
  if (ShoppingCart.AppliedRedeemCode.length === 0) return 0;
  let SumOfAllRedeemCodes = 0;
  let UserRedeemCodes = RedeemsCodes.filter((Code) => {
    return ShoppingCart.AppliedRedeemCode.includes(Code.Key);
  });
  UserRedeemCodes.forEach((UserRedeemCode) => {
    SumOfAllRedeemCodes += UserRedeemCode.Discount;
  });
  return SumOfAllRedeemCodes;
}
//
function RedeemeCodeValidator(RedeemCode) {
  const RedeemCodeInput = document.getElementById("discount-input");
  if (User.UsedRedeemCodes.includes(RedeemCode)) {
    RedeemCodeInput.value = "";
    alert("شما قبلا از این کد تخفیف استفاده کرده اید");
    return;
  }
  if (ShoppingCart.AppliedRedeemCode.includes(RedeemCode)) {
    RedeemCodeInput.value = "";
    alert("این کد تخفیف در حال حاضر فعال است");
    return;
  }
  let Code = RedeemsCodes.find((Code) => {
    return Code.Key === RedeemCode;
  });
  if (!Code) {
    RedeemCodeInput.value = "";
    alert("کد نامعتبر است");
    return;
  }
  if (Code.Remains === 0) {
    RedeemCodeInput.value = "";
    alert("کد نامعتبر است");
    return;
  }
  let CodeExpireDate = new Date(Code.Expires).getTime();
  let CurrentDate = new Date().getTime();
  if (CodeExpireDate < CurrentDate) {
    RedeemCodeInput.value = "";
    alert("کد منقضی شده است");
    return;
  }
  ShoppingCart.Discount += Code.Discount;
  ShoppingCart.AppliedRedeemCode.push(Code.Key);
  RedeemCodeInput.value = "";
  alert(`تخفیف ${Code.Discount} درصدی برای شما فعال شد`);
  Save();
  UpdateCalcSection();
}
//
function Save() {
  localStorage.setItem("UserCart", JSON.stringify(UserCart));
  if (RedeemsCodes.length > 0) localStorage.setItem("RedeemCodes", JSON.stringify(RedeemsCodes));
  if (ShoppingCart.AppliedRedeemCode.length > 0) localStorage.setItem("AppliedRedeemCodes", JSON.stringify(ShoppingCart.AppliedRedeemCode));
  if (User.UsedRedeemCodes.length > 0) localStorage.setItem("UsedRedeemCodes", JSON.stringify(ShoppingCart.UsedRedeemCodes));
}
function LoadSave() {
  if (localStorage.getItem("UserCart")) UserCart = JSON.parse(localStorage.getItem("UserCart"));
  if (localStorage.getItem("RedeemCodes")) RedeemsCodes = JSON.parse(localStorage.getItem("RedeemCodes"));
  if (localStorage.getItem("AppliedRedeemCodes")) ShoppingCart.AppliedRedeemCode = JSON.parse(localStorage.getItem("AppliedRedeemCodes"));
  if (localStorage.getItem("UsedRedeemCodes")) User.UsedRedeemCodes = JSON.parse(localStorage.getItem("UsedRedeemCodes"));
}
//
function HasDecimals(Num) {
  return +Num % 1 !== 0;
}
function NumberSeperator(Number) {
  let Num;
  let DecimalPartOfNum;
  if (HasDecimals(Number)) {
    Num = Number.toString().split(".")[0];
    DecimalPartOfNum = Number.toString().split(".")[1];
  } else {
    Num = Number.toString();
  }
  let NumArray = Num.split("");
  let SeperatedArray = [...NumArray];
  let Length = Num.length;
  let NeededSeperator = Math.floor(Length / 3);
  if (Length % 3 === 0) NeededSeperator -= 1;
  for (let n = 1; n <= NeededSeperator; n++) {
    let Position = 3 * n * -1;
    if (n > 1) Position -= n - 1;
    SeperatedArray.splice(Position, 0, ",");
  }
  if (DecimalPartOfNum) return PlacePersianNumbers(SeperatedArray.join("") + "." + DecimalPartOfNum);
  else return PlacePersianNumbers(SeperatedArray.join(""));
}
function PlacePersianNumbers(String) {
  const PersianNumbers = [
    { English: "0", Persian: "۰" },
    { English: "1", Persian: "۱" },
    { English: "2", Persian: "۲" },
    { English: "3", Persian: "۳" },
    { English: "4", Persian: "۴" },
    { English: "5", Persian: "۵" },
    { English: "6", Persian: "۶" },
    { English: "7", Persian: "۷" },
    { English: "8", Persian: "۸" },
    { English: "9", Persian: "۹" },
  ];
  for (n = 0; n < PersianNumbers.length; n++) {
    if (String.includes(PersianNumbers[n].English)) {
      String = String.replaceAll(new RegExp(PersianNumbers[n].English, "g"), PersianNumbers[n].Persian);
    }
  }
  return String;
}
