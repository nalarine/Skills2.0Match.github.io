import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DateRangePicker } from '@nextui-org/react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from '@nextui-org/react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { EditIcon } from './EditIcon';
import { DeleteIcon } from './DeleteIcon';
import { EyeIcon } from './EyeIcon';
import { columns, users } from './data';
import ViewApplicantCard from '../../components/ViewApplicantCard'; // Ensure correct path
import { apiRequest } from '../../utils';
import moment from 'moment';

const ActionCell = ({ applicant, onSeeProfile }) => (
  <button
    className="bg-green-500 py-1 px-2 rounded-md text-white hover:bg-green-600 focus:outline-none"
    onClick={() => onSeeProfile(applicant)}
  >
    See Profile
  </button>
);

const style = StyleSheet.create({
  page: {
    padding: 30,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColHeader: {
    width: '25%',
    backgroundColor: '#f2f2f2',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
  },
});


const ApplicantsPDF = ({ applicants }) => (
  <Document>
    <Page style={style.page}>
      <View style={style.section}>
        <Text style={style.heading}>Applicants Report</Text>
        <View style={style.table}>
          <View style={style.tableRow}>
            <View style={style.tableColHeader}>
              <Text style={style.tableCellHeader}>Full Name</Text>
            </View>
            <View style={style.tableColHeader}>
              <Text style={style.tableCellHeader}>Hiring Stage</Text>
            </View>
            <View style={style.tableColHeader}>
              <Text style={style.tableCellHeader}>Applied Date</Text>
            </View>
            <View style={style.tableColHeader}>
              <Text style={style.tableCellHeader}>Job Role</Text>
            </View>
          </View>
          {applicants.map((applicant) => (
            <View key={applicant.id} style={style.tableRow}>
              <View style={style.tableCol}>
                <Text style={style.tableCell}>{applicant.fullName}</Text>
              </View>
              <View style={style.tableCol}>
                <Text style={style.tableCell}>{applicant.hiringStage}</Text>
              </View>
              <View style={style.tableCol}>
                <Text style={style.tableCell}>
                  {new Date(applicant.appliedDate).toLocaleDateString()}
                </Text>
              </View>
              <View style={style.tableCol}>
                <Text style={style.tableCell}>{applicant.jobRole}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const JobPostsPDF = ({ jobPosts }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.heading}>Job Posts Report</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Job Title</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Vacancies</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Location</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Type</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.tableCellHeader}>Date Posted</Text>
            </View>
          </View>
          {jobPosts.map((jobPost) => (
            <View key={jobPost.id} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{jobPost.jobTitle}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{jobPost.vacancies}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{jobPost.location}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{jobPost.jobType}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {new Date(jobPost.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '20%',
    backgroundColor: '#f2f2f2',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableCell: {
    margin: 5,
    fontSize: 10,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
  },
});

export default function GenerateReports() {
  const { user } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState('Create Report');
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [showAllApplicants, setShowAllApplicants] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [filter, setFilter] = useState({
    hiringStage: '',
    searchTerm: '',
    appliedDateStart: '',
    appliedDateEnd: '',
  });
  const [jobPosts, setJobPosts] = useState([]);
  const [showJobPosts, setShowJobPosts] = useState(false);
  const [jobFilter, setJobFilter] = useState({
    jobType: '',
    datePostedStart: '',
    datePostedEnd: '',
  });

  const handleJobFilterChange = (e) => {
    const { name, value } = e.target;
    setJobFilter((prevJobFilter) => ({
      ...prevJobFilter,
      [name]: value,
    }));
  };

  const filteredPosts = jobPosts.filter((jobPost) => {
    const matchesJobType = jobFilter.jobType === '' || jobPost.jobType === jobFilter.jobType;
    const matchesDateRange =
      (jobFilter.datePostedStart === '' || new Date(jobPost.createdAt) >= new Date(jobFilter.datePostedStart + 'T00:00:00')) &&
      (jobFilter.datePostedEnd === '' || new Date(jobPost.createdAt) <= new Date(jobFilter.datePostedEnd + 'T23:59:59'));

    return matchesJobType && matchesDateRange;
  });

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await apiRequest({
          url: `/companies/get-company/${user._id}`,
          method: 'GET',
        });
        setApplicants(res.data.applicants);
      } catch (error) {
        console.error('Error loading company data:', error);
      }
    };
    fetchApplicants();
  }, [user._id]);

  useEffect(() => {
    let filtered = applicants;

    if (filter.hiringStage) {
      filtered = filtered.filter((applicant) =>
        applicant.hiringStage.includes(filter.hiringStage)
      );
    }

    if (filter.searchTerm) {
      const searchRegex = new RegExp(filter.searchTerm.split('%').join('.*'), 'i');
      filtered = filtered.filter((applicant) =>
        searchRegex.test(applicant.fullName) || searchRegex.test(applicant.jobRole)
      );
    }

    if (filter.appliedDateStart && filter.appliedDateEnd) {
      const startDate = moment(filter.appliedDateStart);
      const endDate = moment(filter.appliedDateEnd);
      filtered = filtered.filter((applicant) => {
        const appliedDate = moment(applicant.appliedDate);
        return appliedDate.isBetween(startDate, endDate, undefined, '[]');
      });
    }

    setFilteredApplicants(filtered);
  }, [applicants, filter]);

  const fetchJobPosts = async () => {
    try {
      const res = await apiRequest({
        url: `/companies/get-company/${user._id}`,
        method: 'GET',
      });
      setJobPosts(res.data.jobPosts);
    } catch (error) {
      console.error('Error loading job posts:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowAllApplicants(false);
  };

  const handleAllApplicantsClick = () => {
    setShowAllApplicants(true);
    setShowJobPosts(false);
  };

  const handleJobPostsClick = () => {
    fetchJobPosts();
    setShowJobPosts(true);
    setShowAllApplicants(false);
  };

  const toggleDropdown = () => {
    setIsActionsOpen(!isActionsOpen);
  };

  const statusColorMap = {
    active: 'success',
    paused: 'danger',
    vacation: 'warning',
  };

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{ radius: 'lg', src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case 'role':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case 'status':
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filter.searchTerm.toLowerCase())
  );

  return (
    <section className="container px-4 mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center mt-4 gap-x-3">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              type="button"
              className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              Reports
              <svg
                className={`hs-dropdown-open:rotate-180 size-4 ${isActionsOpen ? 'transform rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {isActionsOpen && (
              <div className="absolute z-10 mt-2 w-56 origin-top-right bg-white border border-gray-200 shadow-lg rounded-lg divide-y divide-gray-200 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700">
                <div className="py-2">
                  <span className="block py-2 px-3 text-xs font-medium uppercase text-gray-400 dark:text-neutral-500">
                    Account Overview
                  </span>
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                    onClick={handleAllApplicantsClick}
                  >
                    List of Applicants
                  </a>
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                    onClick={handleJobPostsClick}
                  >
                    List of Jobs Posted
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showAllApplicants && (
        <div className="flex flex-col p-6 gap-4">
          <h1 className="text-3xl font-bold">
            Total Applicants: {applicants.length}
          </h1>
          <div className="flex flex-wrap gap-4 mt-4 items-center">
            <div className="flex items-center">
              <label className="block mr-2">
                Hiring Stage:
                <select
                  name="hiringStage"
                  value={filter.hiringStage}
                  onChange={handleFilterChange}
                  className="bg-white border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
                >
                  <option value="">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Hired">Hired</option>
                  <option value="Declined">Declined</option>
                  <option value="Shortlisted">Shortlisted</option>
                </select>
              </label>
            </div>
            <div>
              <label className="block">
                Search by Name or Role:
                <input
                  type="text"
                  name="searchTerm"
                  value={filter.searchTerm}
                  onChange={handleFilterChange}
                  className="bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                />
              </label>
            </div>
            <div className="flex flex-col">
              <label className="flex block items-center">
                Applied Date Range:
                <div className="flex">
                  <input
                    type="date"
                    value={filter.appliedDateStart}
                    onChange={(e) =>
                      handleFilterChange({
                        target: {
                          name: 'appliedDateStart',
                          value: e.target.value,
                        },
                      })
                    }
                    className="bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 mr-2"
                  />
                  <input
                    type="date"
                    value={filter.appliedDateEnd}
                    onChange={(e) =>
                      handleFilterChange({
                        target: { name: 'appliedDateEnd', value: e.target.value },
                      })
                    }
                    className="bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </label>
            </div>            
          <div>
            <PDFDownloadLink
              document={<ApplicantsPDF applicants={filteredApplicants} />}
              fileName="applicants_report.pdf"
              className="bg-blue-500 py-2 px-4 rounded-md text-white hover:bg-blue-600 focus:outline-none"
            >
              Download Applicants Report as PDF
            </PDFDownloadLink>
          </div>
          </div>
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6 text-base text-green-900">
                    Full Name
                  </th>
                  <th scope="col" className="py-3 px-6 text-base text-green-900">
                    Hiring Stage
                  </th>
                  <th scope="col" className="py-3 px-6 text-base text-green-900">
                    Applied Date
                  </th>
                  <th scope="col" className="py-3 px-6 text-base text-green-900">
                    Job Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredApplicants.map((filteredApplicant) => (
                  <tr
                    key={filteredApplicant.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-2">{filteredApplicant.fullName}</td>
                    <td className="px-4 py-2">{filteredApplicant.hiringStage}</td>
                    <td className="px-4 py-2">
                      {new Date(filteredApplicant.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{filteredApplicant.jobRole}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showJobPosts && (
      <div className="flex flex-col p-6 gap-4">
        <h1 className="text-3xl font-bold">
          Total Job Posts: {jobPosts.length}
        </h1>
        <div className="flex flex-wrap gap-4 mt-4 items-center">
          <div className="flex items-center">
            <label className="block mr-2">
              Job Type:
              <select
                name="jobType"
                value={jobFilter.jobType}
                onChange={handleJobFilterChange}
                className="bg-white border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:outline-none"
              >
                <option value="">All</option>
                <option value="Full-Time">Full Time</option>
                <option value="Part-Time">Part Time</option>
                <option value="Contract">Contract</option>
              </select>
            </label>
          </div>
          <div className="flex flex-col">
            <label className="flex block items-center">
              Date Posted Range:
              <div className="flex">
                <input
                  type="date"
                  name="datePostedStart"
                  value={jobFilter.datePostedStart}
                  onChange={handleJobFilterChange}
                  className="bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 mr-2"
                />
                <input
                  type="date"
                  name="datePostedEnd"
                  value={jobFilter.datePostedEnd}
                  onChange={handleJobFilterChange}
                  className="bg-white border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            </label>
          </div>
            <div>
              <PDFDownloadLink
                document={<JobPostsPDF jobPosts={filteredPosts} />}
                fileName="job_posts_report.pdf"
                className="bg-blue-500 py-2 px-4 rounded-md text-white hover:bg-blue-600 focus:outline-none"
              >
                Download Job Posts Report as PDF
              </PDFDownloadLink>
          </div>
        </div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6 text-base text-green-900">
                  Job Title
                </th>
                <th scope="col" className="py-3 px-6 text-base text-green-900">
                  Vacancies
                </th>
                <th scope="col" className="py-3 px-6 text-base text-green-900">
                  Location
                </th>
                <th scope="col" className="py-3 px-6 text-base text-green-900">
                  Type
                </th>
                <th scope="col" className="py-3 px-6 text-base text-green-900">
                  Date Posted
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((jobPost) => (
                <tr
                  key={jobPost.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-4 py-2">{jobPost.jobTitle}</td>
                  <td className="px-4 py-2">{jobPost.vacancies}</td>
                  <td className="px-4 py-2">{jobPost.location}</td>
                  <td className="px-4 py-2">{jobPost.jobType}</td>
                  <td className="px-4 py-2">{new Date(jobPost.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </section>
  );
}
