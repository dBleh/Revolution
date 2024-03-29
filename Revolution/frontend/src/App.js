
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import HomePage from './pages/HomePage'
//Client imports
import ClientDashboard from './pages/ClientPages/ClientDashboard'
import ClientLogin from './pages/ClientPages/ClientLogin'
import Renewal from './pages/ClientPages/Renewal'
import Policies from './pages/ClientPages/Policies'
import Submissions from './pages/ClientPages/Submissions'
import Certificates from './pages/ClientPages/Certificates'
import Proposals from './pages/ClientPages/Proposals'
import AccountHistory from './pages/ClientPages/AccountHistory'
import Contacts from './pages/ClientPages/Contacts'
import Claims from './pages/ClientPages/Claims'
import Invoices from './pages/ClientPages/Invoices'
//Insurance Rep imports
import RepDashboard from './pages/RepresentativePages/RepDashboard'
import RepAccounting from './pages/RepresentativePages/RepAccounting'
import RepClaims from './pages/RepresentativePages/RepClaims'
import RepContacts from './pages/RepresentativePages/RepContacts'
import RepCoverages from './pages/RepresentativePages/RepCoverages'
import RepDocuments from './pages/RepresentativePages/RepDocuments'
import RepHistory from './pages/RepresentativePages/RepHistory'
import RepLogin from './pages/RepresentativePages/RepLogin'
import RepStatus from './pages/RepresentativePages/RepStatus'
import RepSubmissions from './pages/RepresentativePages/RepSubmissions'
import RiskManagement from './pages/RepresentativePages/RepRiskManagement'
import RepRegister from './pages/RepresentativePages/RepRegister'
import RegisterClient from './pages/RepresentativePages/RegisterClient'
import RepCalendar from './pages/RepresentativePages/RepCalendar'
import RepClientDetails from './pages/RepresentativePages/RepClientDetails'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/homepage' element={<HomePage/>} />
            [//Routes for Clients]
            <Route path='/clientlogin' element={<ClientLogin/>} />
            <Route path='/clientdashboard' element={<ClientDashboard />} />
            <Route path='/renewal' element={<Renewal />} />
            <Route path='/policies' element={<Policies />} />
            <Route path='/submissions' element={<Submissions />} />
            <Route path='/certificates' element={<Certificates />} />
            <Route path='/proposals' element={<Proposals />} />
            <Route path='/accounthistory' element={<AccountHistory />} />
            <Route path='/contacts' element={<Contacts />} />
            <Route path='/claims' element={<Claims />} />
            <Route path='/invoices' element={<Invoices />} />
            [/Routes for Insurance Reps]
            <Route path= '/repclientdetails' element={<RepClientDetails/>} />
            <Route path='/registerclient' element={<RegisterClient />} />
            <Route path='/repLogin' element={<RepLogin/>} />
            <Route path='/repdashboard' element={<RepDashboard/>} />
            <Route path='/repregister' element={<RepRegister />} />
            <Route path='/repaccounting' element={<RepAccounting />} />
            <Route path='/repclaims' element={<RepClaims />} />
            <Route path='/repcontacts' element={<RepContacts />} />
            <Route path='/repcoverages' element={<RepCoverages />} />
            <Route path='/repdocuments' element={<RepDocuments />} />
            <Route path='/rephistory' element={<RepHistory />} />
            <Route path='/repriskmanagement' element={<RiskManagement/>} />
            <Route path='/repstatus' element={<RepStatus />} />
            <Route path='/repsubmissions' element={<RepSubmissions />} />
            <Route path='/repCalendar' element={<RepCalendar/>} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
      
    </>
  )
}

export default App
