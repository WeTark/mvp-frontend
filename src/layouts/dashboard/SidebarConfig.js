import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
import shareScreenPerson20Filled from "@iconify/icons-fluent/share-screen-person-20-filled";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import lockFill from "@iconify/icons-eva/lock-fill";
import personAddFill from "@iconify/icons-eva/person-add-fill";
import alertTriangleFill from "@iconify/icons-eva/alert-triangle-fill";

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "trade",
    path: "/trade/event",
    icon: getIcon(pieChart2Fill),
  },
  {
    title: "Personal Event",
    path: "/trade/personal-event",
    icon: getIcon("bi:calendar-event-fill"),
  },
  {
    title: "portfolio",
    path: "/trade/portfolio",
    icon: getIcon(shoppingBagFill),
  },
  {
    title: "profile",
    path: "/trade/user",
    icon: getIcon(peopleFill),
  },
  {
    title: "Shared With Me",
    path: "/trade/sharedwithme",
    icon: getIcon(shareScreenPerson20Filled),
  },
  // {
  //   title: 'watchlist',
  //   path: '/trade/watchlist',
  //   icon: getIcon(fileTextFill)
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: getIcon(lockFill)
  // },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon(personAddFill)
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon(alertTriangleFill)
  // }
];

export default sidebarConfig;
