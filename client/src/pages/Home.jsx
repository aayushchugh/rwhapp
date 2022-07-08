import Video from '../components/Video';
import {
	TextField,
	InputAdornment,
	IconButton,
	OutlinedInput,
	FormControl,
	InputLabel,
	Button,
} from "@mui/material";


const Home = () => {
  return (
    <>
      <Video />
      <div className='form_wrap'>
        <div className="form_container">
          <div className="form_title">
            <h2>RWH APP</h2>
          </div>
          <div className="form_control">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            href="/login"
            margin="normal"
            sx={{ mt: 2, mb: 1 }}
            
          >
            Login
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            href="/register"
            margin="normal"
            sx={{ mt: 2, mb: 1 }}
            
          >
            Register
          </Button>
          </div>
          
        </div>        
      </div>
    </>

  )

    
}

export default Home;
