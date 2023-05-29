
import { makeStyles } from '@mui/styles';
import { Typography, Container } from '@mui/material';

// const useStyles = makeStyles((theme) => ({
//   footer: {
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(2),
//     marginTop: 'auto',
//   },
// }));

const Footer = () => {
  // const classes = useStyles();

  return (
    <footer>
      <Container maxWidth="md">
        <Typography variant="body2" color="textSecondary" align="center">
          &copy; {new Date().getFullYear()} Your Website Name
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
