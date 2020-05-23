import React from 'react'
import {Grid,Form,Segment,Button,Header,Message,Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import './auth.css'
import firebase from '../firebase'


class Login extends React.Component{
    state = {
        phonenumber:'',
        password:'',
        errors:[],
        loading:false
    }
    handleChange = event => {
        this.setState({[event.target.name]:event.target.value})
    }  

    displayError = errors => (errors.map((error,i)=> <p key ={i}> {error.message} </p>))

    handleSubmit = event => {
        event.preventDefault()
        if (this.isFormValid(this.state)){
            this.setState({errors:[],loading:true})
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(signedInUser => {
                console.log(signedInUser)
            })
            .catch(err => {
                console.log(err)
                this.setState({errors:this.state.errors.concat(err),loading:false})
            })
        }
        
    }
    isFormValid=({email,password}) => email&&password
    render(){
        const {email,password,errors,loading} =this.state
        return(
        <Grid textAlign="center" verticalAlign="middle" className='app'>
            <Grid.Column style ={{maxWidth:350}}> 
                <Header as='h2' color='black' textAlign="center">
                    <Icon name="user plus" />
                    Login to pubg champion
                </Header>
                <Form onSubmit = {this.handleSubmit} size='large'>
                    <Segment stacked>
                        
                        <Form.Input fluid name="phonenumber" icon="call" iconPosition="left"
                        placeholder="phone number" value={email} onChange={this.handleChange} className={errors.some(error=>error.message.toLowerCase().includes('phone number')) ? "error" : ""}  type="text" />
                        <Form.Input fluid name="password" icon="lock" iconPosition="left"
                        placeholder="password" value={password} onChange={this.handleChange} className={errors.some(error=>error.message.toLowerCase().includes('password')) ? "error" : ""} type="password" />
                        

                        <Button disabled={loading} className={loading ? 'loading' : ""} color="black" fluid size="large" > Submit </Button>
                    </Segment>
                </Form>
                {errors.length>0&&(
                    <Message error>
                        {this.displayError(errors)}
                    </Message>
                )}
                <Message> New to the page? <Link to='/Register'> Register </Link> </Message>
                <Message> Forgot password? <Link to = '/reset'> Password reset </Link></Message>
            </Grid.Column>

        </Grid>
            )
    }
}

export default Login