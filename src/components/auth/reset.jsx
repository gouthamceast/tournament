import React, { Component } from 'react'
import {Grid,Form,Segment,Button,Header,Icon} from 'semantic-ui-react'
import './auth.css'
import firebase from '../firebase'

class Reset extends Component {
    state = {
        email:"",
        loading:false
    }
    handleChange = event => {
        this.setState({[event.target.name]:event.target.value})
    }  
    handleSubmit = event => {
        event.preventDefault()
        if (this.isFormValid(this.state)){
            this.setState({loading:true})
            firebase
            .auth()
            .sendPasswordResetEmail(this.state.email)
            .then(signedInUser => {
                console.log(signedInUser)
            })
        }
        
    }
    isFormValid=({email}) => email
  render() {
    const {email,loading} =this.state
    return (
        <Grid textAlign="center" verticalAlign="middle" className='app'>
        <Grid.Column style ={{maxWidth:350}}> 
            <Header as='h2' color='black' textAlign="center">
                <Icon name="reset" />
                Reset your password 
            </Header>
            <Form onSubmit = {this.handleSubmit} size='large'>
                <Segment stacked>
                    
                    <Form.Input fluid name="email" icon="mail" iconPosition="left"
                    placeholder="email" value={email} onChange={this.handleChange}   type="text" />
                    
                    <Button disabled={loading} className={loading ? 'loading' : ""} color="black" fluid size="large" > Submit </Button>
                </Segment>
            </Form>
            
        </Grid.Column>

    </Grid>
      
    )
  }
}

export default Reset