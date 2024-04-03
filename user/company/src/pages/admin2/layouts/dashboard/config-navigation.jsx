import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/src/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/Admin2',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/User',
    icon: icon('ic_user'),
  },
  {
    title: 'product',
    path: '/Products',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
