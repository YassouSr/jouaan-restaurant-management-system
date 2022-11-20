import cash from "../icons/cash.svg";
import debitCard from "../icons/debitcard.png";
import edahabia from "../icons/edahabia.png";
import masterCard from "../icons/mastercard.svg";
import paypal from "../icons/paypal.svg";
import visaCard from "../icons/visa.svg";

import { faListSquares } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

export const ADDRESS =
  "Calle Remigio Sebastià, 17, 03002 Alacant, Alicante, Spain";

export const SHORT_ADDRESS = "Calle Remigio Sebastià";

export const EMAIL = "contact@jouaan.com";

export const TEL = "(+213) 686 26 85 04";

export const WORKING_DAYS = ["Sunday", "Thursday"];

export const WORKING_HOURS = ["8:00 AM", "5:00 PM"];

export const NAVBAR_LINKS = [
  {
    name: "home",
    link: "/",
  },
  {
    name: "menu",
    link: "/#menu",
  },
  {
    name: "location",
    link: "/#location",
  },
  {
    name: "delivery",
    link: "/#delivery",
  },
];

export const SIDEBAR_LINKS = {
  customer: {
    title: "my account",
    links: [
      {
        name: "menu",
        icon: faListSquares,
        route: "/customer/menu",
      },
      {
        name: "history of orders",
        icon: faBookmark,
        route: "/customer/history",
      },
      {
        name: "profile",
        icon: faUser,
        route: "/customer/profile",
      },
      {
        name: "language",
        icon: faLanguage,
        route: "/customer/language",
      },
      {
        name: "payment",
        icon: faCreditCard,
        route: "/customer/payment",
      },
      {
        name: "give a feedback",
        icon: faStar,
        route: "/customer/feedback",
      },
      {
        name: "customer support",
        icon: faHeadset,
        route: "/customer/support",
      },
      {
        name: "logout",
        icon: faRightFromBracket,
        route: "/logout",
      },
    ],
  },
};

export const PLATES_CATEGORIES = [
  "pizza",
  "sandwich",
  "fries",
  "chicken",
  "humbugger",
  "drinks",
  "sweets",
];

export const PLATES = [
  {
    id: 1,
    rating: "5.0",
    title: "Chicken",
    price: 300,
  },
  {
    id: 2,
    rating: "4.0",
    title: "Egg Omelet",
    price: 200,
  },
  {
    id: 3,
    rating: "4.5",
    title: "Sandwich",
    price: 180,
  },
  {
    id: 4,
    rating: "5.0",
    title: "Coffee with Brownie",
    price: 300,
  },
  {
    id: 5,
    rating: "5.0",
    title: "Panini",
    price: 400,
  },
];

export const PAYMENTS = [
  {
    name: "cash",
    icon: cash,
  },
  {
    name: "paypal",
    icon: paypal,
  },
  {
    name: "debit card",
    icon: debitCard,
  },
  {
    name: "mastercard",
    icon: masterCard,
  },
  {
    name: "visa card",
    icon: visaCard,
  },
  {
    name: "Edahabia card",
    icon: edahabia,
  },
];

export const PAYMENT_CARDS = [
  {
    name: "mastercard",
    data: "*********5478",
    icon: masterCard,
  },
  {
    name: "edahabia card",
    data: "*********5478",
    icon: edahabia,
  },
  {
    name: "debit card",
    data: "*********5478",
    icon: debitCard,
  },
  {
    name: "visa card",
    data: "*********5478",
    icon: visaCard,
  },
  {
    name: "paypal",
    data: "*********5478",
    icon: paypal,
  },
];

export const ORDERS_HISTORY = [
  {
    date: "Monday 14th, 2022 02:33PM",
    plates: ["pizza", "orange juice", "coffee", "chicken", "karantika"],
    payment: "cash",
    price: 300,
  },
  {
    date: "Monday 14th, 2022 02:33PM",
    plates: ["pizza", "orange juice"],
    payment: "cash",
    price: 300,
  },
];

export const MENU_PLATES = {
  pizza: [
    {
      title: "Neapolitan Pizza",
      price: 450,
      rating: "5.0",
    },
    {
      title: "Chicago Pizza",
      price: 400,
      rating: "4.0",
    },
    {
      title: "The Sicilian Pizza",
      price: 300,
      rating: "4.5",
    },
    {
      title: "Detroit Pizza",
      price: 350,
      rating: "5.0",
    },
    {
      title: "Greek Pizza",
      price: 550,
      rating: "4.0",
    },
    {
      title: "New York-Style Pizza",
      price: 400,
      rating: "4.0",
    },
    {
      title: "St. Louis Pizza",
      price: 550,
      rating: "4.5",
    },
  ],
  sandwich: [
    {
      title: "Chicken Sandwich",
      price: 450,
      rating: "5.0",
    },
    {
      title: "Egg Sandwich",
      price: 400,
      rating: "4.0",
    },
    {
      title: "Roast Beef Sandwich",
      price: 300,
      rating: "4.5",
    },
    {
      title: "Grilled Cheese",
      price: 350,
      rating: "5.0",
    },
    {
      title: "Shawarma",
      price: 550,
      rating: "4.0",
    },
    {
      title: "Meatball Sandwich",
      price: 400,
      rating: "4.0",
    },
    {
      title: "Panini",
      price: 550,
      rating: "4.5",
    },
  ],
  fries: [
    {
      title: "french fries",
      price: 200,
      rating: "5.0",
    }
  ],
  chicken: [],
  humbugger: [
    {
      title: "Turkey burger ",
      price: 450,
      rating: "5.0",
    },
    {
      title: "Portobello mushroom burger",
      price: 400,
      rating: "4.0",
    },
    {
      title: "Veggie burger",
      price: 300,
      rating: "4.5",
    },
    {
      title: "Bean burger",
      price: 350,
      rating: "5.0",
    },
    {
      title: "Cheese burger",
      price: 550,
      rating: "4.0",
    },
  ],
  drinks: [
    {
      title: "Espresso",
      price: 450,
      rating: "5.0",
    },
    {
      title: "Cappuccino",
      price: 400,
      rating: "4.0",
    },
    {
      title: "Cafe Latte",
      price: 300,
      rating: "4.5",
    },
    {
      title: "Cafe au Lait",
      price: 350,
      rating: "5.0",
    },
    {
      title: "Iced Coffee",
      price: 550,
      rating: "4.0",
    },
  ],
  sweets: [],
};
