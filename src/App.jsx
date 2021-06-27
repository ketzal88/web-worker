import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectById from './pages/ProjectById'
import Services from './pages/Services'
import ContactUs from './pages/ContactUs'
import ScrollToTop from './components/ScrollTop'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <Router>
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/projects/modo" component={ProjectById} />
          <Route path="/services" component={Services} />
          <Route path="/contacto" component={ContactUs} />
          <Redirect to="/" />
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
