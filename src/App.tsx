import React from 'react';
import './style/App.css';
import { FormComponent } from './pages/Form';

const App: React.FC<{}> = () => {
  return (
    <div className='App'>
      <FormComponent />
    </div>
  );
};

export default App;
