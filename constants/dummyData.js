import { COLORS,icons,images} from "../constants";


// we will be using this dummy data,
// don't worry, you can find this data in the git repo 
// you can find the git repo link in the description ;)

export const categoryData = [
   {
      id: 1,
      title: "All",
      icon:icons.home
    },
    {
      id: 2,
      title: "Coffee",
      icon:icons.coffee_1
    },
   
    {
      id: 3,
      title: "Tea",
      icon:icons.tea
    },
    {
      id: 4,
      title: "Donuts",
      icon:icons.donut,
    },
    {
      id: 5,
      title: "Ice-Cream",
      icon:icons.ice
    },
    {
      id: 6,
      title: "Dessert",
      icon:icons.dessert
    },
  ]
  
  export const ProductData = [
    {
      id: 1,
      name:'BlackCoffee',
      categories: [1],
      price: 10.00,
      prices:[
        {size: 'S', price: '8.00', small: 'S', isSelected: false },
        {size: 'M', price: '10.00', medium: 'M', isSelected: true },
        {size: 'L', price: '13.00', large: 'L', isSelected: false },
      ],
     
      stars: '4.6',
      image: require('../asset/images/coffee1.png'),
      desc: 'The taste of coffee can vary depending on factors such as the type of beans',
      },
      {
        id: 2,
        name: "MilkCoffee",
        icon:icons.coffee_1,
        categories: [1,2],
        price: 10.00,
        prices: [
          {size: 'S', price: '8.00', currency: '$', isSelected: false },
          {size: 'M', price: '10.00', currency: '$', isSelected: true },
          {size: 'L', price: '13.00', currency: '$', isSelected: false },
        ],
        stars: '4.5',
        image: images.coffee3,
        desc: 'The taste of coffee can vary depending on factors such as the type of beans',
        },  
      {
        id: 3,
        name: "CreamCoffee",
        categories: [1,2],
        icon:icons.coffee_1,
        stars: '4.8',
        price: 10.00,
        prices: [
          {size: 'S', price: '8.00', currency: '$', isSelected: false },
          {size: 'M', price: '10.00', currency: '$', isSelected: true },
          {size: 'L', price: '13.00', currency: '$', isSelected: false },
        ],
        image: require('../asset/images/coffee2.png'),
        desc: 'The taste of coffee can vary depending on factors such as the type of beans',
       },   
   {
    id: 4,
    name: "RedTea",
    categories: [3,1],
    icon:icons.tea,
    price: 10.00,
    prices: [
      {size: 'S', price: '8.00', currency: '$'},
      {size: 'M', price: '10.00', currency: '$'},
      {size: 'L', price: '13.00', currency: '$'},
    ],
    stars: '4.5',
    image: require('../asset/images/tea.png'),
    desc: 'The taste of tea can vary depending on factors such as the type of beans',
   },
   {
    id: 5,
    name: 'LemonTea',
    icon:icons.tea,
    categories: [1,3],
    price: 10.00,
    prices: [
      {size: 'S', price: '8.00', currency: '$'},
      {size: 'M', price: '10.00', currency: '$'},
      {size: 'L', price: '13.00', currency: '$'},
    ],
    stars: '4.7',
    image: images.lemon_tea,
    desc: 'The taste of tea can vary depending on factors such as the type of beans'  ,
  },
   {
    id: 6,
    name: 'MilkTea',
    icon:icons.tea,
    categories: [3,1],
    price: 10.00,
    prices: [
      {size: 'S', price: '8.00', currency: '$'},
      {size: 'M', price: '10.00', currency: '$'},
      {size: 'L', price: '13.00', currency: '$'},
    ],
    stars: '4.5',
    image: images.milk_tea,
    desc: 'The taste of tea can vary depending on factors such as the type of beans' ,
   },
  {
    id: 7,
    name: 'ChoDonut',
    icon:icons.donut,
    price: 10.00,
    prices: [
      {size: 'S', price: '8.00', currency: '$'},
      {size: 'M', price: '10.00', currency: '$'},
      {size: 'L', price: '13.00', currency: '$'},
    ],
    stars: '4.6',
    categories: [4,1],
    image: images.chocolate_donut,
    desc: 'The taste of donut can vary depending on factors such as the type of ingrediant',
   
  }, 
  {
    id: 8,
    name: 'StraDonut',
    icon:icons.donut,
    categories: [1,4],
    price: 10.00,
    prices: [
      {size: 'S', price: '8.00', currency: '$'},
      {size: 'M', price: '10.00', currency: '$'},
      {size: 'L', price: '13.00', currency: '$'},
    ],
    stars: '4.3',
    image: images.strawberry_donut,
    desc: 'The taste of donut can vary depending on factors such as the type of ingrediant',  
   
  },
  {
    id: 9,
    name: 'CreamDonut',
    icon:icons.donut,
    categories: [1,4],
    price: 10.00,
    prices: [
      {size: 'S', price: '8.00', currency: '$'},
      {size: 'M', price: '10.00', currency: '$'},
      {size: 'L', price: '13.00', currency: '$'},
    ],
    stars: '4.4',
    image: images.cream_donut,
    desc: 'The taste of donut can vary depending on factors such as the type of ingrediant',
   
  }, 
  {
    id: 10,
    name: 'VanillaCream',
    icon:icons.ice,
    categories: [1,5],
    price: 10.00,
    prices: [
      {size: 'S', price: '8.00', currency: '$'},
      {size: 'M', price: '10.00', currency: '$'},
      {size: 'L', price: '13.00', currency: '$'},
    ],
    stars: '4.4',
    image: images.vanilla_iceCream,
    desc: 'The taste of  choco cream can vary depending on factors such as the type of ingrediant',
   
  }, 
  {
    id: 11,
    name: 'ChocoCream',
    icon:icons.ice,
    categories: [1,5],
    price: 10.00,
    prices: [
      {size: 'S', price: '8.00', currency: '$'},
      {size: 'M', price: '10.00', currency: '$'},
      {size: 'L', price: '13.00', currency: '$'},
    ],
    stars: '4.4',
    image: images.Choc_iceCream,
    desc: 'The taste of  choco cream can vary depending on factors such as the type of ingrediant',
   
  }, 
  {
    id: 12,
    name: 'FruttiCream',
    icon:icons.ice,
    categories: [1,5],
    price: 10.00,
    stars: '4.4',
    image: images.frutti_icecream,
    desc: 'The taste of  choco cream can vary depending on factors such as the type of ingrediant',
   
  }, 
  {
    id: 13,
    name: 'ResCake',
    icon:icons.ice,
    categories: [1,6],
    price: 10.00,
    prices: [
      {size: 'S', price: '8.00', currency: '$'},
      {size: 'M', price: '10.00', currency: '$'},
      {size: 'L', price: '13.00', currency: '$'},
    ],
    stars: '4.4',
    image: images.raspberry_cake,
    desc: 'The taste of cake can vary depending on factors such as the type of ingrediant',
   
  }, 
  {
    id: 14,
    name: 'MixCake',
    icon:icons.ice,
    categories: [1,6],
    price: 10.00,
    prices: [
      {size: 'S', price: '8.00', currency: '$'},
      {size: 'M', price: '10.00', currency: '$'},
      {size: 'L', price: '13.00', currency: '$'},
    ],
    stars: '4.4',
    image: images.mix_cake,
    desc: 'The taste of cake can vary depending on factors such as the type of ingrediant',
   
  }, 
  {
    id: 15,
    name: 'MixDessert',
    icon:icons.ice,
    categories: [1,6],
    price: 10.00,
    prices: [
      {size: 'S', price: '8.00', currency: '$'},
      {size: 'M', price: '10.00', currency: '$'},
      {size: 'L', price: '13.00', currency: '$'},
    ],
    stars: '4.4',
    image: images.mix_dessert,
    desc: 'The taste of cake can vary depending on factors such as the type of ingrediant',
   
  }, 
  ]



  export const PaymentCard = [
    {
      id: 1,
      icon: icons.visa ,
      },
   {
    id: 2,
    icon: icons.master_card,
   
   },
   {
    id: 3,
    icon: icons.paypal ,

  }, 
  {
    id: 4,
    icon: icons.apple_pay,
  },  
  ]


  const allCards = [
    {
        id: 1,
        name: "Credit/Debit",
        icon: icons.credit
    },
    {
        id: 2,
        name: "UnionPay",
        icon: icons.union,
    },
    {
        id: 3,
        name: "Google Pay",
        icon: icons.google_pay,
    },
    {
        id: 4,
        name: "Discover",
        icon: icons.discover,
    },
    
]


 

const flashDeals = [
    {
        id: 1,
        title: "Flash Deals",
        desc: "Sale time from 1:00pm - 3:00pm"
    },
    {
        id: 2,
      //  image: require('../asset/images/dummy/product_01.png'),
        sold_qty: "4k",
        total_qty: "5k",
        percentage: "80%"
    },
    {
        id: 3,
       // image: require('../asset/images/dummy/product_02.png'),
        sold_qty: "546",
        total_qty: "5k",
        percentage: "11%"
    }
]

const services = [
    {
        id: 1,
        title: 'Fast shopping',
        description: 'Fast home delivery within 2h free shipping',
        price: 'Only 50$/Month',
       // image: require('../asset/images/get_card.png')
    },
    {
        id: 2,
        title: 'Fresh food',
        description: 'You just need the menu we will suggest, choose buy for you',
        price: 'Only 20$/Month',
        //image: require('../asset/images/buy_coffee.png')
    },
    {
        id: 3,
        title: 'Exchange old things',
        description: 'You can exchange used items',
        price: 'Only 10$/Month',
       // image: require('../asset/images/get_money.png')
    },
    {
        id: 4,
        title: 'Give gifts friend',
        description: 'Help you to send gifts to your loved ones',
        price: 'Only 5$/Month',
       // image: require('../asset/images/get_reward.png')
    }
]


const categorySize = [
  {
    id: 0,
    type: "S",
  },
  {
    id: 1,
    type: "M",
  },
  {
    id: 1,
    type: "L",
  }
  
]


const fromLocs = [
  {
      latitude: 1.5347282806345879,
      longitude: 110.35632207358996,
  },
  {
      latitude: 1.556306570595712,
      longitude: 110.35504616746915,
  },
  {
      latitude: 1.5238753474714375,
      longitude: 110.34261833833622,
  },
  {
      latitude: 1.5578068150528928,
      longitude: 110.35482523764315,
  },
  {
      latitude: 1.558050496260768,
      longitude: 110.34743759630511,
  },
  {
      latitude: 1.5573478487252896,
      longitude: 110.35568783282145,
  }
]



export default {
    categoryData,
    ProductData,
    flashDeals,
    services,
    categorySize,
    PaymentCard,
    allCards,
    fromLocs
}