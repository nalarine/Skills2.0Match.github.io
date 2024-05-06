import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`../../src/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/AdminDashboard',
    icon: icon('admin_dash'),
  },
  {
    title: 'user',
    path: '/admin/users',
    icon: icon('admin_applicant'),
  },
  {
    title: 'companies',
    path: '/admin/companies',
    icon: icon('admin_company'),
  },
  {
    title: 'jobs',
    path: '/admin/jobs',
    icon: icon('admin_job'),
  },
];

export default navConfig;
