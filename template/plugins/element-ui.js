import Vue from 'vue';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import '~/assets/scss/element-variables.scss';
import {
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Option,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Select,
  Button,
  Tooltip,
  Tabs,
  TabPane,
  Row,
  Col,
  Container,
  Header,
  Main,
  Footer,
  Loading,
  Table,
  TableColumn,
} from 'element-ui';

// 设置语言
locale.use(lang);

Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
Vue.use(Tooltip);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Row);
Vue.use(Col);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Table);
Vue.use(TableColumn);

Vue.use(Loading.directive);
