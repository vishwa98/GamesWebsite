import React from 'react';
import {shallow} from 'enzyme';
import LoginPage from '../Pages/Main/LoginPage'
describe('Login Component', () => {

    it('should render without throwing an error', () => {

        expect(shallow(<LoginPage />).find('form.login').exists()).toBe(true)

     })


     it('renders a email input', () => {

        expect(shallow(<LoginPage />).find('#exampleInputEmail1').length).toEqual(1)
    
    })
    
    it('renders a password input', () => {
    
       expect(shallow(<LoginPage />).find('#exampleInputPassword1').length).toEqual(1)
    
    })

    it('should have a submit button', () => {

        expect(shallow(<LoginPage />).find('button').length).toEqual(1);

      });

})



