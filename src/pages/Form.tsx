import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Container, Header } from 'semantic-ui-react';
import '../style/Form.css';
import swal from 'sweetalert';
import { GOOGLE_SHEET_API_LINK } from '../config/api';

export const FormComponent: React.FC<{}> = (props) => {
  interface GoogleSheetForm {
    name: string;
    age: string;
    club: string;
    position: string;
  }

  const [form, setForm] = useState<GoogleSheetForm>({
    name: '',
    age: '',
    club: '',
    position: '',
  });

  const updateForm: Function = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitForm: Function = () => {
    if (
      form.name !== '' ||
      form.age !== '' ||
      form.club !== '' ||
      form.position !== ''
    ) {
      axios
        .post(GOOGLE_SHEET_API_LINK, form)
        .then(({ data }) => {
          swal('Your data was entered!', 'Success!');
        })
        .catch((err) => swal(err.message, 'Warning!', 'warning'));
    } else {
      swal('please fill out the form!', 'Warning!', 'warning');
    }
  };

  return (
    <div>
      <Container fluid className='container'>
        <Header as='h2'>React Google Sheets For Soccer Players!</Header>
        <Form className='form'>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder='Enter your name'
              name='name'
              onChange={(e) => updateForm(e)}
              value={form.name}
              required
            />
          </Form.Field>
          <Form.Field>
            <label>Age</label>
            <input
              placeholder='Enter your age'
              name='age'
              value={form.age}
              required
              onChange={(e) => updateForm(e)}
            />
          </Form.Field>
          <Form.Field>
            <label>Club</label>
            <input
              placeholder='Enter your club'
              name='club'
              onChange={(e) => updateForm(e)}
              required
              value={form.club}
            />
          </Form.Field>
          <Form.Field>
            <label>Position</label>
            <input
              placeholder='Enter your position'
              name='position'
              onChange={(e) => updateForm(e)}
              value={form.position}
              required
            />
          </Form.Field>

          <Button color='blue' type='submit' onClick={(e) => onSubmitForm(e)}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};