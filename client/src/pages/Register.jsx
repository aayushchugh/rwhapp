import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Video from '../components/Video';
import {
	IconButton,
	OutlinedInput,
	FormControl,
	InputLabel,
	Button,
	Link,
	FormHelperText
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from 'react-toastify';

import { register } from '../api/user';
import { UserContext } from '../contexts/UserContext';

const Register = () => {

  let history = useNavigate();
  const {user, setUser} = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  let validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  let hasTenChar = password.length >= 10;
  let hasLowerChar = /(.*[a-z].*)/.test(password);
  let hasUpperChar = /(.*[A-Z].*)/.test(password);
  let hasNumber = /(.*[0-9].*)/.test(password);
  let hasSpecialChar = /(.*[^a-zA-Z0-9].*)/.test(password);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await register({email, password, passwordConfirmation});
	  if(res.status !== "ok") {
	  	toast.error(res.message);
		return;
	  }
	  toast.success(res.message);
	  setUser(res.userID)
      history("/dashboard", { replace: true });
    } catch (error) {toast.error("Something went wrong");
	console.log(error);
}

  }
  return (
    <>
      <Video />
      <div className='form_wrap'>
        <div className="form_container">
          <div className="form_title">
            <h2>Register</h2>
          </div>
          <div className="form_control">
          <FormControl
					variant="outlined"
          fullWidth
					className="form-control"
          margin="normal"
				>
					<InputLabel>email</InputLabel>
					<OutlinedInput
						label="Email"         
						type={email}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</FormControl>
          <FormControl
					variant="outlined"
          fullWidth
					className="form-control"
          margin="normal"
				>
					<InputLabel>Password</InputLabel>
					<OutlinedInput
						label="Password"         
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						endAdornment={
						
								<IconButton
									edge="end"
									onClick={() =>
										setShowPassword(!showPassword)
									}
								>
									{showPassword ? (
										<VisibilityIcon />
									) : (
										<VisibilityOffIcon />
									)}
								</IconButton>
						
						}
					/>
				</FormControl>
        <FormControl
					variant="outlined"
          fullWidth
					className="form-control"
          margin="normal"
				>
					<InputLabel>Confirm Password</InputLabel>
					<OutlinedInput
						label="PasswordConfirmation"         
						type="password"
						value={passwordConfirmation}
						onChange={(e) => setPasswordConfirmation(e.target.value)}
					/>
				</FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={
				!email || 
				!validEmail || 
				!password || 
				!passwordConfirmation ||
				!hasTenChar ||
				!hasLowerChar ||
				!hasUpperChar ||
				!hasNumber ||
				!hasSpecialChar 
			}
            margin="normal"
            sx={{ mt: 2, mb: 1 }}
            onClick={handleRegister}
          >
            Register
          </Button>
          </div>
          <div className="form_footer">
		  	{email && !validEmail && (
				<FormHelperText className="ml-1 mt-1">
					<span className="text_error">Please enter a valid email</span>						
				</FormHelperText>
			)}
			{password && !hasTenChar && (
				<FormHelperText className="ml-1 mt-1">
					<span className="text_error">Password must be at least 10 characters</span>						
				</FormHelperText>
			)}
			{password && !hasLowerChar && (
				<FormHelperText className="ml-1 mt-1">
					<span className="text_error">Password must contain a lowercase characters</span>						
				</FormHelperText>
			)}
			{password && !hasUpperChar && (
				<FormHelperText className="ml-1 mt-1">
					<span className="text_error">Password must contain a uppercase characters</span>						
				</FormHelperText>
			)}
			{password && !hasNumber && (
				<FormHelperText className="ml-1 mt-1">
					<span className="text_error">Password must contain a number</span>						
				</FormHelperText>
			)}
			{password && !hasSpecialChar && (
				<FormHelperText className="ml-1 mt-1">
					<span className="text_error">Password must contain a special characters</span>						
				</FormHelperText>
			)}
			{password && passwordConfirmation && password !== passwordConfirmation && (
				<FormHelperText className="ml-1 mt-1">
					<span className="text_error">Password do not match</span>						
				</FormHelperText>
			)} 
          </div>
		  <div className="form_footer">
		  <Link href="/login" underline="hover">Already registered?</Link>
			</div> 
        </div>   
		    
      </div>
    </>

  )

    
}

export default Register;