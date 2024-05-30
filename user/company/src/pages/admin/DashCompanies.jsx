import React, { useState, useEffect } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { apiRequest } from '../../utils/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import 'semantic-ui-css/semantic.min.css';

const DashCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState(null); // Change to Date object

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

  const handleCheckboxChange = (companyId) => {
    setSelectedCompanies((prevSelected) => {
      if (prevSelected.includes(companyId)) {
        return prevSelected.filter((id) => id !== companyId);
      } else {
        return [...prevSelected, companyId];
      }
    });
  };

  const handleApprove = async () => {
    try {
      const approvedCompanyNames = [];
      // Logic to update status of selected companies
      const updatedCompanies = companies.map((company) => {
        if (selectedCompanies.includes(company.id)) {
          approvedCompanyNames.push(company.name);
          return { ...company, status: 'Approved' };
        } else {
          return company;
        }
      });
      setCompanies(updatedCompanies);
      if (approvedCompanyNames.length > 0) {
        toast.success(`Companies "${approvedCompanyNames.join(', ')}" approved successfully`);
      }
    } catch (error) {
      console.error('Error approving companies:', error);
      toast.error('Error approving companies. Please try again.');
    }
  };
  const filteredCompanies = companies.filter((company) => {
    const matchesSearchTerm = (
      company.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesDate = filterDate
      ? new Date(company.createdAt).toLocaleDateString('en-CA') === filterDate.toLocaleDateString('en-CA') // Compare dates
      : true;

    return matchesSearchTerm && matchesDate;
  });

  return (
    <div style={{ paddingTop: '110px', fontFamily: 'Poppins' }}>
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
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
      <Table className="ui compact celled w-full border-collapse bg-white text-left text-sm text-gray-500">
        <Table.Header className="bg-gray-50">
      <Table className="ui compact celled">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell style={{ width: '28%', fontSize: '15px'}}>Company Name</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '28%', fontSize: '15px'}}>Registration Date</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '28%', fontSize: '15px'}}>Email Address</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '28%', fontSize: '15px'}}>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {companies.map((company) => (
            <Table.Row key={company.id}>
              <Table.Cell className="collapsing">
                <div className="field" style={{ width: '50px' }}>
                  <div className="ui fitted slider checkbox" style={{ width: '80px', border: 'none', padding: 3 }}>
                    <input 
                      type="checkbox" 
                      onChange={() => handleCheckboxChange(company.id)} 
                      checked={selectedCompanies.includes(company.id)} 
                    />
                    <label></label>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell style={{ fontSize: '14px' }}>{company.name}</Table.Cell>
              <Table.Cell>{new Date(company.createdAt).toLocaleDateString()}</Table.Cell>
              <Table.Cell>{company.email}</Table.Cell>
              <Table.Cell>{company.status}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="5">
              <Button primary onClick={handleApprove}>
                Approve
              </Button>
              <Button primary disabled>
                Approve All
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      <ToastContainer />
    </div>
  );
};

export default DashCompanies;