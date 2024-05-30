import React, { useState, useEffect } from 'react';
import { Button, Table, Input, Modal, Form } from 'semantic-ui-react';
import { apiRequest } from '../../utils/index';
import DatePicker from 'react-datepicker';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
// import 'semantic-ui-css/semantic.min.css';

const DashCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ name: '', email: '', location: '', status: '' });
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCompanyId, setEditCompanyId] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

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
        setLoading(false);
      } else {
        console.error('Error: Companies data is missing or not an array');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setLoading(false);
    }
  };

  const handleCreateOrUpdateCompany = async () => {
    const url = isEditMode ? `/companies/update/${editCompanyId}` : '/companies/create';
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      await apiRequest({
        url,
        method,
        data: modalData,
      });
      toast.success(`Company ${isEditMode ? 'updated' : 'created'} successfully`);
      setIsModalOpen(false);
      fetchCompanies();
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} company:`, error);
      toast.error(`Error ${isEditMode ? 'updating' : 'creating'} company. Please try again.`);
    }
  };

  const handleEdit = (company) => {
    setModalData({ name: company.name, email: company.email, location: company.location, status: company.status });
    setEditCompanyId(company.id);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (companyId) => {
    try {
      await apiRequest({
        url: `/companies/delete/${companyId}`,
        method: 'DELETE',
      });
      toast.success('Company deleted successfully');
      fetchCompanies();
    } catch (error) {
      console.error('Error deleting company:', error);
      toast.error('Error deleting company. Please try again.');
    }
  };

  const filteredCompanies = companies.filter((company) => {
    const matchesSearchTerm = (
      company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesDate = filterDate
      ? new Date(company.createdAt).toLocaleDateString('en-CA') === filterDate.toLocaleDateString('en-CA')
      : true;

    return matchesSearchTerm && matchesDate;
  });

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 mt-[100px]">
      <h1 className="text-xl text-gray-700 font-bold mb-4">Companies</h1>
      <div className="flex gap-2">
        <Input
          icon="search"
          placeholder="Search by name, location, or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-2/3"
        />
        <div className="w-full md:w-1/3">
          <DatePicker
            selected={filterDate}
            onChange={(date) => setFilterDate(date)}
            placeholderText="Filter by date"
            className="p-2 border rounded w-full"
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => { setIsEditMode(false); setIsModalOpen(true); }}
        >
          Add Company
        </button>
      </div>
      <Table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <Table.Header className="bg-gray-50">
          <Table.Row>
            <Table.HeaderCell className="px-6 py-4 font-sm text-green-900 font-semibold text-base">Company Name</Table.HeaderCell>
            <Table.HeaderCell className="px-6 py-4 font-sm text-green-900 font-semibold text-base">Registration Date</Table.HeaderCell>
            <Table.HeaderCell className="px-6 py-4 font-sm text-green-900 font-semibold text-base">Email Address</Table.HeaderCell>
            <Table.HeaderCell className="px-6 py-4 font-sm text-green-900 font-semibold text-base">Location</Table.HeaderCell>
            <Table.HeaderCell className="px-6 py-4 font-sm text-green-900 font-semibold text-base">Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body className="divide-y divide-gray-100 border-t border-gray-100">
          {filteredCompanies.map((company) => (
            <Table.Row key={company.id}>
              <Table.Cell className="px-6 py-4">{company.name}</Table.Cell>
              <Table.Cell className="px-6 py-4">{new Date(company.createdAt).toLocaleDateString()}</Table.Cell>
              <Table.Cell className="px-6 py-4">{company.email}</Table.Cell>
              <Table.Cell className="px-6 py-4">{company.location}</Table.Cell>
              <Table.Cell className="px-6 py-4 flex justify-start gap-4">
              <button
                    onClick={() => handleEdit(company)}
                    className="bg-green-700 p-2 px-4 rounded-md text-slate-100 font-semibold text-md hover:text-slate-600 hover:bg-lime-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(company.id)}
                    className="bg-red-700 p-2 px-4 rounded-md text-slate-100 font-semibold text-md hover:text-slate-600 hover:bg-red-300"
                  >
                    Delete
                  </button>
                {/* <Button size="small" >Edit</Button>
                <Button size="small" color="red" onClick={() => handleDelete(company.id)}>Delete</Button> */}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>{isEditMode ? 'Edit Company' : 'Add Company'}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              label="Company Name"
              value={modalData.name}
              onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
            />
            <Form.Input
              label="Email Address"
              value={modalData.email}
              onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
            />
            <Form.Input
              label="Location"
              value={modalData.location}
              onChange={(e) => setModalData({ ...modalData, location: e.target.value })}
            />
            <Form.Input
              label="Status"
              value={modalData.status}
              onChange={(e) => setModalData({ ...modalData, status: e.target.value })}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button primary onClick={handleCreateOrUpdateCompany}>
            {isEditMode ? 'Update' : 'Create'}
          </Button>
        </Modal.Actions>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default DashCompanies;
