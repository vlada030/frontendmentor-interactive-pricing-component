import './scss/main.scss'


const subscriptionToggler = document.getElementById('subscriptionToggler')
const subscriptionSlider = document.getElementById('subscriptionSlider')
const form = document.forms[0]

const SUBSCRIPTION = new Map([
    [1, {views: '10K', price: 8}],
    [2, {views: '50K', price: 12}],
    [3, {views: '100K', price: 16}],
    [4, {views: '500K', price: 24}],
    [5, {views: '1M', price: 36}]
])

subscriptionSlider.addEventListener('change', () => {
    const sliderValue = parseInt(subscriptionSlider.value) ;
    const plan = SUBSCRIPTION.get(sliderValue)
    console.log({plan});
})

form.addEventListener('submit', e => {
    e.preventDefault()
    console.log('FORM SUBMITTED...');
})

