import { loginApi } from '../../services/authService';
import { setUserName } from '../slice/userSlice';

export const loginUser = async (
  username: string,
  password: string,
  dispatch: any,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: any
) => {
  try {
    const result = await loginApi(username, password);
    if (result.success && result.data) {
      dispatch(setUserName(result.data.name));
      setError(null);
      setIsAuthenticated(true);
      navigate('/dashboard', {
        state: { message: 'Welcome to the dashboard!' },
      });
    } else {
      setError(result.message || 'Login failed. Please try again.');
    }
  } catch (err: unknown) {
    const error = err as Error;
    setError(error.message);
  }
};