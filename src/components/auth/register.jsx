import React from 'react'
import {Grid,Form,Segment,Button,Header,Message,Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import './auth.css'
import firebase from '../firebase'



class Register extends React.Component{
    state = {
        username:'',
        email:'',
        password:'',
        passwordconfirmation:'',
        errors:[],
        phonenumber:'',
        loading:false
    }
    handleChange = event => {
        this.setState({[event.target.name]:event.target.value})
    }
    isFormValid = () => {
        
        let errors = []
        let error = '' 
        if(this.isFormEmpty(this.state)){
            error = {message: "Fill out the form completely"}
            this.setState({errors :errors.concat(error)})
            return false
        }else if(this.passwordValid(this.state)){
            error = {message : " password not valid. Check again (password should be more than 6 character and match )"}
            this.setState({errors:errors.concat(error)})
            return false

        }else {
            return true
        }
    }


    isFormEmpty = ({username,email,password,passwordconfirmation}) => {
        return (!username.length || !email.length || !password.length || !passwordconfirmation.length)
    }
    passwordValid = ({password,passwordconfirmation}) =>{
        if (password !== passwordconfirmation){
            return true
        } else if (password.length <6 || passwordconfirmation.length<6){
            return true
        } else {
            return false
        }
    }

    displayError = errors => (errors.map((error,i)=> <p key ={i}> {error.message} </p>))

    handleSubmit = event => {
        event.preventDefault()
        if(this.isFormValid()){
            this.setState({errors:[],loading :true})
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email,this.state.password)
            .then(createdUser => {
                console.log(createdUser)
                this.setState({loading:false})
                createdUser.user.updateProfile({
                    displayName:this.state.username
                })
            })
            .catch(err => {
                console.log(err)
                this.setState({errors: this.state.errors.concat(err),loading:false})
            })
        }
        this.setState({
            username:'',
            email:'',
            password:'',
            passwordconfirmation:''
        })
    }
    render(){
        const {username,email,password,passwordconfirmation,errors,loading,phonenumber} =this.state
        return(
        <Grid textAlign="center" verticalAlign="middle" className='app'>
            <Grid.Column style ={{maxWidth:350}}> 
                <Header as='h1' color='black' textAlign="center">
                    <div className="icon"><Icon name="user plus" /></div>Register for pubg champion
                    
                </Header>
                <Form onSubmit = {this.handleSubmit} size='large'>
                    <Segment stacked>
                        <Form.Input fluid name="username" icon="user" iconPosition="left"
                        placeholder="pubg username" value={username} onChange={this.handleChange} type="text"/>
                        <Form.Input fluid name="phonenumber" icon="call" iconPosition="left"
                        placeholder="phone number" value={phonenumber} onChange={this.handleChange} type="text"/>
                        <Form.Input fluid name="email" icon="mail" iconPosition="left"
                        placeholder="Email address" value={email} onChange={this.handleChange} className={errors.some(error=>error.message.toLowerCase().includes('email')) ? "error" : ""}  type="email" />
                        <Form.Input fluid name="password" icon="lock" iconPosition="left"
                        placeholder="password" value={password} onChange={this.handleChange} className={errors.some(error=>error.message.toLowerCase().includes('password')) ? "error" : ""} type="password" />
                        <Form.Input fluid name="passwordconfirmation" icon="repeat" iconPosition="left"
                        placeholder="password confirmation" value={passwordconfirmation} className={errors.some(error=>error.message.toLowerCase().includes('password')) ? "error" : ""} onChange={this.handleChange} type="password" />

                        <Button disabled={loading} className={loading ? 'loading' : ""} color='black' fluid size="large" > Submit </Button>
                    </Segment>
                </Form>
                {errors.length>0&&(
                    <Message error>
                        {this.displayError(errors)}
                    </Message>
                )}
                <Message> Already a user? <Link to='/login'> Login </Link> </Message>
            </Grid.Column>

        </Grid>
            )
    }
}

export default Register