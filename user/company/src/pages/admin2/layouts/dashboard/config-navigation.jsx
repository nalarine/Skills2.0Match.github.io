import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`../../src/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/AdminDashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/admin/users',
    icon: icon('ic_user'),
  },
  {
    title: 'jobs',
    path: '/admin/jobs',
    icon: icon('ic_cart'),
  },
  {
    title: 'categories',
    path: '/blog',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
