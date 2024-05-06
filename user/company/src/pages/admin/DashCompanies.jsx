import React, { useState, useEffect } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { apiRequest } from '../../utils/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import 'semantic-ui-css/semantic.min.css';

const DashCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

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

  return (
    <div style={{ paddingTop: '110px', fontFamily: 'Poppins' }}>
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
              <Table.Cell>{company.registrationDate}</Table.Cell>
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
