import { useRouter } from '../router/RouterProvider';
import '../styles/NotFound.css';

export default function NotFound() {
  const { navigate } = useRouter();

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <button onClick={() => navigate('/')}>
        Return to Home
      </button>
    </div>
  );
}