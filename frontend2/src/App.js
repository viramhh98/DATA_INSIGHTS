import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/mainpages/Login';
import Signup from './components/mainpages/Signup';
import Sidepannel from './components/mainpages/Sidepannel';
import Maindashboard from './components/Dashboardpages/maindashboard';
import StateMap from './components/Dashboardpages/StateMap';
import OverAllAnalysis from './components/Dashboardpages/OverAllAnalysis';
import DropoutAnalysis from './components/Dashboardpages/DropoutAnalysis';
import AddSchool from './components/Forms/AddSchool';
import AddActiveStudents from './components/Forms/AddActiveStudents';
import DropoutStudents from './components/Forms/DropoutStudents';
import Remidies from './components/remidies/remidies';
import ScholarshipPage from './components/remidies/scholarship';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/sidepannel" element={<Sidepannel />} />
          <Route path="/dashboard" element={<Maindashboard />} />
          <Route path="/statemap" element={<StateMap />} />
          <Route path="/overallAnalysis" element={<OverAllAnalysis />} />
          <Route path="/dropOutAnalysis" element={<DropoutAnalysis />} />
          <Route path="/addactivestudents" element={<AddActiveStudents />} />
          <Route path="/dropoutstudent" element={<DropoutStudents />} />
          <Route path="/addschool" element={<AddSchool />} />
          <Route path="/remidies" element={<Remidies />} />
          <Route path="/scholarship" element={<ScholarshipPage />} />
    
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
