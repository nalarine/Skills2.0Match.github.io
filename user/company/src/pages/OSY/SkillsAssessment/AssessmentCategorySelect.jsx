import React, { useState } from 'react';
import { Card, Typography, Layout, Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { skillAssessmentModules } from './constants';
import { isEmpty } from 'lodash';
import Questions from './Questions';

const { Title, Text } = Typography;
const { Content, Header, Footer } = Layout;

const Item = ({ title, description, onClick }) => {
  return (
    <Card
      hoverable
      onClick={onClick}
      style={{
        width: '300px',
        marginBottom: '20px',
        borderRadius: '10px',
        transition: 'transform 0.5s',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      }}
      bodyStyle={{ padding: '20px' }}
    >
      <div style={{ marginBottom: '20px' }}>
        <Title level={3} style={{ margin: 0 }}>{title}</Title>
      </div>
      <ul style={{ padding: 0, listStyleType: 'none', margin: 0 }}>
        {description.map((desc, index) => (
          <li key={index} style={{ marginTop: '5px' }}>
            <Text>{desc}</Text>
          </li>
        ))}
      </ul>
    </Card>
  );
};

const AssessmentCategorySelect = () => {
  const [selectedModule, setSelectedModule] = useState();
  const navigate = useNavigate();

  const handleCategoryClick = (module) => {
    if (module.title === 'Technical Skills') {
      navigate('/technicalSkillsQuestionnaires');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#15803d', padding: '0 50px' }}>
        <div style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>Assessment Portal</div>
      </Header>
      <Content style={{ padding: '50px' }}>
        {isEmpty(selectedModule) ? (
          <div style={{ textAlign: 'center' }}>
            <Title level={2} style={{ marginBottom: '50px' }}>Select Assessment Category</Title>
            <Row gutter={[16, 16]} justify="center">
              {!isEmpty(skillAssessmentModules) &&
                skillAssessmentModules.map((module, index) => (
                  <Col key={module?.id + index}>
                    <Item
                      title={module?.title}
                      description={module?.description}
                      onClick={() => setSelectedModule(module)}
                    />
                  </Col>
                ))}
            </Row>
          </div>
        ) : (
          <>
            <Questions questions={selectedModule?.questions} />
          </>
        )}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Assessment Portal ©2024</Footer>
    </Layout>
  );
};

export default AssessmentCategorySelect;
