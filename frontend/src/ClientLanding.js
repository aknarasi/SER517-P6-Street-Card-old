import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Form, Input, Button} from 'antd';
import Header from './Header'
import StreetCardFooter from './StreetCardFooter'

class ClientLanding extends React.Component{


 constructor(props) {
      super(props);
      this.state = {
          items: {},
          isLoaded: false,
      }
      this.handleSuccessfulLogoutAction = this.handleSuccessfulLogoutAction.bind(this);
    }
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
          var ClientRequestObject = {};
        ClientRequestObject.personalId = this.props.homelessPersonId;
        console.log(ClientRequestObject);
        fetch('http://localhost:8000/homeless/' + this.props.homelessPersonId + '/appointment/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(ClientRequestObject)
        })
          .then(res => res.json())
          .then(json => {
            this.props.history.push('/clientInfo');
          });
      }
      console.log('Received values of form: ', values);
    });
  };

  
  handleSuccessfulLogoutAction() {
    this.props.handleLogout();
    this.props.history.push('/login');
  }

    render(){
       // const {items} = this.state;
        const {name}  = this.state;
        const{isLoaded} = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 }
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 }
            }
          };
          const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0
              },
              sm: {
                span: 16,
                offset: 8
              }
            }
          };
          return(
            <div>

                <Header 
                  handleSuccessfulLogoutAction={this.handleSuccessfulLogoutAction}
                  loggedInStatus={this.state.loggedInStatus}
                />,
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="registration-form">
                    <h1 style={{ marginLeft: '300px'}}>Enter Id </h1>
                    <Form.Item label="clientID">
                        {getFieldDecorator("personalId", {
                            rules: [
                            {
                                required: true,
                                message: "Please input personalId!",
                                whitespace: true
                            }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className="registration-submit-button">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <StreetCardFooter/>
            </div>
          );
        }
}


const WrappedClientClientLanding = Form.create({ name: "clientLanding" })(
    ClientLanding
  );
  
  export default WrappedClientClientLanding;