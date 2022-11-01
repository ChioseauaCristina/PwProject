import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 10,
    margin: '30px 0',
    padding: '10px 50px',
  },
  heading: {
    textDecoration: 'none',
    display: { xs: 'none', md: 'flex' },
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'pink',
    marginTop: '3px'
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    
  },
  profile: {
    display: 'flex',
    justifyContent: 'right',
    width: '500px',
    gap: '30px'
  },
  signin: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '190px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    color: '#707070'
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
  },
  textLogo: {
    marginTop: '5px'
  },
  button: {
    backgroundColor: '#ffdede'
  }
}));