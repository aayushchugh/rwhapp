import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Video from '../components/Video';
import {
	TextField,
	InputAdornment,
	IconButton,
	OutlinedInput,
	FormControl,
	InputLabel,
	Button,
  Link
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from 'react-toastify';
import { forgotPassword } from '../api/user';

const ForgotPassword = () => {

  let history = useNavigate();

  const [email, setEmail] = useState('');
  
  let validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
 
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({email});
      if(res.status !== "ok") {
        toast.error(res.message);
        return;
      }
      toast.success(res.message);
      history("/", { replace: true });
    } catch (error) {
      toast.error(error.message);
      
    }

  }
  return (
    <>
      <Video />
      <div className='form_wrap'>
        <div className="form_container">
          <div className="form_title">
            <h2>Forgot Password</h2>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={!email || !validEmail}
            margin="normal"
            sx={{ mt: 2, mb: 1 }}
            onClick={handleForgotPassword}
          >
            Reset Password
          </Button>
          </div>
          <div className="form_footer">
          <Link href="/login" underline="hover">Login</Link>
          </div>
        </div>        
      </div>
    </>

  )

    
}

export default ForgotPassword;
