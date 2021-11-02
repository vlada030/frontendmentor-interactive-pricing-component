import "./scss/main.scss";

const form = document.forms[0];
const subscriptionToggler = document.getElementById("subscriptionToggler");
const subscriptionSlider = document.getElementById("subscriptionSlider");
const pageviewsElement = document.getElementById("pageviews");
const priceElements = document.querySelectorAll("[data-price]");

const head = document.getElementsByTagName("head")[0]
const styleList = document.getElementsByTagName('style')

const SUBSCRIPTION = new Map([
    [1, { views: "10K", price: 8 }],
    [2, { views: "50K", price: 12 }],
    [3, { views: "100K", price: 16 }],
    [4, { views: "500K", price: 24 }],
    [5, { views: "1M", price: 36 }],
]);

// create dynamic width class and its properties
function dynamicSliderWidthClass() {

    const sliderValue = parseInt(subscriptionSlider.value)
    // proveri da li postoji style element koji je vec dodat
    if (styleList.length > 2) {
        styleList[2].parentNode.removeChild(styleList[2])
    }    
    // dodaj style element u head
    let width = (sliderValue - 1) / 4 * 100 // u procentima
    var style = document.createElement("style");
    style.innerHTML = `.dynamic-width::-moz-range-track {  background: linear-gradient(90deg, hsl(174, 77%, 80%) ${width}%, hsl(224, 65%, 95%) ${width+1}%) !important; }
    .dynamic-width::-webkit-slider-runnable-track {  background: linear-gradient(90deg, hsl(174, 77%, 80%) ${width}%, hsl(224, 65%, 95%) ${width+1}%) !important; }
    .dynamic-width::-ms-thumb {  background: linear-gradient(90deg, hsl(174, 77%, 80%) ${width}%, hsl(224, 65%, 95%) ${width+1}%) !important; }`;

    head.appendChild(style);

    subscriptionSlider.classList.add('dynamic-width')
}

const updateUI = (plan, discount) => {
    let finalPrice = plan.price * discount;
    finalPrice = finalPrice.toLocaleString("en", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
    });

    pageviewsElement.innerText = `${plan.views} pageviews`;
    priceElements.forEach((element) => {
        element.innerHTML = "";
        element.insertAdjacentHTML(
            "afterbegin",
            `${finalPrice} <span>/ month</span>`
        );
    });

    //update slider track length
    dynamicSliderWidthClass()
};

const prepareValues = () => {
    const sliderValue = parseInt(subscriptionSlider.value);
    const plan = SUBSCRIPTION.get(sliderValue);
    const discount = subscriptionToggler.checked ? 0.75 : 1;

    return { plan, discount};
};

const initializeComponent = () => {
    const { plan, discount} = prepareValues();
    updateUI(plan, discount);
};

initializeComponent();

subscriptionSlider.addEventListener("input", () => {
    const { plan, discount } = prepareValues();
    updateUI(plan, discount);
});

subscriptionToggler.addEventListener("change", () => {
    const { plan, discount } = prepareValues();
    updateUI(plan, discount);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("FORM SUBMITTED...");
});
