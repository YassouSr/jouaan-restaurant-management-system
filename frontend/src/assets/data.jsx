import {
  faBookmark,
  faChartSimple,
  faHeadset,
  faListSquares,
  faRightFromBracket,
  faStar,
  faUser,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import cash from "./icons/cash.svg";
import debitCard from "./icons/debitcard.png";
import edahabia from "./icons/edahabia.png";

export const ADDRESS =
  "Calle Remigio Sebastià, 17, 03002 Alacant, Alicante, Spain";

export const SHORT_ADDRESS = "Calle Remigio Sebastià";

export const EMAIL = "contact@jouaan.com";

export const TEL = "(+213) 686 26 85 04";

export const WORKING_DAYS = ["Sunday", "Thursday"];

export const WORKING_HOURS = ["8:00 AM", "5:00 PM"];

export const ORDER_FEES_TO_ADD = {
  delivery: 10,
  service: 5,
};

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
        route: "/login",
      },
    ],
  },
  admin: {
    title: "my panel",
    links: [
      {
        name: "profile",
        icon: faUser,
        route: "/admin/profile",
      },
      {
        name: "all chefs",
        icon: faListSquares,
        route: "/admin/list-chefs",
      },
      {
        name: "all customers",
        icon: faListSquares,
        route: "/admin/list-customers",
      },
      {
        name: "all drivers",
        icon: faListSquares,
        route: "/admin/list-drivers",
      },
      {
        name: "list of feedbacks",
        icon: faStar,
        route: "/admin/list-feedbacks",
      },
      {
        name: "signup staff",
        icon: faUserPlus,
        route: "/admin/signup-staff",
      },
      {
        name: "statistics",
        icon: faChartSimple,
        route: "/admin/statistics",
      },
      {
        name: "logout",
        icon: faRightFromBracket,
        route: "/login",
      },
    ],
  },
  chef: {
    title: "my account",
    links: [
      {
        name: "available orders",
        icon: faListSquares,
        route: "/chef/list-orders",
      },
      {
        name: "history",
        icon: faBookmark,
        route: "/chef/history",
      },
      {
        name: "profile",
        icon: faUser,
        route: "/chef/profile",
      },
      {
        name: "statistics",
        icon: faChartSimple,
        route: "/chef/statistics",
      },
      {
        name: "give a feedback",
        icon: faStar,
        route: "/chef/feedback",
      },
      {
        name: "ask for help",
        icon: faHeadset,
        route: "/customer/support",
      },
      {
        name: "logout",
        icon: faRightFromBracket,
        route: "/login",
      },
    ],
  },
  driver: {
    title: "my account",
    links: [
      {
        name: "available orders",
        icon: faListSquares,
        route: "/driver/list-orders",
      },
      {
        name: "history",
        icon: faBookmark,
        route: "/driver/history",
      },
      {
        name: "profile",
        icon: faUser,
        route: "/driver/profile",
      },
      {
        name: "statistics",
        icon: faChartSimple,
        route: "/driver/statistics",
      },
      {
        name: "give a feedback",
        icon: faStar,
        route: "/driver/feedback",
      },
      {
        name: "ask for help",
        icon: faHeadset,
        route: "/customer/support",
      },
      {
        name: "logout",
        icon: faRightFromBracket,
        route: "/login",
      },
    ],
  },
};

// remove this
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

export const PAYMENTS = {
  cash: cash,
  CIB: debitCard,
  EDAHABIA: edahabia,
};
