
import { signInWithGoogle } from '../firebase';
import { useAppContext } from '../contexts/AppContext';

const SplashScreen: React.FC<{ onContinue?: () => void }> = ({ onContinue }) => {
  const { dispatch } = useAppContext();


  const handleGuest = () => {
    dispatch({
      type: 'SET_USER',
      payload: {
        id: 'guest',
        name: 'Guest User',
        role: 'user',
        verified: false,
      },
    });
    if (onContinue) onContinue();
  };

  const handleGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        dispatch({ type: 'SET_USER', payload: {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          role: 'user',
          verified: true,
        }});
        if (onContinue) onContinue();
      }
    } catch (e) {
      alert('Google login failed');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl">🌍</div>
        <h1 className="text-3xl font-bold mt-4">ReliefMap</h1>
        <p className="text-sm text-gray-600 mt-2">Real-time disaster relief mapping</p>

        <div className="mt-6 space-y-3">

          <button
            onClick={handleGuest}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue as Guest
          </button>

          <button
            onClick={handleGoogle}
            className="w-full bg-white border border-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Login with Google</span>
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-6">Fast, responsive, and mobile-first. Tap to continue.</p>
      </div>
    </div>
  );
};

export default SplashScreen;
