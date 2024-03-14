import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AboutUs, Footer, LayoutDash, Navbar, NewestDeals } from "./components";
import {
  About,
  AuthPage,
  AboutPage,
  ContactPage,
  Companies,
  CompanyProfile,
  FindJobs,
  JobDetail,
  UploadJob,
  UserProfile,
  AdLayout,
} from "./pages";
import { useSelector } from "react-redux";
import './App.css';

//USER/APPLICANT
import Dashboard from "./pages/OSY/Dashboard";
import Messages from "./pages/OSY/Messages";
import AllApplication from "./pages/OSY/AllApplication";
import Schedule from "./pages/OSY/Schedule";
import SkillsAssessment from "./pages/OSY/SkillsAssessment";
import JobAvailable from "./components/JobAvailable";
import HelpCenter from "./pages/OSY/HelpCenter";
import Settings from  "./pages/OSY/Settings";

//COMPANY 
import CompanyLayoutDash from "./components/Shared/CompanyLayoutDash";
import CDashboard from "./pages/COMPANY/Dashboard";
import CMessages from "./pages/COMPANY/Messages";
import AllApplicants from "./pages/COMPANY/AllApplicants";
import CSchedule from "./pages/COMPANY/Schedule";
import CJobListing from "./pages/COMPANY/JobListing";

//ADMIN
import AdminDashboard from "./pages/admin/AdminDashboard";
import DashCategory from "./pages/admin/DashCategory";
import DashCreateCategory from "./pages/admin/DashCreateCategory";
import DashCreateJob from "./pages/admin/DashCreateJob";
import DashJobs from "./pages/admin/DashJobs";
import DashUsers from "./pages/admin/DashUsers";


//HOC
const AdminDashboardHOC = AdLayout(AdminDashboard);
const DashUsersHOC = AdLayout(DashUsers);
const DashJobsHOC = AdLayout(DashJobs);
const DashCategoryHOC = AdLayout(DashCategory);
const DashCreateJobHOC = AdLayout(DashCreateJob);
const DashCreateCategoryHOC = AdLayout(DashCreateCategory);

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return <Outlet />;
}
  
function App() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" || 
    location.pathname.startsWith("/Dashboard") ||
    location.pathname.startsWith("/messages") ||
    location.pathname.startsWith("/all-application") ||
    location.pathname.startsWith("/my-schedule") ||
    location.pathname.startsWith("/skills-assessment") ||
    location.pathname.startsWith("/user-profile") ||
    location.pathname.startsWith("/settings") ||
    location.pathname.startsWith("/help-center") ||
    location.pathname.startsWith("/job-available") ||
    location.pathname.startsWith("/CompanyDash") ||
    location.pathname.startsWith("/cmessages") ||
    location.pathname.startsWith("/all-applicants") ||
    location.pathname.startsWith("/schedule") ||
    location.pathname.startsWith("/company-profile") ||
    location.pathname.startsWith("/cjoblisting") ||
    location.pathname.startsWith("/upload-job") ||
    location.pathname.startsWith("/job-detail/") ||
    location.pathname.startsWith("/companies") ||
    location.pathname.startsWith("/AdminDashboard");


  const hideExtraComponents = user && (
    location.pathname === "/" || 
    location.pathname.startsWith("/AboutPage") ||
    location.pathname.startsWith("/About") ||
    location.pathname.startsWith("/ContactPage") ||
    location.pathname.startsWith("/find-jobs") ||
    location.pathname.startsWith("/company-profile") ||
    location.pathname.startsWith("/job-detail/") ||
    location.pathname.startsWith("/upload-job") ||
    location.pathname.startsWith("/companies") ||
    location.pathname.startsWith("/AdminDashboard")

  );

  return (
    <main className='bg-[#f7fdfd]'>
      {!hideNavbar && <Navbar />} 
      {user && !hideExtraComponents && (
        <>
          <NewestDeals/>
          <AboutUs/>
          <Footer />
        </>
      )}
      <Routes>
        <Route path="/user-auth" element={<AuthPage />} />
        <Route path='/find-jobs' element={<FindJobs />} />
          <Route path='/companies' element={<Companies />} />

        <Route element={<Layout />}>
          <Route element={<LayoutDash />}>
            <Route index element={<Dashboard />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="messages" element={<Messages />} />
            <Route path="all-application" element={<AllApplication />} />
            <Route path="my-schedule" element={<Schedule />} />
            <Route path="skills-assessment" element={<SkillsAssessment />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help-center" element={<HelpCenter />} />
            {/* <Route path="/job-available" element={<JobAvailable />} /> */}
          </Route>
          
          

          <Route element={<CompanyLayoutDash />}>
            <Route element={<CDashboard />} />
            <Route path="CompanyDash" element={<CDashboard />} />
            <Route path="cmessages" element={<CMessages />} />
            <Route path="all-applicants" element={<AllApplicants />} />
            <Route path="schedule" element={<CSchedule />} />
            <Route path="/company-profile" element={<CompanyProfile />} />
            <Route path="cjoblisting" element={<CJobListing />} />
          </Route>

          <Route path='/AdminDashboard' element={<AdminDashboard><AdminDashboardHOC /></AdminDashboard>} />
          <Route path='/admin/users' element={<DashUsersHOC />} />
          <Route path='/admin/jobs' element={<DashJobsHOC />} />
          <Route path='/admin/category' element={<DashCategoryHOC />} />
          <Route path='/admin/job/create' element={<DashCreateJobHOC />} />
          <Route path='/admin/category/create' element={<DashCreateCategoryHOC />} />
          
          <Route
            path={
              user?.accountType === "seeker"
                ? "/user-profile"
                : "/user-profile/:id"
            }
            element={<UserProfile />}
          />
    
          <Route path={"/company-profile"} element={<CompanyProfile />} />
          <Route path={"/company-profile/:id"} element={<CompanyProfile />} />
          <Route path={"/upload-job"} element={<UploadJob />} />
          <Route path={"/job-detail/:id"} element={<JobDetail />} />

          </Route>
          <Route path='/AboutPage' element={<AboutPage />} />
          <Route path='/ContactPage' element={<ContactPage />} />
          <Route path='/about-us' element={<About />} />
      </Routes>
    </main>
  );
}

export default App;
