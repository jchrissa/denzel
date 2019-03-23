import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap'; 
import { Navbar, Nav, Form,FormControl} from 'react-bootstrap';
import styles from "./Fetch.css";

export default class FetchRandomMovie extends React.Component {
  state = {
    loading: true,
    movie: null
  };

  async componentDidMount() {
    const url = "http://localhost:9292/movies/";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({ movie: data, loading: false });
  }

  render() {
    if (this.state.loading) {
        return (


            
            <div>
              <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="#home">My Denzel's Movie Website </Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="#" onClick={FetchRandomMovie}>Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
              </Nav>
              <Form inline>
              <FormControl inputRef={node => this.inputNode = node} type="text" />
                <Button variant="outline-info">Search</Button>
              </Form>
            </Navbar>
            
            
            
            
            <div>Loading...</div>
            </div>
            );
          }

   if (!this.state.movie) {
      return (
      <div>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">My Denzel's Movie Website </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="http://localhost:9292/movies/">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
      <div>didn't get a movie</div>
      </div>
      );
    }

    return ( 
        
        <div> 
        <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">My Denzel's Movie Website </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="http://localhost:3000/">Home</Nav.Link>
        <Nav.Link href="#features">Voir tous ces films</Nav.Link>
        
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
    </Navbar>
<div class="container">
  <div class="row align-items-start">
    <div class="col">
      
    </div>
    <div class="col ">
   
    </div>
    <div class="col">
    
    </div>
  </div>
  <div class="row align-items-center">
  
    <div class="col">
    <div className={styles.App}>{this.state.movie.title}</div>
    <img  src={this.state.movie.poster} />
    <div className={styles.App}>{this.state.movie.synopsis}</div>
        <div className={styles.App}>metascore: {this.state.movie.metascore}</div>
        <Button className=""  onClick={()=> window.open(this.state.movie.link, "_blank")}>en voir plus !</Button> 
      
    </div>
 
  </div>
  <div class="row align-items-end">
   
    <div class="col">
   
    
      
    </div>
   
  </div>
</div>

</div>
        
    
      
      
    
      
    );
  }
}
