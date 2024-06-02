import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Space, Tooltip, Select, DatePicker } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { apiRequest } from '../../utils/index';

const { TextArea } = Input;
const { Option } = Select;

const salaryRestrictions = {
  Hour: 65,
  Day: 530,
  Week: 2650,
  Month: 10600,
};

const DashJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [newJob, setNewJob] = useState({
    jobTitle: '',
    company: '',
    location: '',
    desc: '',
    requirements: '',
    jobType: '',
    salary: 0,
    salaryType: '',
    vacancies: '',
    startHiringDate: null,
    endHiringDate: null,
  });
  const [editJob, setEditJob] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await apiRequest({
          url: '/jobs/alljobs',
          method: 'GET',
        });

        if (response.data && Array.isArray(response.data)) {
          const modifiedJobs = response.data.map((job) => ({
            ...job,
            id: job._id,
            jobType: job.jobType || '',
            salary: job.salary || 0,
            salaryType: job.salaryPeriod || '',
            vacancies: job.vacancies || 0,
          }));
          setJobs(modifiedJobs);
        } else {
          console.error('Error: Jobs data is missing or not an array');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await apiRequest({
          url: '/companies/allcompanies',
          method: 'GET',
        });

        if (response.data && Array.isArray(response.data)) {
          const modifiedCompanies = response.data.map((company) => ({
            ...company,
            id: company._id,
          }));
          setCompanies(modifiedCompanies);
        } else {
          console.error('Error: Companies data is missing or not an array');
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchJobs();
    fetchCompanies();
  }, []);

  const handleButtonClick = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNewJob({
      jobTitle: '',
      company: '',
      location: '',
      desc: '',
      requirements: '',
      jobType: '',
      salary: 0,
      salaryType: '',
      vacancies: 0,
      startHiringDate: null,
      endHiringDate: null,
    });
    setEditJob(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (value, name) => {
    setNewJob((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleJobTypeChange = (value) => {
    setNewJob((prevState) => ({
      ...prevState,
      jobType: value,
    }));
  };

  const handleStartDateChange = (date) => {
    setNewJob((prevState) => ({
      ...prevState,
      startHiringDate: date,
    }));
  };

  const handleEndDateChange = (date) => {
    setNewJob((prevState) => ({
      ...prevState,
      endHiringDate: date,
    }));
  };

  const disablePastDates = (current) => {
    return current && current < moment().endOf('day');
  };

  const validateSalary = () => {
    const { salary, salaryType } = newJob;
    if (salary < salaryRestrictions[salaryType]) {
      toast.error(`The minimum salary for ${salaryType} is. Min: ${salaryRestrictions[salaryType]}`);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateSalary()) return;

    try {
      let response;
      if (editJob) {
        response = await apiRequest({
          url: `/jobs/edit-job/${editJob.id}`,
          method: 'PUT',
          data: newJob,
        });
      } else {
        response = await apiRequest({
          url: '/jobs/create-job',
          method: 'POST',
          data: newJob,
        });
      }
      console.log('Job posted/edited:', response.data);
      setOpenModal(false);
      const updatedData = [...jobs];
      if (editJob) {
        const index = updatedData.findIndex((job) => job.id === editJob.id);
        updatedData[index] = { ...response.data, id: response.data._id };
      } else {
        updatedData.push({ ...response.data, id: response.data._id });
      }
      setJobs(updatedData);

      // Display toast notification for successful job creation/editing
      toast.success(editJob ? 'Job edited successfully' : 'Job created successfully');
    } catch (error) {
      console.error('Error posting/editing job:', error);
    }
  };

  const handleEdit = (job) => {
    setEditJob(job);
    setNewJob({
      jobTitle: job.jobTitle,
      company: job.company,
      location: job.location,
      desc: job.desc,
      requirements: job.requirements,
      jobType: job.jobType,
      salary: job.salary,
      salaryType: job.salaryType,
      vacancies: job.vacancies,
      startHiringDate: moment(job.startHiringDate),
      endHiringDate: moment(job.endHiringDate),
    });
    setOpenModal(true);
  };

  const handleDelete = (job) => {
    setEditJob(job);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await apiRequest({
        url: `/jobs/delete-job/${editJob.id}`,
        method: 'DELETE',
      });
      const updatedData = jobs.filter((job) => job.id !== editJob.id);
      setJobs(updatedData);
      setDeleteConfirmationOpen(false);

      // Display toast notification for successful job deletion
      toast.success('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmationOpen(false);
  };

  const getCompanyName = (companyId) => {
    const company = companies.find((company) => company.id === companyId);
    return company ? company.name : 'N/A';
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredJobs = jobs.filter((job) => {
    const companyName = getCompanyName(job.company);
    return (
      job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%' }}>
          <div style={{ marginTop: '100px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <Input
                placeholder="Search by job title, company, or location"
                prefix={<SearchOutlined />}
                value={searchQuery}
                onChange={handleSearch}
                style={{ width: '300px', marginRight: '20px' }}
              />
              <Button
                type="danger"
                className="bg-green-700 hover:bg-green-900 border-none text-white"
                icon={<PlusCircleOutlined />}
                onClick={handleButtonClick}
                style={{ backgroundColor: '#2F855A', borderColor: '#2F855A' }} // Override Ant Design styles
              >
                Post Job
              </Button>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 font-poppins">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900">Job Title</th>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900">Company</th>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900">Location</th>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900">Job Type</th>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900">Salary</th>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900">Vacancies</th>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900">Start Date</th>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900">End Date</th>
                      <th scope="col" className="px-6 py-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                    {filteredJobs.map((job) => (
                      <tr className="hover:bg-gray-50" key={job.id}>
                        <td className="px-6 py-4">{job.jobTitle}</td>
                        <td className="px-6 py-4">{getCompanyName(job.company)}</td>
                        <td className="px-6 py-4">{job.location}</td>
                        <td className="px-6 py-4">{job.jobType}</td>
                        <td className="px-6 py-4">{job.salary}</td>
                        <td className="px-6 py-4">{job.vacancies}</td>
                        <td className="px-6 py-4">{moment(job.startHiringDate).format('YYYY-MM-DD')}</td>
                        <td className="px-6 py-4">{moment(job.endHiringDate).format('YYYY-MM-DD')}</td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Tooltip title="Edit">
                              <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => handleEdit(job)}
                              />
                            </Tooltip>
                            <Tooltip title="Delete">
                              <Button
                                type="danger"
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(job)}
                              />
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <Modal
              title={editJob ? 'Edit Job' : 'Create Job'}
              visible={openModal}
              onOk={handleSubmit}
              onCancel={handleCloseModal}
            >
              <Input
                name="jobTitle"
                value={newJob.jobTitle}
                onChange={handleInputChange}
                placeholder="Job Title"
                style={{ marginBottom: '10px' }}
              />
              <Select
                name="company"
                value={newJob.company}
                onChange={(value) => handleSelectChange(value, 'company')}
                placeholder="Company"
                style={{ width: '100%', marginBottom: '10px' }}
              >
                {companies.map((company) => (
                  <Option key={company.id} value={company.id}>{company.name}</Option>
                ))}
              </Select>
              <Input
                name="location"
                value={newJob.location}
                onChange={handleInputChange}
                placeholder="Location"
                style={{ marginBottom: '10px' }}
              />
              <TextArea
                name="desc"
                value={newJob.desc}
                onChange={handleInputChange}
                placeholder="Description"
                style={{ marginBottom: '10px' }}
              />
              <TextArea
                name="requirements"
                value={newJob.requirements}
                onChange={handleInputChange}
                placeholder="Requirements"
                style={{ marginBottom: '10px' }}
              />
              <Select
                name="jobType"
                value={newJob.jobType}
                onChange={handleJobTypeChange}
                placeholder="Job Type"
                style={{ width: '100%', marginBottom: '10px' }}
              >
                <Option value="Full-time">Full-time</Option>
                <Option value="Part-time">Part-time</Option>
                <Option value="Contract">Contract</Option>
              </Select>
              <Input
                name="salary"
                value={newJob.salary}
                onChange={handleInputChange}
                type="number"
                placeholder="Salary"
                style={{ marginBottom: '10px' }}
              />
              <Select
                name="salaryType"
                value={newJob.salaryType}
                onChange={(value) => handleSelectChange(value, 'salaryType')}
                placeholder="Salary Type"
                style={{ width: '100%', marginBottom: '10px' }}
              >
                <Option value="Hour">Hour</Option>
                <Option value="Day">Day</Option>
                <Option value="Week">Week</Option>
                <Option value="Month">Month</Option>
              </Select>
              <Input
                name="vacancies"
                value={newJob.vacancies}
                onChange={handleInputChange}
                type="number"
                placeholder="Vacancies"
                style={{ marginBottom: '10px' }}
              />
              <DatePicker
                name="startHiringDate"
                value={newJob.startHiringDate}
                onChange={handleStartDateChange}
                placeholder="Start Hiring Date"
                style={{ width: '100%', marginBottom: '10px' }}
                disabledDate={disablePastDates}
              />
              <DatePicker
                name="endHiringDate"
                value={newJob.endHiringDate}
                onChange={handleEndDateChange}
                placeholder="End Hiring Date"
                style={{ width: '100%', marginBottom: '10px' }}
                disabledDate={disablePastDates}
              />
            </Modal>
            <Modal
              title="Confirm Delete"
              visible={deleteConfirmationOpen}
              onOk={confirmDelete}
              onCancel={cancelDelete}
            >
              <p>Are you sure you want to delete this job?</p>
            </Modal>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashJobs;
