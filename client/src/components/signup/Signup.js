import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUpUser, loginUser } from '../../store/features/users/usersSlice';
import Logo from '../logo/Logo';
import Illustration from '../../icons/signup/signup-illustration.png';
import ChoiceButton from '../button/ChoiceButton';
import SignupForm from './SignupForm';
import styles from '../../styles/Signup-styles/Signup.module.css';

function Signup() {
  // Set up formChoice variable to control status of the currently clicked
  // form option which sets the Login Mode or the Signup Mode
  const [formChoice, setFormChoice] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [showModal, setShowModal] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Create function that handles the choices click and updates the
  // state formChoice variable accordingly
  const handleFormChoiceClick = (choice) => setFormChoice(choice);

  // onValidateSubmit function is a function that is being passed as prop
  // to the SignupForm component. This function gathers the data from the form
  // component and comes back to this Signup component with validated credentials
  // that are ready to be passed onto the Login or Signup functions.
  const onValidatedSubmit = async (validatedCredentials) => {
    setIsLoading(true);
    if (formChoice === 'login') {
      await dispatch(loginUser(validatedCredentials));
    }
    if (formChoice === 'signup') {
      await dispatch(signUpUser(validatedCredentials));
    }
    setIsLoading(false);
    navigate('/');
  };

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(interval);
            return 1; // Stop the countdown at 1
          }
          return prevCountdown - 1;
        });
      }, 1000); // Update every second
    } else {
      setCountdown(30); // Reset the countdown when not loading
    }

    return () => clearInterval(interval); // Clear interval on unmount or when loading state changes
  }, [isLoading]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div id="signup" className={styles.Signup}>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span
              role="button"
              className={styles.close}
              onClick={handleCloseModal}
            >
              &times;
            </span>
            <p>Hello, welcome to the demo version.</p>
            <p>
              Login as username: "demo@gmail.com" and password "demo1" for the
              demo experience.
            </p>
            <p>
              Alternatively, you are welcome to simply sign up as a new user.
            </p>
          </div>
        </div>
      )}
      <div className={styles.Signup__side}>
        <Logo />
        <img
          src={Illustration}
          alt="Chats comming out of the computer screen. Conversation between 2 people."
          className={styles.Signup__side__illustration}
        />
      </div>

      <div className={styles.Signup__main}>
        <div className={styles['Signup__main__logo-container']}>
          <Logo isWhite />
        </div>
        <div className={styles['Signup__main__control-buttons']}>
          <ChoiceButton
            choice="login"
            isActive={formChoice === 'login'}
            handleFormChoiceClick={handleFormChoiceClick}
          />
          <ChoiceButton
            choice="signup"
            isActive={formChoice === 'signup'}
            handleFormChoiceClick={handleFormChoiceClick}
          />
        </div>
        {isLoading ? (
          <div className={styles.spinner_container}>
            <div className={styles['lds-roller']}>
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
            <h3>
              Welcome to the portfolio demo version. It might take up to
              {` ${countdown} `}
              seconds for the first login or signup action to work. The server
              needs to wake up from its hibernation. Thanks for waiting!
            </h3>
          </div>
        ) : (
          <SignupForm
            formChoice={formChoice}
            onValidatedSubmit={onValidatedSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default Signup;
