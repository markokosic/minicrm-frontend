import { useNavigate } from 'react-router';

const DashboardPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <title>{`Dashboard `}</title>

      <p>Dashboard Page</p>
      <p onClick={() => navigate('/test')}>To test</p>
    </>
  );
};

export default DashboardPage;
