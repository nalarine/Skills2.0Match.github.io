import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import { Input } from '@nextui-org/react';
import { apiRequest } from '../../utils/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
      } else {
        console.error('Error: Companies data is missing or not an array');
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
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
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell className="px-6 py-4 font-sm text-green-900 font-semibold text-base" style={{ width: '23%', fontSize: '15px' }}>Company Name</Table.HeaderCell>
            <Table.HeaderCell className="px-6 py-4 font-sm text-green-900 font-semibold text-base" style={{ width: '25%', fontSize: '15px' }}>Registration Date</Table.HeaderCell>
            <Table.HeaderCell className="px-6 py-4 font-sm text-green-900 font-semibold text-base" style={{ width: '23%', fontSize: '15px' }}>Email Address</Table.HeaderCell>
            <Table.HeaderCell className="px-6 py-4 font-sm text-green-900 font-semibold text-base" style={{ width: '28%', fontSize: '15px' }}>Location</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredCompanies.map((company) => (
            <Table.Row key={company.id}>
              <Table.Cell className="collapsing" />
              <Table.Cell className="px-6 py-4" style={{ fontSize: '14px' }}>{company.name}</Table.Cell>
              <Table.Cell className="px-6 py-4">{new Date(company.createdAt).toLocaleDateString()}</Table.Cell>
              <Table.Cell className="px-6 py-4">{company.email}</Table.Cell>
              <Table.Cell className="px-6 py-4">{company.location}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <ToastContainer />
    </div>
  );
};

export default DashCompanies;
