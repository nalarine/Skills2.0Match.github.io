import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Space, Tooltip, Select, DatePicker } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined, SearchOutlined  } from '@ant-design/icons';
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
              {/* <Button
                type="danger"
                className="bg-green-700 hover:bg-green-900 border-none text-white"
                icon={<PlusCircleOutlined />}
                onClick={handleButtonClick}
                style={{ backgroundColor: '#2F855A', borderColor: '#2F855A' }} // Override Ant Design styles
              >
                Post Job
              </Button> */}
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500 font-poppins">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-md tracking-wide">Job Title</th>
                      <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-md tracking-wide">Company</th>
                      <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-md tracking-wide">Location</th>
                      <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-md tracking-wide">Hiring Date</th>
                      <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-md tracking-wide">Type</th>
                      <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-md text-center tracking-wide">Salary</th>
                      <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-md tracking-wide">Period</th>
                      <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-md text-center tracking-wide">Vacancies</th>
                      {/* <th scope="col" className="px-6 py-4 font-semibold text-gray-900 text-md tracking-wide">Actions</th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                    {jobs.map((job) => (
                      <tr key={job.id}>
                        <td className="px-6 py-4">{job.jobTitle}</td>
                        <td className="px-6 py-4">{getCompanyName(job.company)}</td>
                        <td className="px-6 py-4">{job.location}</td>
                        <td className="px-6 py-4">Start: {new Date(job.startHiringDate).toLocaleDateString()} <br /> End: {new Date(job.endHiringDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4">{job.jobType}</td>
                        <td className="px-6 py-4 text-center">{job.salary}</td>
                        <td className="px-6 py-4">{job.salaryType}</td>
                        <td className="px-6 py-4 text-center">{job.vacancies}</td>
                        {/* <td className="px-6 py-4">
                          <Space size="middle">
                            <Tooltip title="Edit">
                              <Button type="danger" icon={<EditOutlined />} onClick={() => handleEdit(job)} className="bg-green-700 hover:bg-green-900 border-none text-white"/>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDelete(job)} className="bg-red-700 hover:bg-red-900 border-none text-white"/>
                            </Tooltip>
                          </Space>
                        </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal title={editJob ? 'Edit Job' : 'Post New Job'} visible={openModal} onCancel={handleCloseModal} footer={null}>
        <label>Job Title</label>
        <Input
          placeholder="Job Title"
          name="jobTitle"
          value={newJob.jobTitle}
          onChange={handleInputChange}
          style={{ marginBottom: '10px' }}
        />
        <label>Company</label>
        <Select
          placeholder="Select Company"
          name="company"
          value={newJob.company || undefined}
          onChange={(value) => handleSelectChange(value, 'company')}
          style={{ marginBottom: '10px', width: '100%' }}
        >
          {companies.map((company) => (
            <Option key={company.id} value={company.id}>
              {company.name}
            </Option>
          ))}
        </Select>
        <label>Location</label>
        <Input
          placeholder="Location"
          name="location"
          value={newJob.location}
          onChange={handleInputChange}
          style={{ marginBottom: '10px' }}
        />
        <label>Description</label>
        <TextArea
          placeholder="Description"
          name="desc"
          value={newJob.desc}
          onChange={handleInputChange}
          style={{ marginBottom: '10px' }}
        />
        <label>Requirements</label>
        <TextArea
          placeholder="Requirements"
          name="requirements"
          value={newJob.requirements}
          onChange={handleInputChange}
          style={{ marginBottom: '10px' }}
        />
        <Space align="baseline" style={{ marginBottom: '10px' }}>
          <div>
            <label>Salary Period</label>
            <Select
              placeholder="Select Salary Period"
              name="salaryType"
              value={newJob.salaryType || undefined}
              onChange={(value) => handleSelectChange(value, 'salaryType')}
              style={{ width: '100%', marginBottom: '10px' }}
            >
              <Option value="Hour">Hour</Option>
              <Option value="Day">Day</Option>
              <Option value="Week">Week</Option>
              <Option value="Month">Month</Option>
            </Select>
          </div>
          <div>
            <label>Salary</label>
            <Input
              placeholder="Salary"
              name="salary"
              value={newJob.salary}
              onChange={handleInputChange}
              type="number"
              style={{ width: '100%', marginBottom: '10px' }}
            />
            {newJob.salaryType && newJob.salary < salaryRestrictions[newJob.salaryType] && (
              <p style={{ color: 'red', marginBottom: '5px' }}>
                Minimum allowed: {salaryRestrictions[newJob.salaryType]}
              </p>
            )}
          </div>
        </Space>
        <label>Job Type</label>
        <Select
          placeholder="Select Job Type"
          name="jobType"
          value={newJob.jobType || undefined}
          onChange={handleJobTypeChange}
          style={{ marginBottom: '20px', width: '100%' }}
        >
          <Option value="Full-time">Full-time</Option>
          <Option value="Part-time">Part-time</Option>
          <Option value="Contract">Contract</Option>
        </Select>
        <label>Vacancies</label>
        <Input
          placeholder="Vacancies"
          name="vacancies"
          value={newJob.vacancies}
          onChange={handleInputChange}
          type="number"
          style={{ marginBottom: '20px' }}
        />
        <label>Start Hiring Date</label>
        <DatePicker
          placeholder="Start Hiring Date"
          value={newJob.startHiringDate}
          onChange={handleStartDateChange}
          disabledDate={disablePastDates}
          style={{ marginBottom: '10px', width: '100%' }}
        />
        <label>End Hiring Date</label>
        <DatePicker
          placeholder="End Hiring Date"
          value={newJob.endHiringDate}
          onChange={handleEndDateChange}
          disabledDate={disablePastDates}
          style={{ marginBottom: '20px', width: '100%' }}
        />
        <Button type="danger" onClick={handleSubmit} style={{ width: '100%' }} className="bg-green-700 hover:bg-green-900 border-none text-white">
          {editJob ? 'Update' : 'Submit'}
        </Button>
      </Modal>

      <Modal
        title="Confirm Deletion"
        visible={deleteConfirmationOpen}
        onCancel={cancelDelete}
        onOk={confirmDelete}
        okText="Yes, Delete"
        cancelText="Cancel"
        okButtonProps={{ style: { backgroundColor: '#2F855A', borderColor: '#2F855A' } }}
      >
        <p>Are you sure you want to delete this job?</p>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default DashJobs;